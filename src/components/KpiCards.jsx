import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { numberFormat } from "../utils/numberFormat";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PercentIcon from '@mui/icons-material/Percent';
import DiscountIcon from '@mui/icons-material/Discount';

const KpiCard = ({ label, value, icon: Icon }) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: (theme) => 
          `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon sx={{ 
        color: 'primary.main', 
        mr: 1.5,
        fontSize: '1.75rem'
      }} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
    <Typography variant="h5" component="div" sx={{ 
      fontWeight: 500,
      letterSpacing: '-0.5px'
    }}>
      {value}
    </Typography>
  </Paper>
);

const KpiCards = ({ kpis }) => {
  if (!kpis) return null;

  const items = [
    { label: "Total Registros", value: kpis.total.toLocaleString(), icon: InventoryIcon },
    { label: "Precio Promedio", value: numberFormat(kpis.avgPrice), icon: TrendingUpIcon },
    { label: "Precio Mínimo", value: numberFormat(kpis.minPrice), icon: PriceCheckIcon },
    { label: "Precio Máximo", value: numberFormat(kpis.maxPrice), icon: LocalOfferIcon },
    { label: "% Con Promoción", value: `${kpis.promoPct.toFixed(1)}%`, icon: PercentIcon },
    { label: "Descuento Promedio", value: `${kpis.avgDiscount.toFixed(1)}%`, icon: DiscountIcon }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={item.label}>
          <KpiCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards; 