import { ResponsivePie } from '@nivo/pie';
import { Box, Typography } from '@mui/material';
import { numberFormat } from "../utils/numberFormat";

const StoragePieChart = ({ data }) => {
  if (!data?.length) return null;

  return (
    <Box sx={{ height: '100%' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        /* usar colores por defecto */
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 50,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 0,
            symbolSize: 20,
            itemDirection: 'left-to-right',
            title: 'Almacenamiento'
          }
        ]}
        tooltip={({ datum }) => (
          <Box sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            boxShadow: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="body1" fontWeight="bold">
              {datum.label}
            </Typography>
            <Typography variant="body1">
              Cantidad: {datum.value}
            </Typography>
            <Typography variant="body1">
              Precio promedio: {numberFormat(datum.precio_promedio)}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default StoragePieChart; 