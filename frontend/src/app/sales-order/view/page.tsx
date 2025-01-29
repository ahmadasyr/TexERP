"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRenderEditCellParams,
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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { trTR } from "@/components/trTrGrid";
import { Close, Edit, LocalOffer, LocalShipping } from "@mui/icons-material";
import { usePersonnelId } from "@/contexts/auth";
import { set } from "date-fns";
import { itemTypes } from "@/contexts/itemTypes";

const boxStyle = {
  mb: 3,
  p: 2,
  border: 1,
  borderColor: "grey.300",
  borderRadius: 2,
  height: "100%",
};

interface Order {
  id: number;
  description: string;
  personnelId: number;
  closed: boolean;
  customerId: number;
  createdAt: Date;
  personnel: Personnel;
  customer: { name: string };
  orderItem: OrderItem[];
  orderShipment: OrderShipment[];
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  dyeColorId?: number;
  laminationColorId?: number;
  itemType?: string;
  description?: string;
  personnelId: number;
  meter: number;
  kg: number;
  product: { name: string };
  dyeColor?: { name: string };
  laminationColor?: { name: string };
}

interface OrderShipment {
  id: number;
  orderId: number;
  createdAt: Date;
  sentDate?: Date;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  closed: boolean;
  personnelId: number;
  shippingCompany?: { name: string };
  shippingCarrier?: { name: string };
  shippingCar?: { plate: string };
  orderShipmentItem: OrderShipmentItem[];
}

interface OrderShipmentItem {
  id: number;
  orderShipmentId: number;
  orderItemId: number;
  personnelId: number;
  meter: number;
  kg: number;
  orderItem: OrderItem;
}

