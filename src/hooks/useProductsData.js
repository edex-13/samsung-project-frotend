import { useMemo } from "react";
import useFirestoreCollection from "./useFirestoreCollection";
import { useFiltersStore } from "../store/filtersStore";
import { transformToTreeMap, prepareScatterData } from "../utils/transformData";

const collectionName = "productos_scraping";

const percentile = (arr, p) => {
  if (!arr.length) return null;
  if (arr.length === 1) return arr[0];
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
};

const parseNumeric = (val) => {
  if (val === undefined || val === null) return NaN;
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const cleaned = val.replace(/[^\d.]/g, "");
    return Number(cleaned);
  }
  return NaN;
};

const normalize = (str) => String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getPrice = (item) => {
  const parse = (val) => {
    if (val === undefined || val === null) return NaN;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return Number(val.replace(/[^\d.]/g, ''));
    return NaN;
  };

  const actual = parse(item.precio_actual ?? item.precio);
  return Number.isFinite(actual) && actual > 0 ? actual : null;
};

const getDiscount = (item) => {
  const original = Number(item.precio_original?.toString().replace(/[^\d.]/g, ''));
  const actual = getPrice(item);
  if (Number.isFinite(original) && original > 0 && actual !== null) {
    return ((1 - actual / original) * 100);
  }
  return null;
};

const toTitle = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const isValidCondition = (val) => {
  if (val === undefined || val === null) return false;
  if (typeof val === 'number') return Number.isFinite(val) && val !== 0; // NaN o 0 se consideran inválidos
  const str = String(val).trim();
  return str !== '' && str.toLowerCase() !== 'nan';
};

