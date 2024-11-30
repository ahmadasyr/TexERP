"use client";
import React from "react";
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
  // Örnek Veri
  const lineData = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"],
    datasets: [
      {
        label: "Üretim Oranı (m)",
        data: [120000, 140000, 100000, 160000, 130000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        tension: 0,
      },
    ],
  };
  const barData2 = {
    labels: ["Çözgü", "Örme", "Dokuma", "Nonwoven"],
    datasets: [
      {
        label: "Stok Seviyeleri (m)",
        data: [50, 30, 20, 15],
        backgroundColor: [
          "rgba(255,99,132,0.7)",
          "rgba(54,162,235,0.7)",
          "rgba(255,206,86,0.7)",
          "rgba(75,192,192,0.7)",
        ],
      },
    ],
  };
  const barData = {
    labels: ["Ham Kumaş", "Boyalı Kumaş", "Lamineli Kumaş", "Örtü Kumaş"],

    datasets: [
      {
        label: "Stok Seviyeleri (m)",
        data: [50, 30, 20, 15],
        backgroundColor: [
          "rgba(255,99,132,0.7)",
          "rgba(54,162,235,0.7)",
          "rgba(255,206,86,0.7)",
          "rgba(75,192,192,0.7)",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Aktif", "İzinli", "Pasif"],
    datasets: [
      {
        data: [70, 15, 5],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const people = [
    { name: "John Doe", role: "Müdür", avatar: "/avatar1.png" },
    { name: "Jane Smith", role: "Süpervizör", avatar: "/avatar2.png" },
    { name: "Ali Can", role: "Operatör", avatar: "/avatar3.png" },
    { name: "Fatma Yılmaz", role: "Teknisyen", avatar: "/avatar4.png" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dokumaş Fabric - Anasayfa
      </Typography>
      <Grid container spacing={2}>
        {/* KPI'lar */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Personel Sayısı</Typography>
            <Typography variant="h3">90</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Açık Satış Siparişleri</Typography>
            <Typography variant="h3">25</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Bu Ayın Üretim Sayısı (m)</Typography>
            <Typography variant="h3">122,370</Typography>
          </Paper>
        </Grid>

        {/* Grafikler */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Üretim Oranı</Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Stok Seviyeleri</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Çalışan Durumu</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1">
              Kategoriye Göre İş Emirleri
            </Typography>
            <Doughnut data={barData2} />
          </Paper>
        </Grid>

        {/* Görev Listesi */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Görevler Genel Bakış
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Kumaş Kalitesini Kontrol Et"
                  secondary="Son Tarih: Yarın"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Bakım Planla"
                  secondary="Son Tarih: Gelecek Hafta"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Envanter Kayıtlarını Güncelle"
                  secondary="Son Tarih: Bugün"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Kişi Listesi */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Anahtar Personel
            </Typography>
            <List>
              {people.map((person, index) => (
                <ListItem key={index}>
                  <Badge overlap="circular" badgeContent=" " color="primary">
                    <Avatar alt={person.name} src={person.avatar} />
                  </Badge>
                  <ListItemText
                    primary={person.name}
                    secondary={person.role}
                    sx={{ marginLeft: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
