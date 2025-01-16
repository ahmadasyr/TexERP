import React, { useEffect } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { Announcement, Campaign } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        padding: ".1rem 2rem",
        position: "fixed",
        bottom: 0,
        width: "-webkit-fill-available",
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        alignItems: "center",
        gap: "5rem",
        zIndex: 100,
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "white", textAlign: "left", fontSize: "0.875rem" }}
      >
        © {new Date().getFullYear()} Dokumaş Fabric
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "white", fontSize: "0.875rem", textAlign: "center" }}
      >
        {new Date().toLocaleDateString("tr-TR")} - <span id="live-time"></span>
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
          color: "white",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          "&:hover": {
            color: "Highlight",
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
