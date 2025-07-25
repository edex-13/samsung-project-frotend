import React, { useMemo } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import { useFiltersStore } from "../store/filtersStore";
import useFirestoreCollection from "../hooks/useFirestoreCollection";

const FiltersPanel = () => {
  const { filters, updateFilter } = useFiltersStore();

  // traer modelos distintos
  const { data: allProducts } = useFirestoreCollection('productos_scraping', { limitValue: null });
  const modelosOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach(p => {
      if (p.modelo_detectado) set.add(p.modelo_detectado);
    });
    return Array.from(set).sort();
  }, [allProducts]);

  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={0} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Comercio</InputLabel>
            <Select
              value={filters.comercios[0] || ''}
              onChange={e => updateFilter('comercios', e.target.value ? [e.target.value] : [])}
              label="Comercio"
            >
              <MenuItem value="">Todos</MenuItem>
              {['Éxito', 'Falabella', 'MercadoLibre'].map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Modelo</InputLabel>
            <Select
              value={filters.modelos[0] || ''}
              onChange={e => updateFilter('modelos', e.target.value ? [e.target.value] : [])}
              label="Modelo"
            >
              <MenuItem value="">Todos</MenuItem>
              {modelosOptions.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>RAM</InputLabel>
            <Select
              value={filters.ram}
              onChange={e => updateFilter('ram', e.target.value)}
              label="RAM"
            >
              <MenuItem value="">Todos</MenuItem>
              {['4', '6', '8', '12', '16'].map(r => (
                <MenuItem key={r} value={r}>{r}GB</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Almacenamiento</InputLabel>
            <Select
              value={filters.almacenamiento}
              onChange={e => updateFilter('almacenamiento', e.target.value)}
              label="Almacenamiento"
            >
              <MenuItem value="">Todos</MenuItem>
              {['64', '128', '256', '512', '1024'].map(a => (
                <MenuItem key={a} value={a}>{a}GB</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Condición</InputLabel>
            <Select
              value={filters.condiciones[0] || ''}
              onChange={e => updateFilter('condiciones', e.target.value ? [e.target.value] : [])}
              label="Condición"
            >
              <MenuItem value="">Todas</MenuItem>
              {['Nuevo', 'Reacondicionado', 'Usado'].map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FiltersPanel; 