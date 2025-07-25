import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Paper, Chip, Button, Divider } from "@mui/material";
import useProductById from "../hooks/useProductById";
import { numberFormat } from "../utils/numberFormat";
import Skeleton from "@mui/material/Skeleton";

const InfoItem = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="bold">
      {value ?? "–"}
    </Typography>
  </Grid>
);

const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading } = useProductById(id);

  if (loading)
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" height={200} />
      </Box>
    );

  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No se encontró el producto.</Typography>
      </Box>
    );

  return (
    <Box sx={{ my: 3 }}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
        ← Volver
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {data.nombre}
        </Typography>
        <Chip label={data.comercio} color="primary" sx={{ mr: 1 }} />
        <Chip label={data.modelo_detectado} sx={{ mr: 1 }} />
        <Chip label={data.condicion} />

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <InfoItem label="Precio actual" value={numberFormat(data.precio_actual)} />
          <InfoItem label="Precio promoción" value={data.precio_promocion ? numberFormat(data.precio_promocion) : "–"} />
          <InfoItem label="% Desc." value={data.porcentaje_descuento ? `${data.porcentaje_descuento}%` : "–"} />
          <InfoItem label="Memoria RAM" value={data.memoria_ram ? `${data.memoria_ram} GB` : "–"} />
          <InfoItem label="Almacenamiento" value={data.memoria_interna ? `${data.memoria_interna} GB` : "–"} />
          <InfoItem label="Color" value={data.color} />
          <InfoItem label="Vendedor" value={data.vendedor_normalizado} />
          <InfoItem label="Fecha scraping" value={new Date(data.fecha_scraping.seconds * 1000).toLocaleString()} />
          <InfoItem label="Referencia específica" value={data.referencia_especifica} />
        </Grid>

        {data.caracteristicas_extraidas && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Características extraídas</Typography>
            <Typography variant="body2" whiteSpace="pre-wrap">
              {data.caracteristicas_extraidas}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Button href={data.url} target="_blank" variant="contained">
            Ver en tienda
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetail; 