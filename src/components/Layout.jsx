import React from "react";
import { AppBar, Toolbar, Typography, Box, Container, IconButton } from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Footer = () => (
  <Box 
    sx={{ 
      py: 3, 
      mt: 4,
      textAlign: "center", 
      bgcolor: "background.paper",
      borderTop: 1,
      borderColor: 'divider'
    }} 
    component="footer"
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Dashboard Samsung Scraping
    </Typography>
  </Box>
);

const Layout = ({ children }) => (
  <>
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton 
            size="large" 
            edge="start" 
            color="primary" 
            sx={{ mr: 2 }}
          >
            <AnalyticsIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            color="text.primary"
            sx={{ 
              flexGrow: 1,
              fontWeight: 500
            }}
          >
            Dashboard Samsung
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: 4,
        minHeight: 'calc(100vh - 140px)' // ensure footer stays at bottom
      }}
    >
      {children}
    </Container>
    <Footer />
  </>
);

export default Layout; 