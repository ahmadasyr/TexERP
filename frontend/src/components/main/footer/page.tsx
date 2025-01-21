import React, { useEffect } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { Announcement, Campaign } from "@mui/icons-material";
import Clock from "react-live-clock";
const Footer = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <Box
      sx={{
        backgroundColor: Boolean(darkMode)
          ? "background.paper"
          : "secondary.main",
        padding: ".1rem 2rem",
        position: "fixed",
        bottom: 0,
        width: "-webkit-fill-available",
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        alignItems: "center",
        gap: "5rem",
        zIndex: 100,
        color: "white",
      }}
    >
      <Typography
        variant="body2"
        sx={{ textAlign: "left", fontSize: "0.875rem" }}
      >
        © {new Date().getFullYear()} <b>Dokumaş Fabric</b>
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.875rem",
          textAlign: "center",
          minWidth: "150px",
        }}
      >
        {new Date().toLocaleDateString("tr-TR")}
        {/* -{" "} */}
        {/* <Clock format={"HH:mm:ss"} ticking /> */}
      </Typography>
      <Typography
        variant="button"
        component="div"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: "0.875rem",
          textTransform: "none",
          padding: "8px 16px",
          backgroundColor: "var(--mui-palette-info-main)",

          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        aria-label="Report an issue"
      >
        Sorun Bildir
        <Campaign sx={{ marginLeft: "8px", fontSize: "1.2rem" }} />
      </Typography>
    </Box>
  );
};

export default Footer;
