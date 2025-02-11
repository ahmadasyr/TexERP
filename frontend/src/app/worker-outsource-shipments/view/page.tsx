// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/mobileTable";
import { headCells, tableName } from "./shipmentItem";

const Page: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = React.useState<any>(null);
  useEffect(() => {
    if (id) {
      fetch("/api/outsource-order/shipment/" + id)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
        });
    }
  }, [id]);
  return (
    <div>
      <Paper elevation={3} style={{ padding: "16px", margin: "1rem" }}>
        <Typography variant="h6" gutterBottom>
          İşlem: {order?.outsourceType.name || "Bilinmiyor"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tedarikçi: {order?.supplier?.name || "Bilinmiyor"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tarih:{" "}
          {order?.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "Bilinmiyor"}
        </Typography>
      </Paper>
      <EnhancedTable
        title="Sevk Emir Ürünleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        createable={false}
        editable={false}
        deleteable={false}
        URI={"/outsource-shipment/items/" + id}
        disableColumnMenu={true}
        viewButtonLabel="Barkod Okut"
        parseParams={[
          {
            param: "shipmentId",
            value: id,
          },
        ]}
      />
    </div>
  );
};

export default Page;
