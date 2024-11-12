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
        main: "rgb(241, 90, 41)", // Your custom primary color
      },
      secondary: {
        main: "rgb(34, 193, 195)", // Example secondary color (can change to any other)
      },
      background: {
        default: darkMode ? "#333" : "#FFFFFF", // Adjust background for light/dark mode
        paper: darkMode ? "#444" : "#FFF", // Paper background for cards/panels
      },
      text: {
        primary: darkMode ? "#FFF" : "#000", // Text color for primary text
        secondary: darkMode ? "#B0B0B0" : "#555", // Secondary text color
      },
    },

    typography: {
      fontFamily: "'Roboto', sans-serif", // Default font family
      h1: {
        fontWeight: 700,
        fontSize: "3rem",
        color: darkMode ? "#FFF" : "#333", // Heading color based on mode
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.5rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "2rem",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
      },
    },

    spacing: 8, // Sets the default spacing scale to 8px

    breakpoints: {
      values: {
        xs: 0, // Extra small screen (mobile)
        sm: 600, // Small screen (tablet)
        md: 960, // Medium screen (small laptop)
        lg: 1280, // Large screen (laptop/desktop)
        xl: 1920, // Extra large screen (big screens)
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
