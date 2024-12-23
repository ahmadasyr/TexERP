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
  Checkbox,
  Paper,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { trTR } from "@/components/trTrGrid";
import { Close, Edit, LocalShipping } from "@mui/icons-material";
import { usePersonnelId } from "@/contexts/auth";

const boxStyle = {
  mb: 3,
  p: 2,
  border: 1,
  borderColor: "grey.300",
  borderRadius: 2,
  height: "100%",
};

interface Account {
  id: number;
  name: string;
}

interface Order {
  id: number;
  createdAt: Date;
  accountId: number;
  type: string;
  description: string;
  closed: boolean;
  personnel: Personnel;
  account: { name: string };
}

interface OrderItem {
  id: number;
  orderId: number;
  dyeColorId: number;
  laminationColorId: number;
  itemTypeId: number;
  personnelId: number;
  itemType: { name: string };
  personnel: Personnel;
  lot: string;
  unit: string;
  quantity: number;
  description: string;
  sentKg: number;
  sentMeter: number;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

interface OrderShipment {
  no: number;
  id?: number;
  orderId?: number;
  createdAt?: Date;
  sentDate?: Date;
  closed?: boolean;
  personnelId?: number;
  personnel?: Personnel;
  shippingCompanyId?: number;
  shippingCompany?: { name: string };
  shippingCarrier: { name: string };
  shippingCar: { plate: string };
  orderShipmentItems: OrderShipmentItem[];
}

interface OrderShipmentConfirmation {
  no: number;
  id?: number;
  orderShipmentItemId?: number;
  sentMeter?: number;
  sentKg: number;
  personnelId: number;
  lot?: string;
  barcode?: string;
}

interface OrderShipmentItem {
  no: number;
  id?: number;
  orderShipmentId?: number;
  orderItemId?: number;
  orderedQuantity: number;
  unit: string;
  OrderShipmentConfirmation?: OrderShipmentConfirmation[];
}

const OrderView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = Number(searchParams.get("id"));
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [shipments, setShipments] = useState<OrderShipment[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderRes, accountsRes, personnelsRes, shipmentsRes] =
          await Promise.all([
            fetch(`/api/order/${orderId}`),
            fetch(`/api/account/properties/0/0/1/0`),
            fetch(`/api/personnel`),
            fetch(`/api/order-shipment/order/${orderId}`),
          ]);

        if (!orderRes.ok) throw new Error("Failed to fetch order.");
        const orderData = await orderRes.json();
        setOrder(orderData);
        setOrderItems(
          orderData.orderItems.map((item: OrderItem, index: number) => ({
            ...item,
            no: index + 1,
          })) || []
        );

        if (accountsRes.ok) {
          const accountsData = await accountsRes.json();
          setAccounts(accountsData);
        } else {
          console.warn("Failed to fetch accounts.");
        }

        if (personnelsRes.ok) {
          const personnelsData = await personnelsRes.json();
          setPersonnels(personnelsData);
        } else {
          console.warn("Failed to fetch personnel.");
        }

