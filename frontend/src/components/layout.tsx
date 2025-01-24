"use client";
import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";
import linkAuth from "../contexts/linkAuth.json";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Menu from "./main/menu/page";
import { lightPalette, darkPalette } from "./theme";
import PrimarySearchAppBar from "./navbar";
import Login from "../app/login/page";
import Footer from "./main/footer/page";
import { getPersonnelInfo } from "@/contexts/auth";
import { ErrorSharp } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { usePathname } from "next/navigation";
import { link } from "fs";
import { get } from "http";

interface LinkAuth {
  link: string;
  allowedDepartments?: string[] | null;
}
[];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const userDepartment = getPersonnelInfo()?.department || "";
  const currentPath = usePathname().toString();

  useEffect(() => {
    const handleTokenChange = () => {
      if (localStorage.token) {
        setToken(localStorage.token);
      }
    };
    handleTokenChange();
    window.addEventListener("logout", handleTokenChange);
    window.addEventListener("login", handleTokenChange);
    return () => {
      window.removeEventListener("logout", handleTokenChange);
      window.removeEventListener("login", handleTokenChange);
    };
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#E3CBA8" : "#F05A29",
      },
      secondary: {
        main: darkMode ? "#58A6A6" : "#22868A",
      },
      background: {
        default: darkMode ? "#202020" : "#F9F9F9",
        paper: darkMode ? "#2C2C2C" : "#FFFFFF",
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#222222",
        secondary: darkMode ? "#AAAAAA" : "#555555",
      },
    },
    typography: {
      fontFamily: "Poppins",
      h1: {
        fontWeight: 700,
        fontSize: "3rem",
        color: darkMode ? "#FFFFFF" : "#222222",
      },
      h2: {
        fontWeight: 600,
        fontSize: "2.5rem",
        color: darkMode ? "#E3CBA8" : "#F05A29",
      },
      h3: {
        fontWeight: 500,
        fontSize: "2rem",
        color: darkMode ? "#E3CBA8" : "#22868A",
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
      MuiCssBaseline: {
        styleOverrides: {
          form: {
            backgroundColor: darkMode ? "#2C2C2C" : "#FFFFFF",
          },
          footer: {
            backgroundColor: darkMode ? "#FFFFFF" : "#2C2C2C",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: darkMode ? "1px solid #444" : "1px solid #DDD",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
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
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);
  const specialUnAuthPaths = [
    {
      link: "/login",
      condition: token,
    },
    {
      link: "/register",
      condition: token,
    },
    {
      link: "/forgot-password",
      condition: token,
    },
    {
      link: "/my-subordinates",
      condition: getPersonnelInfo()?.isDepartmentHead === false,
    },
    {
      link: "/subordinate-requests",
      condition: getPersonnelInfo()?.isDepartmentHead === false,
    },
  ];

  const allowedLinks = [
    ...linkAuth
      .filter((link: LinkAuth) => {
        // Exclude links where allowedDepartments is null or undefined
        if (
          link.allowedDepartments === null ||
          link.allowedDepartments === undefined
        ) {
          return false;
        }
        return !link.allowedDepartments.includes(userDepartment);
      })
      .map((link: LinkAuth) => link.link),
    ...specialUnAuthPaths
      .filter((link) => link.condition)
      .map((link) => link.link),
  ];

  console.log(allowedLinks);
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {token ? (
          <Grid container>
            <Grid
              item
              xs={open ? 12 : 0}
              sm={open ? 1 : 0}
              md={open ? 2 : 0}
              sx={
                open
                  ? {
                      backgroundColor: theme.palette.background.paper,
                      overflow: "auto",
                      width: "100%",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      height: "100vh",
                      position: "sticky",
                      top: 0,
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
                    overflowY: "auto",
                    width: "inherit",
                    display: isMobile ? "block" : "contents",
                  },
                  sx: {
                    "&::-webkit-scrollbar": {
                      display: "none",
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
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
                <Menu setOpen={setOpen} />
              </Drawer>
            </Grid>

            <Grid
              item
              xs={12}
              sm={open ? 11 : 12}
              md={open ? 10 : 12}
              container
              justifyContent="center"
              alignItems="center"
              style={{
                overflow: "hidden",
                boxSizing: "border-box",
                display: "block",
              }}
            >
              <PrimarySearchAppBar
                toggleTheme={toggleTheme}
                toggleDrawer={toggleDrawer}
                open={open}
                theme={darkMode}
                setTheme={setDarkMode}
              />

              {!allowedLinks.includes(currentPath) ? (
                <Box
                  sx={{
                    paddingBottom: "4rem",
                  }}
                >
                  {children}
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                  textAlign="center"
                >
                  <ErrorSharp color="error" sx={{ fontSize: "10rem" }} />
                  <Typography color="error" variant="h2">
                    Yetkisiz Erişim
                  </Typography>
                  <Typography variant="body1">
                    Bu sayfaya erişim izniniz yok.
                  </Typography>
                </Box>
              )}

              {location.pathname !== "/login" && window.innerWidth > 600 && (
                <Footer darkMode={darkMode} />
              )}
            </Grid>
          </Grid>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export default Layout;