interface ConfirmedItems {
  orderShipmentItemId: number;
  stockId: number;
  personnelId: number;
  sentMeter: number;
  sentKg: number;
  lot: string;
  barcode: string;
  orderItemId: number;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

const OrderView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = Number(searchParams.get("id"));
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [shipments, setShipments] = useState<OrderShipment[]>([]);
  const [shipmentItems, setShipmentItems] = useState<OrderShipmentItem[]>([]);
  const [confirmedItems, setConfirmedItems] = useState<ConfirmedItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderRes, shipmentsRes, confirmedRes] = await Promise.all([
          fetch(`/api/order/${orderId}`),
          fetch(`/api/order-shipment/order/${orderId}`),
          fetch(`/api/order-shipment/confirmed/${orderId}`),
        ]);

        if (!orderRes.ok) throw new Error("Failed to fetch order.");
        const orderData = await orderRes.json();
        setOrder(orderData);
        setOrderItems(orderData.orderItem || []);

        if (shipmentsRes.ok) {
          const shipmentsData = await shipmentsRes.json();
          setShipments(shipmentsData);
          setShipmentItems(
            shipmentsData.reduce(
              (acc: OrderShipmentItem[], shipment: OrderShipment) => {
                return [...acc, ...(shipment.orderShipmentItem || [])];
              },
              []
            )
          );
        } else {
          console.warn("Failed to fetch shipments.");
        }
        if (confirmedRes.ok) {
          const confirmedData = await confirmedRes.json();
          setConfirmedItems(confirmedData);
        } else {
          console.warn("Failed to fetch confirmed items.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, refresh]);

  const handleShip = (row: OrderItem) => {
    console.log(row);
    setItemToShip(row);
    setShipFormOpen(true);
  };

  const handleSubmit = async (data: any) => {
    const payload = {
      orderItemId: itemToShip?.id,
      meter: data.meter,
      kg: data.kg,
      personnelId: usePersonnelId(),
    };
    const res = await fetch("/api/order-shipment/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    setRefresh(!refresh);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Ürün",
      width: 150,
      valueGetter: (params, row) => row.product?.name,
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 130,
      renderCell: (params: GridRenderEditCellParams) =>
        confirmedItems
          .filter((item) => item.orderItemId === params.row.id)
          .reduce((acc, item) => acc + item.sentMeter, 0) < params.row.meter ? (
          <Button
            startIcon={<LocalShipping />}
            variant="contained"
            color="primary"
            onClick={() => handleShip(params.row as OrderItem)}
          >
            Sevk Et
          </Button>
        ) : (
          "Tamamlandı"
        ),
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
      field: "itemType",
      headerName: "Ürün Tipi",
      width: 150,
      valueGetter: (params, row) =>
        itemTypes.find((type) => type.value === row.itemType)?.label,
    },
    {
      field: "orderItemSpecification",
      headerName: "Özellikler",
      width: 200,
      valueGetter: (params, row) =>
        row.orderItemSpecification
          .map((spec: any) => spec.outsourceType?.name)
          .join(", "),
    },

    { field: "meter", headerName: "Metre", width: 100 },
    {
      field: "orderedMeter",
      headerName: "Sevk Emri Verilen Metre",
      width: 150,
      valueGetter: (value, row) => {
        const orderedMeter = shipmentItems
          .filter((item) => item.orderItemId === row.id)
          .reduce((acc, item) => acc + item.meter, 0);
        return orderedMeter;
      },
    },
    {
      field: "sentMeter",
      headerName: "Gönderilen Metre",
      width: 150,
      valueGetter: (value, row) => {
        return confirmedItems
          .filter((item) => item.orderItemId === row.id)
          .reduce((acc, item) => acc + item.sentMeter, 0);
      },
    },
    { field: "kg", headerName: "Kg", width: 100 },
    {
      field: "orderedkg",
      headerName: "Sevk Emri Verilen Kg",
      width: 150,
      valueGetter: (value, row) => {
        const items = shipmentItems.filter(
          (item) => item.orderItemId === row.id
        );
        const totalSentKg = items.reduce((acc, item) => acc + item.kg, 0);
        return totalSentKg;
      },
    },
    {
      field: "sentkg",
      headerName: "Gönderilen Kg",
      width: 150,
      valueGetter: (value, row) => {
        const items = confirmedItems.filter(
          (item) => item.orderItemId === row.id
        );
        return items.reduce((acc, item) => acc + item.sentKg, 0);
      },
    },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
    },
  ];

  const shipmentColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "shippingCompany",
      headerName: "Nakliye Firması",
      width: 150,
      valueGetter: (params, row) => row.shippingCompany?.name || "",
    },
    {
      field: "shippingCarrier",
      headerName: "Nakliye Taşıyıcı",
      width: 150,
      valueGetter: (params, row) => row.shippingCarrier?.name || "",
    },
    {
      field: "shippingCar",
      headerName: "Nakliye Aracı",
      width: 150,
      valueGetter: (params, row) => row.shippingCar?.plate || "",
    },
    {
      field: "sentDate",
      headerName: "Sevk Tarihi",
      width: 150,
      valueFormatter: (params, row) =>
        row?.sentDate
          ? new Date(row?.sentDate as string).toLocaleDateString("tr-TR")
          : "",
    },
    {
      field: "closed",
      headerName: "Durum",
      width: 150,
      valueGetter: (params, row) => (row.closed ? "Kapalı" : "Açık"),
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 500,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          <ButtonGroup>
            <Button
              startIcon={params.row.closed ? <LocalShipping /> : <Close />}
              variant="contained"
              color={params.row.closed ? "secondary" : "error"}
              onClick={async () => {
                await fetch(
                  `/api/order-shipment/${
                    params.row.closed ? "open" : "close"
                  }/${params.row.id}/`,
                  {
                    method: "PUT",
                  }
                );
                setRefresh(!refresh);
              }}
            >
              {params.row.closed ? "Aç" : "Kapat"}
            </Button>
            <Button
              startIcon={<Edit />}
              variant="contained"
              color="primary"
              onClick={() => {
                router.push(`/order-shipment/form/?id=${params.row.id}`);
              }}
            >
              Güncelle
            </Button>
            <Button
              startIcon={<LocalOffer />}
              variant="contained"
              color="info"
              onClick={() => {
                router.push(`/order-shipment/view/?id=${params.row.id}`);
              }}
            >
              Çeki Listesi Oluştur
            </Button>
          </ButtonGroup>
        </>
      ),
    },
  ];
  const [shipFormOpen, setShipFormOpen] = useState(false);
  const [itemToShip, setItemToShip] = useState<OrderItem | null>(null);
  const [formData, setFormData] = useState<{
    meter: number;
    kg: number;
  }>({ kg: 0, meter: 0 });
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
            <Box sx={boxStyle}>
              <Typography variant="h4" gutterBottom>
                Sipariş Detayları
              </Typography>
              {[
                { label: "No", value: order.id },
                { label: "Müşteri Adı", value: order.customer.name },
                { label: "Açıklama", value: order.description },
                {
                  label: "Oluşturan Personel",
                  value: `${order.personnel.firstName} ${order.personnel.lastName}`,
                },
                { label: "Durum", value: order.closed ? "Kapalı" : "Açık" },
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
            </Box>
          )}
          {shipFormOpen && itemToShip && (
            <form>
              <Box sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  {itemToShip.id}. Sipariş Kalemi
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Ürün Adı: <strong>{itemToShip.product.name}</strong>
                </Typography>

                {/* Order Overview Section */}
                <Paper sx={{ p: 2, mt: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Sipariş Durumu
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      {
                        label: "Sevk edilmeyen Metre",
                        value:
                          itemToShip.meter -
                          shipmentItems
                            .filter(
                              (item) => item.orderItemId === itemToShip.id
                            )
                            .reduce((acc, item) => acc + item.meter, 0),
                      },
                      {
                        label: "Sevk edilmeyen Kg",
                        value: itemToShip.kg,
                      },
                      {
                        label: "Gönderilmemiş Metre",
                        value:
                          itemToShip.meter -
                          confirmedItems
                            .filter(
                              (item) => item.orderItemId === itemToShip.id
                            )
                            .reduce((acc, item) => acc + item.sentMeter, 0),
                      },
                      {
                        label: "Gönderilmemiş Kg",
                        value:
                          itemToShip.kg -
                          confirmedItems
                            .filter(
                              (item) => item.orderItemId === itemToShip.id
                            )
                            .reduce((acc, item) => acc + item.sentKg, 0),
                      },
                    ].map(({ label, value }, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="body1">
                          <strong>{label}:</strong> {value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Shipment Overview Section */}
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Sevk Durumu
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      {
                        label: "Sevk Emri Verilen Metre",
                        value: shipmentItems
                          .filter((item) => item.orderItemId === itemToShip.id)
                          .reduce((acc, item) => acc + item.meter, 0),
                      },
                      {
                        label: "Sevk Emri Verilen Kg",
                        value: shipmentItems
                          .filter((item) => item.orderItemId === itemToShip.id)
                          .reduce((acc, item) => acc + item.kg, 0),
                      },
                      {
                        label: "Onaylanan Metre",
                        value: confirmedItems
                          .filter((item) => item.orderItemId === itemToShip.id)
                          .reduce((acc, item) => acc + item.sentMeter, 0),
                      },
                      {
                        label: "Onaylanan Kg",
                        value: confirmedItems
                          .filter((item) => item.orderItemId === itemToShip.id)
                          .reduce((acc, item) => acc + item.sentKg, 0),
                      },
                    ].map(({ label, value }, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="body1">
                          <strong>{label}:</strong> {value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Input Fields */}
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Metre ve Kg Girişi
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Metre miktar"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        onChange={(e) =>
                          setFormData({ ...formData, meter: +e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Kg miktar"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        onChange={(e) =>
                          setFormData({ ...formData, kg: +e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* Action Buttons */}
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      handleSubmit(formData);
                      setShipFormOpen(false);
                    }}
                  >
                    Kaydet
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => setShipFormOpen(false)}
                  >
                    İptal
                  </Button>
                </Box>
              </Box>
            </form>
          )}

          <Typography variant="h4" gutterBottom>
            Sipariş Kalemleri
          </Typography>
          <DataGrid
            rows={orderItems}
            columns={columns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
          <Typography variant="h4" gutterBottom>
            Sevkiyatlar
          </Typography>
          <DataGrid
            rows={shipments}
            columns={shipmentColumns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
            sortModel={[
              {
                field: "id",
                sort: "desc",
              },
            ]}
          />
        </>
      )}
    </Paper>
  );
};

export default OrderView;
