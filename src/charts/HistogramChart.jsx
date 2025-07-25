import { ResponsiveBar } from "@nivo/bar";
import { numberFormat } from "../utils/numberFormat";
import { Box, Typography } from "@mui/material";

const HistogramChart = ({ data = [], onFilter, bucketSize = 500000 }) => {
  const buckets = {};
  data.forEach((d) => {
    const bucket = Math.floor(d.rango / bucketSize) * bucketSize;
    buckets[bucket] = (buckets[bucket] || 0) + 1;
  });
  const chartData = Object.entries(buckets).map(([b, count]) => ({
    rango: `${(Number(b)/1e6).toFixed(1)}M`,
    valor: Number(b),
    registros: count
  })).sort((a,b) => a.valor - b.valor);

  return (
    <ResponsiveBar
      data={chartData}
      keys={["registros"]}
      indexBy="rango"
      margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
      padding={0.2}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        tickValues: chartData
          .filter((_, i) => i % Math.ceil(chartData.length / 8) === 0)
          .map(d => d.rango)
      }}
      axisLeft={{ 
        format: v=>v.toLocaleString('es-CO'),
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Cantidad de productos",
        legendPosition: "middle",
        legendOffset: -45
      }}
      enableLabel={false}
      borderRadius={2}
      motionConfig="gentle"
      tooltip={({data}) => (
        <Box sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          boxShadow: 1,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="body2">
            Precio: {numberFormat(data.valor)}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Productos: {data.registros.toLocaleString('es-CO')}
          </Typography>
        </Box>
      )}
      role="application"
      ariaLabel="Histograma de precios"
    />
  );
};

export default HistogramChart; 