// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, readCells, tableName } from "./stock";
import { getPersonnelInfo } from "@/contexts/auth";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { set } from "date-fns";
const Page: React.FC = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const shipmentId = params.get("shipmentId");
  const [barcode, setBarcode] = React.useState("");
  const [shipmentItem, setShipmentItem] = React.useState<{
    quantity?: number;
    unit?: string;
    yon?: boolean;
    lot?: string;
    dyeColor?: { name: string };
    dyeOrder?: {
      product: {
        name?: string;
      };
      stockStatus?: string;
    };
    remaining?: number;
  }>({});
  const [tab, setTab] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  useEffect(() => {
    if (id) {
      fetch("/api/dye-shipment/shipmentItem/" + id)
        .then((res) => res.json())
        .then((data) => {
          setShipmentItem(data);
          setDone(data.remainingMeter === 0);
        });
    }
  }, [id, refresh]);
  const handleSubmit = () => {
    const payload = {
      barcode: barcode,
      orderShipmentId: Number(shipmentId),
      orderItemId: Number(id),
      personnelId: getPersonnelInfo().id,
    };
    fetch("/api/dye-shipment/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefresh(!refresh);
        setPopup(false);
        setTab(0);
        setTab(1);
      });
  };
  const [popup, setPopup] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [readType, setReadType] = React.useState<number>(0);
  const router = useRouter();
  return (
    <>
      <Dialog fullWidth open={popup} onClose={() => setPopup(false)}>
        <Box style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
          <Typography variant="h6">Okutulan Barkod</Typography>
          <Typography variant="body1">{barcode}</Typography>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Onayla
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setPopup(false)}
          >
            İptal
          </Button>
        </Box>
      </Dialog>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {shipmentItem.remaining === 0 ? (
          <>
            <Dialog open={done} fullWidth>
              <Box style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
                <Typography variant="h6">Sevk Emri Tamamlandı</Typography>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => setDone(false)}
                >
                  Tamam
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => router.back()}
                >
                  Geri Dön
                </Button>
              </Box>
            </Dialog>
          </>
        ) : (
          <>
            <Tabs
              value={readType}
              onChange={(_, newValue) => setReadType(newValue)}
            >
              <Tab value={0} label="Barkod Okut" />
              <Tab value={1} label="Manuel Giriş" />
            </Tabs>
            {readType === 0 ? (
              <Box width="100%" height="30rem" maxHeight={"25vh"}>
                <BarcodeScannerComponent
                  width={"100%"}
                  height={"100%"}
                  onUpdate={(err, result) => {
                    if (result && result.getText()) {
                      setBarcode(result.getText());
                      setPopup(true);
                    }
                  }}
                />
              </Box>
            ) : readType === 1 ? (
              <Paper style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Barkod"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setPopup(true)}
                >
                  Okut
                </Button>
              </Paper>
            ) : null}
          </>
        )}
        <Paper elevation={3} style={{ padding: "16px", margin: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Ürün: {shipmentItem?.dyeOrder?.product.name || "Yok"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Renk: {shipmentItem?.dyeColor?.name || "Yok"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Yön: {shipmentItem?.yon ? "B" : "A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Lot: {shipmentItem?.lot || "Yok"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Kalan Miktar: {shipmentItem?.remaining || 0}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Birim: {shipmentItem?.unit}
          </Typography>
        </Paper>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab value={0} label="Okutulan Ürünler" />
          <Tab value={1} label="Stoktaki Uyumlu Ürünler" />
        </Tabs>
        {tab === 0 ? (
          <EnhancedTable
            title="Okutulan Ürünler"
            headCells={readCells}
            tableName={tableName}
            viewable={false}
            createable={false}
            editable={false}
            deleteable={true}
            URI={"/dye-shipment/scanned/" + id}
            disableColumnMenu={true}
            noActions
            outerRefresh={refresh}
            setOuterRefresh={setRefresh}
          />
        ) : tab === 1 ? (
          <EnhancedTable
            title="Stoktaki Uyumlu Ürünler"
            headCells={headCells}
            tableName={tableName}
            viewable={false}
            createable={false}
            editable={false}
            deleteable={false}
            URI={"/dye-shipment/stock/" + id}
            disableColumnMenu={true}
            noActions
            outerRefresh={refresh}
            setOuterRefresh={setRefresh}
          />
        ) : null}
      </Box>
    </>
  );
};

export default Page;
