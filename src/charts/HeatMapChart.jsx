import { ResponsiveTreeMap } from '@nivo/treemap';
import { Box, Typography } from '@mui/material';
import { numberFormat } from "../utils/numberFormat";

const HeatMapChart = ({ data }) => {
  if (!data?.children?.length) return null;

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".0f"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerPadding={3}
        outerPadding={3}
        enableParentLabel={true}
        labelSkipSize={36}
        label={node => `${node.data.name}\n(${node.value})`}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
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
              {node.data.name}
            </Typography>
            <Typography variant="body1">
              Productos: {node.value.toLocaleString('es-CO')}
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
};

export default HeatMapChart; 