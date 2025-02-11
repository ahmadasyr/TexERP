"use client";
import { trTR } from "@/components/trTrGrid";
import { getPersonnelInfo } from "@/contexts/auth";
import { itemTypes } from "@/contexts/itemTypes";
import { Info } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const [orderItem, setOrderItem] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [perTop, setPerTop] = React.useState<boolean>(false);
  const [oneBarcode, setOneBarcode] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<any>({});
  useEffect(() => {
    if (!id) return; // Avoid unnecessary calls when id is invalid
    fetch(`/api/outsource-order/specs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(orderItem)) {
          setOrderItem(data);
        }
      });
  }, [id, refresh]); // Remove `refresh` from the dependency array
  const [depo, setDepo] = React.useState<any>("");
  const depoList = [
    "LAMINATED_PRE_QUALITY",
    "DYE_PRE_QUALITY",
    "COVER_QUALITY",
  ];
  const submitAcceptance = () => {
    fetch(`/api/outsource-order/accept/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        perTop,
        oneBarcode,
        stockStatus: depo,
        personnelId: getPersonnelInfo().id,
        productId: orderItem?.productId,
      }),
    }).then(() => {
      setRefresh((prev) => !prev); // Use functional update
    });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/outsource-order/accept/${id}`, {
      method: "DELETE",
    }).then(() => {
      setRefresh((prev) => !prev); // Use functional update
    });
  };

  const OrderDetails = () => {
    return (
      orderItem && (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {/* Sevk Edilen Row */}
          <Card
            sx={{
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              width: "-webkit-fill-available",
              maxHeight: "fit-content",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                textAlign={"center"}
                variant="h4"
                fontWeight={500}
                color="primary"
              >
                Gönderilen
              </Typography>
            </CardContent>
            <Grid
              container
              spacing={2}
              sx={{
                flex: 2,
                justifyContent: "space-between",
                width: "80%",
                justifySelf: "center",
              }}
            >
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Metre: <b>{orderItem?.shippedMeter}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Kg: <b>{orderItem?.shippedKg}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Adet: <b>{orderItem?.shippedCount}</b>
                </Typography>
              </Grid>
            </Grid>
          </Card>

          {/* Kabul Edilen Row */}
          <Card
            sx={{
              alignItems: "center",
              p: 2,
              width: "-webkit-fill-available",
              maxHeight: "fit-content",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                textAlign={"center"}
                variant="h4"
                fontWeight={500}
                color="secondary"
              >
                Kabul Edilen
              </Typography>
            </CardContent>
            <Grid
              container
              spacing={2}
              sx={{
                flex: 2,
                justifyContent: "space-between",
                width: "80%",
                justifySelf: "center",
              }}
            >
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Metre: <b>{orderItem?.confirmedMeter}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Kg: <b>{orderItem?.confirmedKg}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Adet: <b>{orderItem?.confirmedCount}</b>
                </Typography>
              </Grid>
            </Grid>
          </Card>

          {/* Kalan Row */}
          <Card
            sx={{
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              width: "-webkit-fill-available",
              maxHeight: "fit-content",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                textAlign={"center"}
                variant="h4"
                fontWeight={500}
                color="info"
              >
                Kalan
              </Typography>
            </CardContent>
            <Grid
              container
              spacing={2}
              sx={{
                flex: 2,
                justifyContent: "space-between",
                width: "80%",
                justifySelf: "center",
              }}
            >
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Metre:
                  <b> {orderItem?.shippedMeter - orderItem?.confirmedMeter}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Kg: <b>{orderItem?.shippedKg - orderItem?.confirmedKg}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  Adet:
                  <b> {orderItem?.shippedCount - orderItem?.confirmedCount}</b>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )
    );
  };

  const acceptedStockColumns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      type: "dateTime",
      flex: 1,
      valueFormatter: (params, row) => {
        return new Date(row.createdAt).toLocaleString() || "";
      },
    },
    {
      field: "barcode",
      headerName: "Barkod",
      type: "number",
      flex: 1,
      valueFormatter: (params, row) => {
        return row?.stock?.barcode || "";
      },
    },

    {
      field: "meter",
      headerName: "Metre",
      type: "number",
      flex: 1,
    },
    {
      field: "kg",
      headerName: "Kg",
      type: "number",
      flex: 1,
    },
    {
      field: "count",
      headerName: "Adet",
      type: "number",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "İşlemler",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(params.row.id);
            }}
            variant="contained"
            color="error"
          >
            Sil
          </Button>
        );
      },
    },
  ];
  return (
    orderItem && (
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
          elevation={3}
        >
          <Typography variant="h4" gutterBottom>
            Boyahane Sipariş Kalem Detayı
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <OrderDetails />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                gap={1}
              >
                <Typography variant="h6">
                  Ürün: {orderItem?.product?.name}
                </Typography>
                <Typography variant="h6">
                  Renk: {orderItem?.dyeColor?.name}
                </Typography>{" "}
                <Typography variant="h6">
                  Lamine Rengi: {orderItem?.laminationColor?.name}
                </Typography>
                <Typography variant="h6">
                  Gönderilen Tip:{" "}
                  {
                    itemTypes.find(
                      (i) => i.value === orderItem?.outsourceOrder?.stockStatus
                    )?.label
                  }
                </Typography>
                <Typography variant="h6">
                  Miktar: {orderItem?.quantity} {orderItem?.unit}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
          }}
          elevation={3}
        >
          <Typography variant="h5">Mal Kabul</Typography>
          {orderItem?.confirmedMeter < orderItem?.shippedMeter ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={oneBarcode}
                      onChange={(e) => setOneBarcode(e.target.checked)}
                    />
                  }
                  label="Tek Barkod"
                />
                {!oneBarcode && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={perTop}
                        onChange={(e) => setPerTop(e.target.checked)}
                      />
                    }
                    label="Top Başına"
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Top Sayısı"
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      topCount: Number(e.target.value),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={perTop && !oneBarcode ? "Top Metre" : "Toplam Metre"}
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      topMeter: Number(e.target.value),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={perTop && !oneBarcode ? "Top Kg" : "Toplam Kg"}
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      topKg: Number(e.target.value),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="depo-select-label">Depo</InputLabel>
                  <Select
                    labelId="depo-select-label"
                    id="depo-select"
                    value={depo}
                    label="Depo"
                    onChange={(e) => setDepo(e.target.value)}
                  >
                    {depoList.map((depoItem) => (
                      <MenuItem key={depoItem} value={depoItem}>
                        {itemTypes.find((i) => i.value === depoItem)?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    submitAcceptance();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Kabul Et
                </Button>
              </Grid>
            </Grid>
          ) : (
            <>
              <Tooltip title="Kabul Edilecek Miktar kalmadı, gönderilen miktar kadar kabul edildi">
                <Alert
                  sx={{
                    placeContent: "center",
                  }}
                  icon={<Info fontSize="inherit" />}
                  severity="info"
                >
                  Kabul Edilecek Miktar kalmadı.
                </Alert>
              </Tooltip>
            </>
          )}
        </Paper>
        <Paper
          sx={{
            p: 2,
          }}
          elevation={3}
        >
          <Typography variant="h5">Kabul Edilen Stoklar</Typography>

          <DataGrid
            rows={orderItem?.outsourceConfirmation}
            columns={acceptedStockColumns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Paper>
      </Box>
    )
  );
}
