// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import { Button, Paper, Tab, Tabs, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./stock";
import { getPersonnelInfo } from "@/contexts/auth";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Page: React.FC = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const [barcode, setBarcode] = React.useState("");
  const [shipmentItem, setShipmentItem] = React.useState<{
    meter?: number;
    kg?: number;
    orderItemId?: number;
    orderShipmentId?: number;
  }>({});
  const [tab, setTab] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  useEffect(() => {
    if (id) {
      fetch("/api/order-shipment/shipmentItem/" + id)
        .then((res) => res.json())
        .then((data) => {
          setShipmentItem(data);
          console.log(data);
        });
    }
  }, [id, refresh]);
  const handleSubmit = () => {
    const payload = {
      barcode: barcode,
      orderShipmentId: shipmentItem.orderShipmentId,
      orderItemId: shipmentItem.orderItemId,
      personnelId: getPersonnelInfo().id,
    };
    fetch("/api/order-shipment/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTab(0);
        setTab(1);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <BarcodeScannerComponent
        width={300}
        height={300}
        onUpdate={(err, result) => {
          if (result) {
            setBarcode(result.getText());
          }
        }}
      />
      <Paper style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
        <TextField
          type="text"
          variant="outlined"
          label="Barkod"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Okut
        </Button>
      </Paper>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        <Tab value={0} label="Okutulan Ürünler" />
        <Tab value={1} label="Stoktaki Uyumlu Ürünler" />
      </Tabs>
      {tab === 0 ? (
        <EnhancedTable
          title="Okutulan Ürünler"
          headCells={headCells}
          tableName={tableName}
          viewable={false}
          createable={false}
          editable={false}
          deleteable={true}
          URI={"/order-shipment/scanned/" + id}
          disableColumnMenu={true}
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
          URI={"/order-shipment/stock/" + id}
          disableColumnMenu={true}
        />
      ) : null}
    </div>
  );
};

export default Page;
