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
import PrimarySearchAppBar from "./navbar";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "rgb(241, 90, 41)",
      },
    },
  });
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />

        <PrimarySearchAppBar
          toggleTheme={toggleTheme}
          toggleDrawer={toggleDrawer}
        />
        {/* <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
            <Switch checked={darkMode} onChange={toggleTheme} />
          </Toolbar>
        </AppBar> */}
        <Box>
          <Drawer
            variant="temporary"
            open={open}
            onClose={toggleDrawer}
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                // width: 240,
                boxSizing: "border-box",
              },
            }}
            anchor="left"
          >
            <div>
              <Box display="flex" alignItems="center" padding="1rem 2rem"></Box>
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  width: "17rem",
                  height: "auto",
                  padding: "1rem",
                  margin: "auto",
                }}
              />
            </div>
            <Menu />
          </Drawer>
          <Grid
            width={"100%"}
            container
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </Grid>
        </Box>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export default Layout;
