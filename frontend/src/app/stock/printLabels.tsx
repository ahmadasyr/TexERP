import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@mui/material";
import { itemTypes } from "@/contexts/itemTypes";

interface Stock {
  id: number;
  createdAt: string;
  product: string;
  dyeColor: string;
  laminationColor: string;
  specs: string;
  lot: string;
  meter: number;
  kg: number;
  productionOrder: number;
  status: string;
  quality: number;
  qualityNote: string;
  barcode: string;
  yon: boolean;
  machine: string;
}

interface PrintLabelsProps {
  ids: number[];
  onClose: () => void;
  open: boolean;
}

const PrintLabels: React.FC<PrintLabelsProps> = ({ ids, onClose, open }) => {
  const [stocks, setStocks] = React.useState<Stock[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const res = await fetch("/api/stock/ids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      setStocks(data);
    };
    fetchStocks();
  }, [ids]);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <style>
              @media print {
                .label-container { 
                  page-break-inside: avoid; 
                  width: 90mm; 
                  height: 60mm; 
                  margin: 0;
                  display: flex; 
                  flex-direction: column; 
                  padding: 2mm; 
                  box-sizing: border-box; 
                  font-size: 5px; 
                }
                p {
                  margin: 1px;
                  max-width: 90mm;
                }
                body { margin: 0; padding: 0; }
              }
              @font-face {
                font-family: 'Libre Barcode 39 Text';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/librebarcode39text/v29/sJoa3KhViNKANw_E3LwoDXvs5Un0HQ1vT-0H0h5K.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              .barcode-text {
                font-family: "Libre Barcode 39 Text";
                font-size: 20px;
                margin: 0 0 5px 0;
                max-width: 50mm;
                text-align: center;

              }
                .label-headers {
                display: flex;
                justify-content: space-between;
                width: 50mm;
                margin: 'auto';
                align-items: center;
                }
              body {
                font-family: 'Poppins', Courier, monospace;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                width: 90mm !important;
              }
            </style>
          </head>
          <body>${printRef.current.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };
  useEffect(() => {
    if (open) {
      handlePrint();
      onClose();
    }
  }, [open, stocks]);
  return (
    <div
      style={{
        display: "none",
      }}
      ref={printRef}
    >
      {stocks.map((stock) => (
        <div key={stock.id} className="label-container">
          <div style={{ maxWidth: "50mm", marginBottom: "2px" }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "50px", display: "block", margin: "0 auto" }}
            />
          </div>
          <div className="label-headers">
            <p>{new Date(stock.createdAt).toLocaleString("tr-TR")}</p>
            <b>
              {itemTypes.find((item) => item.value === stock.status)?.label}{" "}
              Deposu
            </b>
            <p>Lot: {stock.lot}</p>
          </div>
          <p>
            Ürün: <strong>{stock.product}</strong>
          </p>
          {stock.dyeColor && (
            <p>
              Boya Rengi: <strong>{stock.dyeColor}</strong>
            </p>
          )}
          {stock.specs && (
            <p>
              Ürün Özellikleri: <strong>{stock.specs}</strong>
            </p>
          )}
          {stock.laminationColor && (
            <p>
              Lamine Rengi: <strong>{stock.laminationColor}</strong>
            </p>
          )}
          <p>Makina No: {stock.machine}</p>
          {stock.yon && <p>Yön: {stock.yon ? "B" : "A"}</p>}
          <p>
            Kalite: {stock.quality} | Not: {stock.qualityNote}
          </p>
          <p className="barcode-text">{stock.barcode}</p>
          <div className="label-headers">
            <p>Metre: {stock.meter.toFixed(2)}</p>
            <p>KG: {stock.kg.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintLabels;
