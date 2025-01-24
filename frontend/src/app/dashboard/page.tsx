"use client";
import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import { getPersonnelInfo } from "@/contexts/auth";

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
  const params = useSearchParams();
  const department = params.get("department");
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(
    new Date().getFullYear() + "-01-01"
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterType, setFilterType] = useState("date");
  const personnel = getPersonnelInfo();
  const [userDepartment, setUserDepartment] = useState(
    department || personnel.department
  );
  const years = Array.from(
    { length: new Date().getFullYear() - 2024 },
    (_, i) => 2025 + i
  );
  useEffect(() => {
    setUserDepartment(department || personnel.department);
  }, [department]);
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
                setStartDate(new Date().getFullYear() + "-01-01");
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
                defaultValue={new Date().getFullYear() + "-01-01"}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                type="date"
                label="Bitiş Tarihi"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          )}
        </Paper>
      </Grid>

      {userDepartment === "sts" ? (
        <Sts
          filterType={filterType}
          year={year}
          startDate={startDate}
          endDate={endDate}
        />
      ) : null}
    </Box>
  );
};

export default Dashboard;
