"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRenderEditCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  LinearProgress,
  ButtonGroup,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { trTR } from "@/components/trTrGrid";
import {
  Close,
  CloseOutlined,
  Edit,
  EditAttributes,
  EditNote,
  LocalOffer,
  LocalShipping,
  OpenInBrowser,
  OpenInNew,
} from "@mui/icons-material";
import { usePersonnelId } from "@/contexts/auth";
import { set } from "date-fns";
import { itemTypes } from "@/contexts/itemTypes";
import {
  OutsourceOrder,
  OutsourceOrderItem,
  OutsourceShipment,
  OutsourceShipmentItem,
  OutsourceConfirmation,
  Personnel,
} from "./types";
import Link from "next/link";
import { OrderItem } from "@/app/sales-order/view/types";
import React from "react";

const boxStyle = {
  mb: 3,
  p: 2,
  border: 1,
  borderColor: "grey.300",
  borderRadius: 2,
  height: "100%",
};

const OrderView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = Number(searchParams.get("id"));
  const [order, setOrder] = useState<OutsourceOrder | null>(null);
  const [orderItems, setOrderItems] = useState<OutsourceOrderItem[]>([]);
  const [shipments, setShipments] = useState<OutsourceShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderRes, shipmentsRes, confirmedRes] = await Promise.all([
          fetch(`/api/outsource-order/${orderId}`),
          fetch(`/api/outsource-shipment/order/${orderId}`),
          fetch(`/api/outsource-shipment/confirmed/${orderId}`),
        ]);

        if (!orderRes.ok) throw new Error("Failed to fetch order.");
        const orderData = await orderRes.json();
        setOrder(orderData);
        setOrderItems(orderData.outsourceOrderItem || []);

        if (shipmentsRes.ok) {
          const shipmentsData = await shipmentsRes.json();
          setShipments(shipmentsData);
        } else {
          console.warn("Failed to fetch shipments.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, refresh]);

  const columns: GridColDef[] = [
    {
      field: "details",
      headerName: "Detaylar",
      width: 150,
      renderCell: (params) => (
        <Link href={`/outsource-order/view/view/?id=${params.row.id}`}>
          <Button variant="contained" color="primary">
            Detaylar
          </Button>
        </Link>
      ),
    },
    {
      field: "product",
      headerName: "Ürün",
      width: 150,
      valueGetter: (params, row) => row.product?.name,
    },
    {
      field: "dyeColor",
      headerName: "Boya Rengi",
      width: 150,
      valueGetter: (params, row) => row.dyeColor?.name,
    },
    {
      field: "laminationColor",
      headerName: "Lamine Rengi",
      width: 150,
      valueGetter: (params, row) => row.laminationColor?.name,
    },
    {
      field: "quantity",
      headerName: "Miktar",
      width: 150,
    },
    {
      field: "unit",
      headerName: "Birim",
      width: 150,
    },
    {
      field: "sentKg",
      headerName: "Gönderilen Kg",
      width: 150,
    },
    {
      field: "sentMeter",
      headerName: "Gönderilen Metre",
      width: 150,
    },
    {
      field: "sentCount",
      headerName: "Gönderilen Top",
      width: 150,
    },
    {
      field: "remainingKg",
      headerName: "Kalan Kg",
      width: 150,
    },
    {
      field: "remainingMeter",
      headerName: "Kalan Metre",
      width: 150,
    },
    {
      field: "remainingCount",
      headerName: "Kalan Top",
      width: 150,
    },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
    },
  ];

  return (
    <Paper
      style={{
        margin: "auto",
      }}
      sx={{ p: 3 }}
    >
      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {order && (
            <>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography variant="h4" gutterBottom>
                      Sipariş Detayları
                    </Typography>
                    {[
                      { label: "No", value: order.id },
                      { label: "Firma", value: order.supplier.name },
                      { label: "Açıklama", value: order.description },
                      {
                        label: "Oluşturan Personel",
                        value: `${order.personnel.firstName} ${order.personnel.lastName}`,
                      },
                      {
                        label: "Durum",
                        value: order.closed ? "Kapalı" : "Açık",
                      },
                      {
                        label: "Tarih",
                        value: new Intl.DateTimeFormat("tr-TR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(order.createdAt)),
                      },
                    ].map(({ label, value }) => (
                      <Typography key={label} variant="body1">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                    <ButtonGroup>
                      <Link href={`/outsource-order/form/?id=${order.id}`}>
                        <Button
                          startIcon={<Edit />}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Sipariş Detaylarını Güncelle
                        </Button>
                      </Link>
                      {order.closed ? (
                        <Button
                          startIcon={<OpenInBrowser />}
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={async () => {
                            await fetch(
                              `/api/outsource-order/open/${order.id}`,
                              {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  orderId: orderId,
                                  personnelId: usePersonnelId(),
                                }),
                              }
                            );
                            setRefresh(!refresh);
                          }}
                        >
                          Siparişi Aç
                        </Button>
                      ) : (
                        <Button
                          startIcon={<CloseOutlined />}
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={async () => {
                            await fetch(
                              `/api/outsource-order/close/${order.id}`,
                              {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  orderId: orderId,
                                  personnelId: usePersonnelId(),
                                }),
                              }
                            );
                            setRefresh(!refresh);
                          }}
                        >
                          Siparişi Kapat
                        </Button>
                      )}
                    </ButtonGroup>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography variant="h4" gutterBottom>
                      İrsaliye Detayları
                    </Typography>
                    {shipments.length > 0 ? (
                      <>
                        {[
                          { label: "No", value: shipments[0].id },
                          {
                            label: "Emir Açan Personel",
                            value: `${shipments[0].personnel.firstName} ${shipments[0].personnel.lastName}`,
                          },
                          {
                            label: "Durum",
                            value: shipments[0].closed
                              ? "Gönderildi"
                              : "Gönderilmedi",
                          },
                          {
                            label: "Emir Tarihi",
                            value: new Intl.DateTimeFormat("tr-TR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(shipments[0].createdAt)),
                          },
                          {
                            label: "Gönderim Tarihi",
                            value:
                              shipments[0].sentDate &&
                              new Intl.DateTimeFormat("tr-TR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(shipments[0].sentDate)),
                          },
                        ].map(({ label, value }) => (
                          <Typography key={label} variant="body1">
                            <strong>{label}:</strong> {value}
                          </Typography>
                        ))}
                        <ButtonGroup>
                          <Link
                            href={`/outsource-shipment/form/?id=${shipments[0].id}`}
                          >
                            <Button
                              startIcon={<EditNote />}
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              İrsaliye Detaylarını Güncelle
                            </Button>
                          </Link>

                          <Link
                            href={`/outsource-shipment/view/?id=${shipments[0].id}`}
                          >
                            <Button
                              startIcon={<LocalOffer />}
                              variant="contained"
                              color="info"
                              size="small"
                            >
                              Çeki Listesi Oluştur
                            </Button>
                          </Link>
                          {shipments[0].closed ? (
                            <Button
                              startIcon={<OpenInNew />}
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={async () => {
                                await fetch(
                                  `/api/outsource-shipment/open/${shipments[0].id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      orderId: orderId,
                                      personnelId: usePersonnelId(),
                                    }),
                                  }
                                );
                                setRefresh(!refresh);
                              }}
                            >
                              İrsaliyeyi Aç
                            </Button>
                          ) : (
                            <Button
                              startIcon={<Close />}
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={async () => {
                                await fetch(
                                  `/api/outsource-shipment/close/${shipments[0].id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      orderId: orderId,
                                      personnelId: usePersonnelId(),
                                    }),
                                  }
                                );
                                setRefresh(!refresh);
                              }}
                            >
                              İrsaliyeyi Kapat
                            </Button>
                          )}
                        </ButtonGroup>
                      </>
                    ) : (
                      <Box>
                        <Typography variant="body1">
                          Henüz irsaliye oluşturulmamış.
                        </Typography>
                        <Button
                          startIcon={<LocalShipping />}
                          variant="contained"
                          color="primary"
                          onClick={async () => {
                            await fetch(`/api/outsource-shipment/`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                orderId: orderId,
                                personnelId: usePersonnelId(),
                              }),
                            });
                            setRefresh(!refresh);
                          }}
                        >
                          İrsaliye Oluştur
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </>
          )}

          <Typography variant="h4" gutterBottom>
            Sipariş Kalemleri
          </Typography>
          <DataGrid
            rows={orderItems}
            columns={columns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
        </>
      )}
    </Paper>
  );
};

export default OrderView;
