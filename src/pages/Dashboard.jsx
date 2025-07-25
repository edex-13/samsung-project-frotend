import React, { Suspense } from "react";
import { Grid, Paper, Skeleton, Typography, Box, Divider } from "@mui/material";
import FiltersPanel from "../components/FiltersPanel";
import KpiCards from "../components/KpiCards";
import ProductsTable from "../components/ProductsTable";
import useProductsData from "../hooks/useProductsData";

const LineChart = React.lazy(() => import("../charts/LineChart"));
const BarStackedChart = React.lazy(() => import("../charts/BarStackedChart"));
const HistogramChart = React.lazy(() => import("../charts/HistogramChart"));
const BoxPlotChart = React.lazy(() => import("../charts/BoxPlotChart"));
const PieChart = React.lazy(() => import("../charts/PieChart"));
const HeatmapChart = React.lazy(() => import("../charts/HeatmapChart"));
const ScatterChart = React.lazy(() => import("../charts/ScatterChart"));
const RamBarChart = React.lazy(() => import("../charts/RamBarChart"));
const StoragePieChart = React.lazy(() => import("../charts/StoragePieChart"));

const Dashboard = () => {
  const { loading, data, kpis, lineData, barData, histogramData, boxPlotData, pieData, heatmapData, scatterData, ramData, storageData } = useProductsData();

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
          Análisis de Precios Samsung
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Monitoreo de precios y descuentos en Éxito, Falabella y MercadoLibre
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <FiltersPanel />
      <KpiCards kpis={kpis} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Tendencias y Distribución
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 380, 
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Evolución del precio medio por modelo
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <LineChart data={lineData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 380, 
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Unidades por comercio y modelo
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <BarStackedChart data={barData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 380, 
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Distribución de precios
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <HistogramChart data={histogramData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 380, 
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Precios por condición
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <BoxPlotChart data={boxPlotData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Análisis por Especificaciones
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 400,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Precio Promedio por RAM
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative' }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <RamBarChart data={ramData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              height: 400,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Distribución por Almacenamiento
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative' }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <StoragePieChart data={storageData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Análisis Detallado
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              minHeight: 600,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Distribución de Productos por Comercio
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative' }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <HeatmapChart data={heatmapData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            sx={{ 
              height: 500,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            elevation={0}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Dispersión de Precios
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative' }}>
              <Suspense fallback={<Skeleton variant="rectangular" height="100%" />}>
                <ScatterChart data={scatterData} />
              </Suspense>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Detalle de Productos
        </Typography>
      </Box>

      <Paper 
        sx={{ p: 2 }}
        elevation={0}
        variant="outlined"
      >
        <ProductsTable rows={data} loading={loading} />
      </Paper>
    </>
  );
};

export default Dashboard; 