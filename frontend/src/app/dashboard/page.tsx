"use client";
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

import Sts from "./departments/sts";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterType, setFilterType] = useState("year");
  const personnel = JSON.parse(localStorage.getItem("personnel") || "{}");
  const userDepartment = personnel.department;
  const years = Array.from(
    { length: new Date().getFullYear() - 2023 },
    (_, i) => 2024 + i
  );

  return (
    <Box paddingX={window.innerWidth > 600 ? 20 : 3} paddingY={3}>
      <Typography variant="h2" gutterBottom>
        Anasayfa - Dashboard
      </Typography>
      <Grid item xs={12} mb={5}>
        <Paper sx={{ padding: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom mr={2}>
              Filtreleme
            </Typography>

            <Select
              size="small"
              sx={{ width: "10rem" }}
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setYear(new Date().getFullYear());
                setStartDate("");
                setEndDate(new Date().toISOString().split("T")[0]);
              }}
            >
              <MenuItem value="year">Yıl</MenuItem>
              <MenuItem value="date">Tarih Aralığı</MenuItem>
            </Select>
          </Box>

          {filterType === "year" ? (
            <Select
              size="small"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              fullWidth
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Box display="flex" gap={2}>
              <TextField
                type="date"
                label="Başlangıç Tarihi"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                type="date"
                label="Bitiş Tarihi"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          )}
        </Paper>
      </Grid>

      {userDepartment === "sts" ? (
        <Sts year={year} startDate={startDate} endDate={endDate} />
      ) : null}
    </Box>
  );
};

export default Dashboard;
