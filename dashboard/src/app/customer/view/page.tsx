"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  Skeleton,
  Grid,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import TitleIcon from "@mui/icons-material/Title";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";

import { useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { Data } from "../customer";

import { headCells as complaintHeadCells } from "../../customer-complaint/complaint";

import { headCells as offerHeadCells } from "../../offer/offer";

import { headCells as orderHeadCells } from "../../order/order";

import { headCells as feasibilityHeadCells } from "../../product-feasibility-form/form";

import { headCells as priceHeadCells } from "../../customer-price/price";

import { headCells as meetPlanHeadCells } from "../../customer-meet-plan/plan";

import { headCells as meetReportHeadCells } from "../../customer-meet-report/report";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const [custInfo, setCustInfo] = useState<Data | null>(null);
  const id = searchParams.get("id");
  const pages = [
    {
      title: "Müşteri şikayetleri",
      headCells: complaintHeadCells,
      URI: "/customer-complaint/customer/" + id,
      viewable: false,
      tableName: "/customer-complaint",
    },
    {
      title: "Müşteri fiyatları",
      headCells: priceHeadCells,
      URI: "/customer-price/customer/" + id,
      viewable: false,
      tableName: "/customer-price",
    },
    {
      title: "Müşteri teklifleri",
      headCells: offerHeadCells,
      URI: "/offer/customer/" + id,
      viewable: false,
      tableName: "/offer",
    },
    {
      title: "Müşteri siparişleri",
      headCells: orderHeadCells,
      URI: "/order/customer/" + id,
      viewable: false,
      tableName: "/order",
    },
    {
      title: "Ürün fabilizme listesi",
      headCells: feasibilityHeadCells,
      URI: "/product-feasibility-form/customer/" + id,
      viewable: false,
      tableName: "/product-feasibility-form",
    },
    {
      title: "Müşteri ziyaret planları",
      headCells: meetPlanHeadCells,
      URI: "/customer-meet-plan/customer/" + id,
      viewable: false,
      tableName: "/customer-meet-plan",
    },
    {
      title: "Müşteri ziyaret raporları",
      headCells: meetReportHeadCells,
      URI: "/customer-meet-report/customer/" + id,
      viewable: false,
      tableName: "/customer-meet-report",
    },
  ];
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      if (id) {
        const response = await fetch(
          "http://localhost:3001/api/customer/" + id
        );
        const data = await response.json();
        setCustInfo(data);
      }
    };

    fetchCustomerInfo();
  }, [searchParams]);

  const [selectedPage, setSelectedPage] = useState(pages[0]); // Initialize with the first page

  const handlePageChange = (page: any) => {
    setSelectedPage(page);
  };
  return (
    <Grid
      style={{
        margin: "0 auto",
      }}
      container
      spacing={2}
    >
      <Grid item xs={12} md={3}>
        {custInfo ? (
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {custInfo.name}
              </Typography>
              <Paper
                sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
              >
                <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Email:</strong> {custInfo.email}
                </Typography>
              </Paper>
              <Paper
                sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
              >
                <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Related Person:</strong> {custInfo.relatedPerson}
                </Typography>
              </Paper>
              <Paper
                sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
              >
                <TitleIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Title:</strong> {custInfo.title}
                </Typography>
                <PhoneIcon sx={{ ml: 3, mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Phone:</strong> {custInfo.phoneNumber}
                </Typography>
              </Paper>
              <Paper
                sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
              >
                <BadgeIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Status:</strong> {custInfo.status}
                </Typography>
              </Paper>
              <Paper
                sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
              >
                <HomeIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Address:</strong> {custInfo.address}, {custInfo.city}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        ) : (
          <Skeleton variant="rounded" width="100%" height={500} />
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        {/* Pagination title buttons */}
        <Grid container spacing={1} justifyContent="center">
          {pages ? (
            pages.map((page) => (
              <Grid item key={page.title}>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(page)}
                >
                  {page.title}
                </Button>
              </Grid>
            ))
          ) : (
            <Skeleton variant="rectangular" width={200} height={50} />
          )}
        </Grid>
        <EnhancedTable
          title={selectedPage.title}
          headCells={selectedPage.headCells}
          tableName={selectedPage.tableName}
          viewable={selectedPage.viewable}
          URI={selectedPage.URI}
        />
      </Grid>
    </Grid>
  );
};

export default Page;
