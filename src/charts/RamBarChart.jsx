import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography } from '@mui/material';
import { numberFormat } from "../utils/numberFormat";

const RamBarChart = ({ data }) => {
  if (!data?.length) return null;

  return (
    <Box sx={{ height: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={['precio_promedio']}
        indexBy="ram"
        margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'RAM (GB)',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Precio Promedio (COP)',
          legendPosition: 'middle',
          legendOffset: -60,
          format: v => numberFormat(v)
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[{
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateY: 50,
          itemWidth: 80,
          itemHeight: 14,
          itemsSpacing: 4,
          symbolSize: 12,
          symbolShape: 'circle'
        }]}
        tooltip={({ value, indexValue }) => (
          <Box sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            boxShadow: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="body1" fontWeight="bold">
              RAM: {indexValue}GB
            </Typography>
            <Typography variant="body1">
              Precio promedio: {numberFormat(value)}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default RamBarChart; 