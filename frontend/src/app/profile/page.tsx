"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import departments from "./departments.json";
import { getPersonnelInfo } from "@/contexts/auth";
interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  position: string | null;
  dateOfHire: string | null;
  email: string;
  phone: string | null;
  handleComplaints: boolean | null;
  handleSales: boolean | null;
  username: string;
  department: string;
}

const ProfilePage: React.FC = () => {
  const [personnel, setPersonnel] = useState<Personnel | null>(null);

  useEffect(() => {
    const storedPersonnel = getPersonnelInfo();
    if (storedPersonnel) {
      setPersonnel(JSON.parse(storedPersonnel));
    }
  }, []);

  if (!personnel) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Profil Bilgileri
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Ad:</strong> {personnel.firstName}{" "}
                      {personnel.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Pozisyon:</strong> {personnel.position || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>İşe Alım Tarihi:</strong>{" "}
                      {personnel.dateOfHire || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Email:</strong> {personnel.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Telefon:</strong> {personnel.phone || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Kullanıcı Adı:</strong> {personnel.username}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      <strong>Bölüm:</strong>{" "}
                      {departments.find(
                        (d: any) => d.code === personnel.department
                      )?.name || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
