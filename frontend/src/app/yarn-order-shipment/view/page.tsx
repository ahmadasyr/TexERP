"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  createdAt: string;
  account: {
    name: string;
  };
  description: string;
  closed: boolean;
  yarnOrderItem: {
    id: number;
    yarnType: {
      id: number;
      name: string;
    };
    kg: number;
  }[];
}

interface ShipmentSent {
  id: number;
  yarnOrderItemId: number;
  yarnStockEntry: {
    lot: string;
  };
  sentKg: number;
  sentCount: number;
  yarnTypeId: number; // Added for easier grouping
}

interface Shipment {
  id: number;
  createdAt: string;
  sentDate: string | null;
  closed: boolean;
  shippingCompany: {
    name: string;
  };
  shippingCarrier: {
    name: string;
  };
  shippingCar: {
    plate: string;
  };
  personnel: {
    name: string;
  };
  yarnOrderShipmentSent: ShipmentSent[];
}

const YarnOrderShipmentPage = () => {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [shipment, setShipment] = useState<Shipment | undefined>(undefined);
  const [groupedShipments, setGroupedShipments] = useState<{
    [key: number]: ShipmentSent[];
  }>({});

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await fetch(`/api/yarn-order-shipment/${id}`);
        const data = await res.json();

        // Process Order
        setOrder({
          ...data.yarnOrder,
          createdAt: new Date(data.yarnOrder.createdAt).toLocaleDateString(),
        });

        // Process Shipment
        setShipment({
          ...data,
          sentDate: data.sentDate
            ? new Date(data.sentDate).toLocaleDateString("tr-TR")
            : null,
        });

        // Group Shipment Sent by YarnTypeId
        const grouped = data.yarnOrderShipmentSent.reduce(
          (acc: { [key: number]: ShipmentSent[] }, item: any) => {
            const yarnTypeId = item.yarnStockEntry.yarnTypeId;
            if (!acc[yarnTypeId]) acc[yarnTypeId] = [];
            acc[yarnTypeId].push({
              ...item,
              yarnTypeId, // Attach yarnTypeId for easier grouping
            });
            return acc;
          },
          {}
        );

        setGroupedShipments(grouped);
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

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        İplik Sipariş ve Gönderi Bilgileri
      </h1>
      <button
        onClick={handlePrint}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          margin: "20px 0",
          backgroundColor: "#F05A29",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Yazdır
      </button>

      <div id="printable-section" style={{ margin: "20px" }}>
        {/* Order Details */}
        <div style={{ marginBottom: "30px" }}>
          <h2>Sipariş Detayları</h2>
          <p>Müşteri Adı: {order?.account.name}</p>
          <p>Sipariş Tarihi: {order?.createdAt}</p>
          <p>Açıklama: {order?.description}</p>
          <p>Kapalı: {order?.closed ? "Evet" : "Hayır"}</p>
        </div>

        {/* Grouped Shipment Sent */}
        <div>
          <h2>İplik Sipariş Gönderimi</h2>
          {Object.entries(groupedShipments).map(([yarnTypeId, shipments]) => (
            <div key={yarnTypeId} style={{ marginBottom: "20px" }}>
              <h3>
                İplik Türü:{" "}
                {
                  order?.yarnOrderItem.find(
                    (item) => item.yarnType.id === parseInt(yarnTypeId)
                  )?.yarnType.name
                }
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Lot
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Gönderilen Miktar (kg)
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                      Gönderilen Sayı
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {shipment.yarnStockEntry.lot || "N/A"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {shipment.sentKg} kg
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {shipment.sentCount}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      Toplam
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {shipments.reduce((acc, s) => acc + s.sentKg, 0)} kg
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {shipments.reduce((acc, s) => acc + s.sentCount, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YarnOrderShipmentPage;
