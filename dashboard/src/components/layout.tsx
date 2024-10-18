"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Switch,
  Grid,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Menu from "./main/menu/page";
import { lightPalette, darkPalette } from "./theme";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Dokumas
            </Typography>
            <Switch checked={darkMode} onChange={toggleTheme} />
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="persistent"
            open={open}
            onClose={toggleDrawer}
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
            anchor="left"
          >
            <div>
              <Typography variant="h5" style={{ padding: "1rem 2rem" }}>
                Dokumas Fabric
              </Typography>
            </div>
            <Menu />
          </Drawer>
          <Grid
            item
            xs
            style={{
              marginLeft: open ? 240 : 0,
              transition: "margin-left 0.3s",
              height: "100vh",
              backgroundColor: theme.palette.background.default,
            }}
          >
            {children}
          </Grid>
        </Box>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export default Layout;
