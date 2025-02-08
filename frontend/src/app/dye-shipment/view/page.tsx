"use client";
import { itemTypes } from "@/contexts/itemTypes";
import { Box, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DyeShipment {
  id: number;
  createdAt: string;
  personnelId: number;
  sentDate: string | null;
  dyeOrderId: number;
  closed: boolean;
  shippingCompanyId: number;
  shippingCarrierId: number;
  shippingCarId: number;
  dyeOrder: {
    id: number;
    stockStatus: string;
    supplier: { name: string };
    product: { name: string };
    createdAt: string;
    dyeOrderItem: {
      kazanNo: string;
      dyeColor: { name: string };
      yon: boolean;
      lot: string;
      dyeShipmentItem: {
        id: number;
        dyeShipmentId: number;
        dyeOrderItemId: number;
        stockId: number;
        personnelId: number;
        meter: number;
        kg: number;
        count: number;
        stock: { meter: number; kg: number; barcode: string };
        personnel: {
          id: number;
          firstName: string;
          lastName: string;
        };
      }[];
    }[];
  };
  shippingCompany: { id: number; name: string };
  shippingCarrier: { id: number; name: string };
  shippingCar: { id: number; plate: string };
  personnel: { id: number; firstName: string; lastName: string };
  dyeOrderItems: {
    kazanNo: string;
    dyeColor: { name: string };
    yon: boolean;
    lot: string;
    dyeShipmentItem: {
      id: number;
      dyeShipmentId: number;
      dyeOrderItemId: number;
      stockId: number;
      personnelId: number;
      meter: number;
      kg: number;
      count: number;
      stock: { meter: number; kg: number; barcode: string };
      personnel: string;
      barcode: string;
    }[];
    scannedItems: {
      id: number;
      dyeShipmentId: number;
      dyeOrderItemId: number;
      stockId: number;
      personnelId: number;
      meter: number;
      kg: number;
      count: number;
      stock: { meter: number; kg: number; barcode: string };
      personnel: string;
      barcode: string;
    }[];
  }[];
}

const OrderShipmentPage = () => {
  const [shipment, setShipment] = useState<DyeShipment | undefined>(undefined);
  const [groupedItems, setGroupedItems] = useState<
    Record<
      string,
      {
        kazanNo: string;
        dyeColor: string;
        lot: string;
        yon: boolean;
        items: {
          id: number;
          barcode: string;
          meter: number;
          kg: number;
          count: number;
          personnel: string;
        }[];
      }[]
    >
  >({});

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await fetch(`/api/dye-shipment/${id}`);
        const data = await res.json();
        setShipment(data);

        // Group items by kazanNo
        const grouped: Record<
          string,
          {
            kazanNo: string;
            dyeColor: string;
            lot: string;
            yon: boolean;
            items: {
              id: number;
              barcode: string;
              meter: number;
              kg: number;
              count: number;
              personnel: string;
            }[];
          }[]
        > = {};

        data.dyeOrderItems.forEach((item: any) => {
          const kazanNo = item.kazanNo;
          if (!grouped[kazanNo]) {
            grouped[kazanNo] = [];
          }

          grouped[kazanNo].push({
            kazanNo: item.kazanNo,
            dyeColor: item.dyeColor.name,
            lot: item.lot,
            yon: item.yon,
            items: item.scannedItems.map((scanned: any) => ({
              id: scanned.id,
              barcode: scanned.barcode,
              meter: scanned.meter,
              kg: scanned.kg,
              count: scanned.count,
              personnel: scanned.personnel,
            })),
          });
        });

        setGroupedItems(grouped);
      }
    };

    fetchData();
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById("printable-section");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Yazdır</title></head><body>"
        );
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();

        // Add an event listener to open the print dialog
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close(); // Close the print window after printing
        };
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Boyahane Çeki Listesi
      </h1>
      <Paper sx={{ padding: "1rem" }}>
        <div id="printable-section" style={{ margin: "20px" }}>
          <table
            style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "5px 0" }}>
                  <strong>Sipariş No:</strong> {shipment?.dyeOrder?.id}
                </td>
                <td style={{ padding: "5px 0" }}>
                  <strong>Boyahane:</strong> {shipment?.dyeOrder.supplier.name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0" }}>
                  <strong>Gönderi Tarihi: </strong>
                  {shipment?.sentDate
                    ? new Date(shipment.sentDate).toLocaleDateString()
                    : ""}
                </td>
                <td style={{ padding: "5px 0" }}>
                  <strong>Giden Kumaş:</strong>{" "}
                  {shipment?.dyeOrder.product.name} -{" "}
                  {
                    itemTypes.find(
                      (item) => item.value === shipment?.dyeOrder.stockStatus
                    )?.label
                  }
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Gönderi Detayları</h2>
          {Object.entries(groupedItems).map(([kazanNo, items]) => (
            <div key={kazanNo} style={{ marginBottom: "30px" }}>
              {items.map((group, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <thead>
                      <tr>
                        <b>
                          Renk: {group.dyeColor} - Lot: {group.lot} - Kazan No:{" "}
                          {group.kazanNo} - Yön: {group.yon ? "B" : "A"}
                        </b>
                      </tr>
                    </thead>
                  </table>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Barkod
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Metre
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          KG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {item.barcode}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {item.meter.toFixed(2)}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {item.kg.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          <b>Toplam:</b>{" "}
                          {group.items.reduce(
                            (acc, curr) => acc + curr.count,
                            0
                          )}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          <b>
                            {group.items
                              .reduce((acc, curr) => acc + curr.meter, 0)
                              .toFixed(2)}
                          </b>
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                          }}
                        >
                          <b>
                            {group.items
                              .reduce((acc, curr) => acc + curr.kg, 0)
                              .toFixed(2)}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              <div style={{ marginBottom: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{ border: "1px solid #ddd", padding: "8px" }}
                      ></th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Metre
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        KG
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Adet
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <b>Genel Toplam:</b>
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <b>
                          {items
                            .reduce(
                              (acc, curr) =>
                                acc +
                                curr.items.reduce(
                                  (acc, curr) => acc + curr.meter,
                                  0
                                ),
                              0
                            )
                            .toFixed(2)}
                        </b>
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <b>
                          {items
                            .reduce(
                              (acc, curr) =>
                                acc +
                                curr.items.reduce(
                                  (acc, curr) => acc + curr.kg,
                                  0
                                ),
                              0
                            )
                            .toFixed(2)}
                        </b>
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <b>
                          {items.reduce(
                            (acc, curr) =>
                              acc +
                              curr.items.reduce(
                                (acc, curr) => acc + curr.count,
                                0
                              ),
                            0
                          )}
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      </Paper>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handlePrint}>Yazdır</button>
      </Box>
    </div>
  );
};

export default OrderShipmentPage;