const useProductsData = () => {
  const { data, loading, error } = useFirestoreCollection(collectionName, { limitValue: null });
  const { filters } = useFiltersStore();

  // Aplicar filtros
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Filtro por comercio
      if (filters.comercios?.length && !filters.comercios.map(c=>normalize(c)).includes(normalize(item.comercio))) {
        return false;
      }

      // Filtro por modelo
      if (filters.modelos?.length && !filters.modelos.map(m=>normalize(m)).includes(normalize(item.modelo_detectado))) {
        return false;
      }

      // Filtro por condición
      if (filters.condiciones?.length && !filters.condiciones.map(c=>normalize(c)).includes(normalize(item.condicion))) {
        return false;
      }

      // Filtro por vendedor
      if (filters.vendedor && !normalize(item.vendedor||'').includes(normalize(filters.vendedor))) {
        return false;
      }

      // Filtro por RAM
      if (filters.ram) {
        const ramVal = parseInt(item.memoria_ram);
        if (ramVal !== Number(filters.ram)) return false;
      }

      // Filtro por almacenamiento
      if (filters.almacenamiento) {
        const stoVal = parseInt(item.memoria_interna);
        if (stoVal !== Number(filters.almacenamiento)) return false;
      }

      // Filtro por fecha
      if (filters.fechaInicio || filters.fechaFin) {
        const itemDate = new Date(item.fecha_scraping);
        if (filters.fechaInicio && itemDate < new Date(filters.fechaInicio)) {
          return false;
        }
        if (filters.fechaFin) {
          const endDate = new Date(filters.fechaFin);
          endDate.setHours(23, 59, 59);
          if (itemDate > endDate) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, filters]);

  // Calcular KPIs
  const kpis = useMemo(() => {
    if (!filteredData.length) return null;

    const prices = filteredData.map(getPrice).filter(p => p !== null);
    const discounts = filteredData.map(getDiscount).filter(d => d !== null);
    const withPromo = filteredData.filter(d => getDiscount(d) && getDiscount(d) > 0).length;

    return {
      total: filteredData.length,
      avgPrice: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      promoPct: filteredData.length ? (withPromo / filteredData.length) * 100 : 0,
      avgDiscount: discounts.length ? discounts.reduce((a, b) => a + b, 0) / discounts.length : 0,

      // también los campos anteriores por compatibilidad
      precio_promedio: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
      precio_min: prices.length ? Math.min(...prices) : 0,
      precio_max: prices.length ? Math.max(...prices) : 0,
      descuento_promedio: discounts.length ? discounts.reduce((a, b) => a + b, 0) / discounts.length : 0
    };
  }, [filteredData]);

  // Preparar datos para el gráfico de línea
  const lineData = useMemo(() => {
    const byDate = {};
    filteredData.forEach(item => {
      const date = item.fecha_scraping.split('T')[0];
      if (!byDate[date]) byDate[date] = { x: date, y: 0, count: 0 };
      const price = getPrice(item);
      if (price !== null) {
        byDate[date].y += price;
        byDate[date].count++;
      }
    });

    return [{
      id: "Precio promedio",
      data: Object.values(byDate)
        .map(d => ({ x: d.x, y: d.count ? d.y / d.count : 0 }))
        .sort((a, b) => new Date(a.x) - new Date(b.x))
    }];
  }, [filteredData]);

  // Preparar datos para el gráfico de barras apiladas
  const barData = useMemo(() => {
    const byComercio = {};
    filteredData.forEach(item => {
      const comercio = item.comercio;
      const modelo = item.modelo_detectado || "sin modelo";
      if (!byComercio[comercio]) byComercio[comercio] = { comercio };
      byComercio[comercio][modelo] = (byComercio[comercio][modelo] || 0) + 1;
    });
    return Object.values(byComercio);
  }, [filteredData]);

  // Preparar datos para el histograma
  const histogramData = useMemo(() => {
    return filteredData
      .map(item => ({ rango: getPrice(item) }))
      .filter(d => d.rango !== null);
  }, [filteredData]);

  // Preparar datos para el boxplot
  const boxPlotData = useMemo(() => {
    const rows = [];
    filteredData.forEach(item => {
      const condicion = item.condicion || 'No especificada';
      const price = getPrice(item);
      if (price !== null) rows.push({ group: condicion, value: price });
    });
    return rows;
  }, [filteredData]);

  // Preparar datos para el gráfico de RAM
  const ramData = useMemo(() => {
    const byRam = {};
    filteredData.forEach(item => {
      const ram = parseInt(item.memoria_ram) || 'N/A';
      if (!byRam[ram]) {
        byRam[ram] = {
          ram: ram,
          count: 0,
          total_precio: 0
        };
      }
      const price = getPrice(item);
      if (price !== null) {
        byRam[ram].count++;
        byRam[ram].total_precio += price;
      }
    });

    return Object.values(byRam)
      .map(item => ({
        ram: item.ram,
        precio_promedio: item.count ? item.total_precio / item.count : 0
      }))
      .sort((a, b) => Number(a.ram) - Number(b.ram))
      .filter(item => item.ram !== 'N/A');
  }, [filteredData]);

  // Preparar datos para el gráfico de almacenamiento
  const storageData = useMemo(() => {
    const byStorage = {};
    filteredData.forEach(item => {
      const storage = parseInt(item.memoria_interna) || 'N/A';
      if (!byStorage[storage]) {
        byStorage[storage] = {
          id: `${storage}GB`,
          label: `${storage}GB`,
          value: 0,
          total_precio: 0
        };
      }
      const price = getPrice(item);
      if (price !== null) {
        byStorage[storage].value++;
        byStorage[storage].total_precio += price;
      }
    });

    return Object.values(byStorage)
      .map(item => ({
        ...item,
        precio_promedio: item.value ? item.total_precio / item.value : 0
      }))
      .sort((a, b) => Number(a.id.replace('GB', '')) - Number(b.id.replace('GB', '')))
      .filter(item => item.id !== 'N/AGB');
  }, [filteredData]);

  // Preparar datos para el heatmap (comercio -> modelo -> rango precios)
  const heatmapData = useMemo(() => {
    const tree = {};
    filteredData.forEach(item => {
      const price = getPrice(item);
      if (price === null) return;
      const comercio = item.comercio || 'N/A';
      const modelo = item.modelo_detectado || 'Sin modelo';

      const rangoBase = Math.floor(price / 1_000_000);
      const rangoLabel = `${rangoBase}M-${rangoBase + 1}M`;

      if (!tree[comercio]) tree[comercio] = { name: comercio, children: {} };
      if (!tree[comercio].children[modelo]) tree[comercio].children[modelo] = { name: modelo, children: {} };
      if (!tree[comercio].children[modelo].children[rangoLabel]) tree[comercio].children[modelo].children[rangoLabel] = { name: rangoLabel, loc: 0 };

      tree[comercio].children[modelo].children[rangoLabel].loc += 1;
    });

    return {
      name: 'Distribución de Productos',
      children: Object.values(tree).map(com => ({
        name: com.name,
        children: Object.values(com.children).map(mod => ({
          name: mod.name,
          children: Object.values(mod.children)
        }))
      }))
    };
  }, [filteredData]);

  // Preparar datos para el scatter plot (modelo -> precio vs descuento)
  const scatterData = useMemo(() => {
    const byModelo = {};
    filteredData.forEach(item => {
      const modelo = item.modelo_detectado || 'Sin modelo';
      if (!byModelo[modelo]) byModelo[modelo] = { id: modelo, data: [] };
      const precio = getPrice(item);
      const descuento = getDiscount(item);
      if (precio !== null && descuento !== null) {
        byModelo[modelo].data.push({ x: precio, y: descuento });
      }
    });
    return Object.values(byModelo);
  }, [filteredData]);

  return {
    loading,
    error,
    data: filteredData,
    kpis,
    lineData,
    barData,
    histogramData,
    boxPlotData,
    heatmapData,
    scatterData,
    ramData,
    storageData
  };
};

export default useProductsData; 