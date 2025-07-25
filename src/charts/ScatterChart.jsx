import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { Box, Typography } from '@mui/material';
import { numberFormat } from "../utils/numberFormat";

const ScatterChart = ({ data }) => {
  if (!data?.length || !data[0]?.data?.length) return null;

  return (
    <Box sx={{ height: '100%' }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 90 }}
        xScale={{ 
          type: 'linear',
          min: 0,
          max: 'auto'
        }}
        yScale={{ 
          type: 'linear',
          min: 0,
          max: 100
        }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Precio (COP)',
          legendPosition: 'middle',
          legendOffset: 46,
          format: v => numberFormat(v)
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '% Descuento',
          legendPosition: 'middle',
          legendOffset: -60,
          format: v => `${v}%`
        }}
        nodeSize={8}
        tooltip={({ node }) => (
          <Box sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            boxShadow: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="body1" fontWeight="bold">
              {node.data.x.toLocaleString('es-CO')}
            </Typography>
            <Typography variant="body1">
              Descuento: {node.data.y}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {node.serieId}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default ScatterChart; 