import React from "react";
import { createTheme, ThemeProvider, CssBaseline, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import 'dayjs/locale/es';

const App = () => {
  const [mode, setMode] = React.useState("light");
  const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton
            onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
            color="inherit"
            aria-label="toggle theme"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
        </Layout>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App; 