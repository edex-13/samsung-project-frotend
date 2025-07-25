import React from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../utils/numberFormat";

const discountCalc = (row) => {
  const parse = (v) => {
    if (v === undefined || v === null) return NaN;
    if (typeof v === 'number') return v;
    if (typeof v === 'string') return Number(v.replace(/[^\d.]/g, ''));
    return NaN;
  };
  const original = parse(row.precio_original);
  const actual = parse(row.precio_actual ?? row.precio);
  if (Number.isFinite(original) && original > 0 && Number.isFinite(actual) && actual > 0) {
    return ((1 - actual / original) * 100).toFixed(1);
  }
  return 0;
};

const ProductsTable = ({ rows, loading }) => {
  const navigate = useNavigate();

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 230 },
    { field: "dispositivo", headerName: "Dispositivo", width: 180 },
    { field: "fecha_scraping", headerName: "Fecha", width: 130 },
    { field: "precio_actual", headerName: "Precio actual", width: 120, valueFormatter: ({ value }) => numberFormat(value) },
    { field: "precio_original", headerName: "Precio original", width: 120, valueFormatter: ({ value }) => (value ? numberFormat(value) : "–") },
    { field: "precio_promocion", headerName: "Precio promo", width: 120, valueFormatter: ({ value }) => (value ? numberFormat(value) : "–") },
    {
      field: "descuento_calc",
      headerName: "% Desc.",
      width: 100,
      valueGetter: (params) => discountCalc(params.row),
      valueFormatter: ({ value }) => `${value}%`
    },
    { field: "memoria_interna", headerName: "Almacenamiento", width: 120, valueFormatter: ({ value }) => (value ? `${value} GB` : "–") },
    { field: "memoria_ram", headerName: "RAM", width: 90, valueFormatter: ({ value }) => (value ? `${value} GB` : "–") },
    { field: "color", headerName: "Color", width: 110 },
    { field: "condicion", headerName: "Condición", width: 110 },
    { field: "vendedor", headerName: "Vendedor", width: 160 },
    { field: "comercio", headerName: "Comercio", width: 130 },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button size="small" startIcon={<VisibilityIcon />} onClick={() => navigate(`/producto/${params.id}`)}>
          Ver
        </Button>
      )
    },
    {
      field: "url",
      headerName: "Tienda",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => window.open(params.row.url, "_blank")}>Abrir</Button>
      )
    }
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[25, 50, 100]}
        initialState={{
          columns: { columnVisibilityModel: { precio_promocion: false } }
        }}
        onRowDoubleClick={(params) => navigate(`/producto/${params.id}`)}
        aria-label="Tabla de productos"
      />
    </Box>
  );
};

export default ProductsTable; 