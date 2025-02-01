"use client";
import { itemTypes } from "@/contexts/itemTypes";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  createdAt: string;
  customer: { name: string };
  description: string;
  closed: boolean;
  orderItem: {
    id: number;
    product: { id: number; name: string };
    dyeColor: { id: number; name: string };
    itemType: string;
    laminationColor: { id: number; name: string };
    meter: number;
    kg: number;
  }[];
}

interface orderShipmentConfirmation {
  id: number;
  orderItemId: number;
  stockId: number;
  sentKg: number;
  sentMeter: number;
  lot: string;
  barcode: string;
}

interface orderShipment {
  id: number;
  createdAt: string;
  sentDate: string | null;
  orderShipmentConfirmation: orderShipmentConfirmation[];
}

const OrderShipmentPage = () => {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [shipment, setShipment] = useState<orderShipment | undefined>(
    undefined
  );
  const [flattenedShipments, setFlattenedShipments] = useState<
    {
      productId: number;
      productName: string;
      itemType: string;
      color: string;
      shipments: orderShipmentConfirmation[];
    }[]
  >([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await fetch(`/api/order-shipment/${id}`);
        const data = await res.json();

        setOrder(data.order);
        setShipment(data);

        // Flatten data
        const flatData: {
          productId: number;
          productName: string;
          itemType: string;
          color: string;
          shipments: orderShipmentConfirmation[];
        }[] = [];

        data.orderShipmentConfirmation.forEach((item: any) => {
          const orderItem = data.order.orderItem.find(
            (oi: any) => oi.id === item.orderItemId
          );

          if (orderItem) {
            const productId = orderItem.product.id;
            const productName = orderItem.product.name;
            const itemType =
              itemTypes.find((type) => type.value === orderItem.itemType)
                ?.label || "Yok";
            const color =
              orderItem.dyeColor?.name ||
              orderItem.laminationColor?.name ||
              "N/A";

            // Find existing entry for the combination
            let existingEntry = flatData.find(
              (entry) =>
                entry.productId === productId &&
                entry.itemType === itemType &&
                entry.color === color
            );

            if (!existingEntry) {
              existingEntry = {
                productId,
                productName,
                itemType,
                color,
                shipments: [],
              };
              flatData.push(existingEntry);
            }

            existingEntry.shipments.push(item);
          }
        });

        setFlattenedShipments(flatData);
      }
    };

    fetchData();
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById("printable-section");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(
        "<html><head><title>Yazdır</title></head><body>"
      );
      printWindow?.document.write(printContent.innerHTML);
      printWindow?.document.write("</body></html>");
      printWindow?.document.close();
      printWindow?.print();
    }
  };
  const [exporting, setExporting] = useState<boolean>(false);
  const [addedWeight, setAddedWeight] = useState<number>(0.4);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Sipariş ve Gönderi Bilgileri
      </h1>
      <Paper
        sx={{
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Print Button */}
            <Button
              size="large"
              variant="contained"
              onClick={handlePrint}
              fullWidth
            >
              Yazdır
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="export-select-label">İhracat</InputLabel>
                <Select
                  labelId="export-select-label"
                  fullWidth
                  sx={{ minWidth: "100%" }}
                  id="export-select"
                  value={exporting ? 1 : 0} // Ensure value matches boolean state
                  label="İhracat"
                  onChange={(e) => setExporting(e.target.value === 1)}
                >
                  <MenuItem value={1}>Dış İhracat</MenuItem>
                  <MenuItem value={0}>İç İhracat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Conditional TextField for Added Weight */}
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="number"
              label="Eklenen Ağırlık"
              disabled={!exporting}
              value={addedWeight}
              onChange={(e) => setAddedWeight(parseFloat(e.target.value))}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
      <div id="printable-section" style={{ margin: "20px" }}>
        <h2>Sipariş Detayları</h2>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ margin: "5px 0" }}>
            <strong>Müşteri Adı:</strong> {order?.customer.name}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Tarih:</strong>{" "}
            {shipment?.sentDate
              ? new Date(shipment.sentDate).toLocaleDateString()
              : ""}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Fiş No:</strong> {order?.id}
          </p>
        </div>

        <h2>Gönderi Detayları</h2>
        {flattenedShipments.map((entry, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    colSpan={6}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {`${entry.productName} ${entry.color} - Tür: ${entry.itemType} `}
                  </th>
                </tr>
                <tr
                  style={{
                    textAlign: "left",
                  }}
                >
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    #
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Barkod
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Metre
                  </th>
                  {entry.itemType === "Ham Kumaş" || exporting ? (
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      KG {exporting && "(net)"}
                    </th>
                  ) : null}
                  {exporting && (
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      KG (brüt)
                    </th>
                  )}
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Lot
                  </th>
                </tr>
              </thead>
              <tbody>
                {entry.shipments.map((shipment, i) => (
                  <tr key={shipment.id}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {shipment.barcode || "N/A"}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {shipment.sentMeter.toFixed(2)}
                    </td>
                    {entry.itemType === "Ham Kumaş" || exporting ? (
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {shipment.sentKg.toFixed(2)}
                      </td>
                    ) : null}

                    {exporting && (
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {(shipment.sentKg + addedWeight).toFixed(2)}{" "}
                      </td>
                    )}

                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {shipment.lot || "N/A"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={1}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    Toplam:
                  </td>
                  <td
                    colSpan={1}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                    }}
                  ></td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.shipments
                      .reduce((sum, s) => sum + s.sentMeter, 0)
                      .toFixed(2)}{" "}
                    m
                  </td>

                  {entry.itemType === "Ham Kumaş" || exporting ? (
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {entry.shipments
                        .reduce((sum, s) => sum + s.sentKg, 0)
                        .toFixed(2)}
                    </td>
                  ) : null}
                  {exporting && (
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {(
                        entry.shipments.reduce((sum, s) => sum + s.sentKg, 0) +
                        addedWeight * entry.shipments.length
                      ).toFixed(2)}{" "}
                      kg
                    </td>
                  )}
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.shipments.length} Top
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        <div style={{ marginTop: "40px", marginBottom: "20px" }}>
          <p style={{ margin: "5px 0" }}>
            <strong>Tarih:</strong> {new Date().toLocaleDateString()}
          </p>
          <br />
          <p style={{ margin: "5px 0" }}>
            <strong>Alıcı Ad Soyad / İmza:</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderShipmentPage;
