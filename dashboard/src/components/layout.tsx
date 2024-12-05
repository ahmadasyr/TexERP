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
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Menu from "./main/menu/page";
import { lightPalette, darkPalette } from "./theme";
import PrimarySearchAppBar from "./navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);
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
      primary: {
        main: darkMode ? "#E3CBA8" : "#F05A29", // Brighter primary color
      },
      secondary: {
        main: darkMode ? "#46EBC2" : "#22868A", // More vibrant secondary color
      },
      background: {
        default: darkMode ? "#202020" : "#F9F9F9", // Slightly darker/lighter for contrast
        paper: darkMode ? "#2C2C2C" : "#FFFFFF",
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#222222", // Ensure high contrast
        secondary: darkMode ? "#AAAAAA" : "#555555",
      },
    },
    typography: {
      fontFamily: "Poppins",

      h1: {
        fontWeight: 700,
        fontSize: "3rem",
        color: darkMode ? "#FFFFFF" : "#222222", // High-contrast heading
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.5rem",
        color: darkMode ? "#E3CBA8" : "#F05A29", // Use primary color for emphasis
      },
      h3: {
        fontWeight: 500,
        fontSize: "2rem",
        color: darkMode ? "#E3CBA8" : "#22868A", // Match secondary color
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
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: darkMode ? "1px solid #444" : "1px solid #DDD", // Subtle border for separation
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // Avoid all caps for better readability
            fontWeight: 600, // Bold buttons
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <Grid container>
          {/* Drawer Section */}
          <Grid
            item
            xs={open ? 12 : 0}
            sm={open ? 1 : 0}
            md={open ? 2 : 0}
            sx={
              open
                ? {
                    overflow: "auto", // Prevent content spill
                    width: "100%",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    height: "100vh",
                    "&::-webkit-scrollbar": {
                      width: "0.4em",
                    },
                    "&::-webkit-scrollbar-track": {
                      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,.1)",
                      outline: `1px solid ${theme.palette.primary.main}`,
                    },
                  }
                : {}
            }
          >
            <Drawer
              variant={
                isMobile ? "temporary" : open ? "permanent" : "temporary"
              }
              open={open}
              onClose={toggleDrawer}
              anchor="left"
              PaperProps={{
                style: {
                  transition: "all 0.3s ease",
                  overflowY: "auto", // Enable smooth scrolling
                  width: "inherit", // Inherit the width of the parent drawer
                  display: isMobile ? "block" : "contents",
                },
                sx: {
                  "&::-webkit-scrollbar": {
                    display: "none", // Hide scrollbar for modern browsers
                  },
                },
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="1rem"
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{
                    width: "100%",
                    maxWidth: "100%", // Ensure responsiveness
                    height: "auto",
                  }}
                />
              </Box>
              <Menu />
            </Drawer>
          </Grid>

          {/* Main Content Section */}
          <Grid
            item
            xs={12}
            sm={open ? 11 : 12}
            md={open ? 10 : 12}
            container
            justifyContent="center"
            alignItems="center"
            style={{
              overflow: "hidden", // Ensure no pushing or overlapping
              boxSizing: "border-box", // Include padding in width/height calculation
              display: "block",
            }}
          >
            <PrimarySearchAppBar
              toggleTheme={toggleTheme}
              toggleDrawer={toggleDrawer}
              open={open}
            />
            {children}
          </Grid>
        </Grid>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export default Layout;