        if (shipmentsRes.ok) {
          const shipmentsData = await shipmentsRes.json();
          setShipments(shipmentsData);
        } else {
          console.warn("Failed to fetch shipments.");
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, refresh]);

  const handleAddRow = (shipmentIndex: number) => {};
  const handleSaveRow = (row: OrderShipmentItem) => {};
  const handleDeleteRow = (no: number) => {};
  const [itemToShip, setItemToShip] = useState<OrderShipmentItem | null>(null);
  const [shipFormOpen, setShipFormOpen] = useState(false);
  const [formData, setFormData] = useState<{
    sentKg: number;
    sentMeter: number;
    personnelId: number;
    orderItemId: number | null;
    orderShipmentId: number | null;
  }>({
    sentKg: 0,
    sentMeter: 0,
    personnelId: usePersonnelId(),
    orderItemId: null,
    orderShipmentId: null,
  });
  const handleShip = (row: OrderShipmentItem) => {
    setItemToShip(row);
    setFormData({
      sentKg: 0,
      sentMeter: 0,
      personnelId: usePersonnelId(),
      orderItemId: Number(row.id),
      orderShipmentId: null,
    });
    setShipFormOpen(true);
  };
  const handleSubmit = async (data: typeof formData) => {
    const shipment = shipments.find((shipment) => !shipment.closed);
    if (shipment) {
      await fetch(`/api/order-shipment-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          orderShipmentId: shipment.id,
        }),
      });
    } else {
      const res = await fetch(`/api/order-shipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          personnelId: usePersonnelId(),
        }),
      });
      if (res.ok) {
        const shipmentData = await res.json();
        await fetch(`/api/order-shipment-item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            orderShipmentId: shipmentData.id,
          }),
        });
      }
    }
    setRefresh(!refresh);
  };

  const columns: GridColDef[] = [
    {
      field: "no",
      headerName: "#",
      width: 70,
      type: "number",
    },
    {
      field: "itemType",
      headerName: "Ürün Türü",
      width: 150,
      valueGetter: (params, row) =>
        orderItems.find((item) => item.id === row.id)?.itemType.name,
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Miktar",
      width: 100,
    },
    {
      field: "sentKg",
      headerName: "Gönderilen Kg",
      width: 150,
      valueGetter: (params) => {
        const shipmentItems = shipments.flatMap(
          (shipment) => shipment.orderShipmentItems
        );
        const totalItemsSent = shipmentItems.flatMap(
          (item) => item.OrderShipmentConfirmation
        );
        const totalSentKg = totalItemsSent.reduce(
          (acc, item) => acc + (item?.sentKg || 0),
          0
        );
        return totalSentKg;
      },
    },
    {
      field: "sentMeter",
      headerName: "Gönderilen Metre",
      width: 150,
      valueGetter: (params) => {
        const shipmentItems = shipments.flatMap(
          (shipment) => shipment.orderShipmentItems
        );
        const totalItemsSent = shipmentItems.flatMap(
          (item) => item.OrderShipmentConfirmation
        );
        const totalSentMeter = totalItemsSent.reduce(
          (acc, item) => acc + (item?.sentMeter || 0),
          0
        );
      },
    },
    {
      field: "remainingKg",
      headerName: "Kalan Kg",
      width: 150,
      valueGetter: (params, row) => {
        const shipmentItems = shipments.flatMap(
          (shipment) => shipment.orderShipmentItems
        );
        const totalItemsSent = shipmentItems.flatMap(
          (item) => item.OrderShipmentConfirmation
        );
        const totalSentKg = totalItemsSent.reduce(
          (acc, item) => acc + (item?.sentKg || 0),
          0
        );
        return row.quantity - totalSentKg;
      },
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 130,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          <GridActionsCellItem
            icon={<LocalShipping />}
            label="Sevk Et"
            onClick={() => handleShip(params.row as OrderShipmentItem)}
          />
        </>
      ),
    },
  ];

  const actionShipment = async (shipment: OrderShipment) => {
    await fetch(`/api/order-shipment/${shipment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        closed: !shipment.closed,
      }),
    });
    setRefresh(!refresh);
  };

  const shipmentColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "#",
      width: 70,
      type: "number",
      valueGetter: (params, row) =>
        shipments.findIndex((shipment) => shipment.id === row.id) + 1,
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "shippingCompany",
      headerName: "Nakliye Firması",
      width: 150,
      valueGetter: (params, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCompany
          ?.name || null,
    },
    {
      field: "shippingCarrier",
      headerName: "Nakliyeci",
      width: 150,
      valueGetter: (params, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCarrier
          ?.name || null,
    },
    {
      field: "shippingCar",
      headerName: "Araç",
      width: 150,
      valueGetter: (params, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCar
          ?.plate || null,
    },
    {
      field: "sentDate",
      headerName: "Sevk Tarihi",
      width: 150,
      valueFormatter: (params, row) => {
        return row.sentDate
          ? new Intl.DateTimeFormat("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(row.sentDate as string))
          : null;
      },
    },
    {
      field: "closed",
      headerName: "Durum",
      width: 150,
      valueGetter: (params, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.closed
          ? "Kapalı"
          : "Açık",
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 200,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          <Button
            startIcon={
              shipments.find(
                (shipment) => shipment.id === (params.row as OrderShipment).id
              )?.closed ? (
                <LocalShipping />
              ) : (
                <Close />
              )
            }
            variant="contained"
            color={
              shipments.find(
                (shipment) => shipment.id === (params.row as OrderShipment).id
              )?.closed
                ? "secondary"
                : "error"
            }
            onClick={() => actionShipment(params.row as OrderShipment)}
          >
            {shipments.find(
              (shipment) => shipment.id === (params.row as OrderShipment).id
            )?.closed
              ? "Aç"
              : "Kapat"}
          </Button>
          <GridActionsCellItem
            icon={<Edit />}
            label="Düzenle"
            onClick={() => {
              router.push(`/order-shipment/form/?id=${params.row.id}`);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Typography>Loading...</Typography>
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
                { label: "ID", value: order.id },
                { label: "Hesap", value: order.account.name },
                { label: "Açıklama", value: order.description },
                { label: "Durum", value: order.closed ? "Kapalı" : "Açık" },
                {
                  label: "Personel",
                  value:
                    order.personnel?.firstName +
                    " " +
                    order.personnel?.lastName,
                },
                {
                  label: "Oluşturulma Tarihi",
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
          {shipFormOpen && itemToShip ? (
            <>
              <form>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {itemToShip.no}. Ürün Türü:{" "}
                    {
                      orderItems.find((item) => item.id === itemToShip.id)
                        ?.itemType.name
                    }
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Gönderilecek Kg:</strong>{" "}
                        {orderItems
                          .filter((item) => item.id === itemToShip.id)
                          .reduce((acc, item) => acc + item.quantity, 0)}{" "}
                        Kg
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Gönderilecek Metre:</strong>{" "}
                        {itemToShip.orderedQuantity || 0} Metre
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Kg miktar:</strong>{" "}
                        <TextField
                          size="small"
                          type="number"
                          value={formData.sentKg}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sentKg: +e.target.value,
                            })
                          }
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Metre miktar:</strong>{" "}
                        <TextField
                          type="number"
                          size="small"
                          value={formData.sentMeter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sentMeter: +e.target.value,
                            })
                          }
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button
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
                </Paper>
              </form>
            </>
          ) : null}
          <Typography variant="h4" gutterBottom>
            Bu siparişe ait ürünler
          </Typography>
          <DataGrid
            rows={orderItems}
            columns={columns}
            rowCount={orderItems.length}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
          <Typography variant="h4" gutterBottom>
            Bu siparişe ait sevkiyatlar
          </Typography>
          <DataGrid
            rows={shipments}
            columns={shipmentColumns}
            rowCount={shipments.length}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
        </>
      )}
    </Box>
  );
};

export default OrderView;
