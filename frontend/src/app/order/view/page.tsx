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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { trTR } from "@/components/trTrGrid";
import { Close, Edit, LocalOffer, LocalShipping } from "@mui/icons-material";
import { usePersonnelId } from "@/contexts/auth";

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
  itemTypeId?: number;
  description?: string;
  personnelId: number;
  meter: number;
  kg: number;
  product: { name: string };
  dyeColor?: { name: string };
  laminationColor?: { name: string };
  itemType?: { name: string };
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
  orderedQuantity: number;
  unit: string;
  orderItem: OrderItem;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderRes, shipmentsRes] = await Promise.all([
          fetch(`/api/order/${orderId}`),
          fetch(`/api/order-shipment/order/${orderId}`),
        ]);

        if (!orderRes.ok) throw new Error("Failed to fetch order.");
        const orderData = await orderRes.json();
        setOrder(orderData);
        setOrderItems(orderData.orderItem || []);

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

  const handleShip = (row: OrderShipmentItem) => {
    // Handle ship logic
  };

  const handleSubmit = async (data: any) => {
    // Handle submit logic
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
      valueGetter: (params, row) => row.itemType?.name,
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
    { field: "kg", headerName: "Kg", width: 100 },
    { field: "meter", headerName: "Metre", width: 100 },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 130,
      renderCell: (params: GridRenderEditCellParams) => (
        <GridActionsCellItem
          icon={<LocalShipping />}
          label="Gönder"
          onClick={() => handleShip(params.row as OrderShipmentItem)}
        />
      ),
    },
  ];

  const shipmentColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "shippingCompany",
      headerName: "Shipping Company",
      width: 150,
      valueGetter: (params, row) => row.shippingCompany?.name || "",
    },
    {
      field: "shippingCarrier",
      headerName: "Shipping Carrier",
      width: 150,
      valueGetter: (params, row) => row.shippingCarrier?.name || "",
    },
    {
      field: "shippingCar",
      headerName: "Car",
      width: 150,
      valueGetter: (params, row) => row.shippingCar?.plate || "",
    },
    {
      field: "sentDate",
      headerName: "Sent Date",
      width: 150,
      valueFormatter: (params: any) =>
        params.value
          ? new Intl.DateTimeFormat("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(params.value))
          : null,
    },
    {
      field: "closed",
      headerName: "Status",
      width: 150,
      valueGetter: (params, row) => (row.closed ? "Closed" : "Open"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          <Button
            startIcon={params.row.closed ? <LocalShipping /> : <Close />}
            variant="contained"
            color={params.row.closed ? "secondary" : "error"}
            onClick={() => {
              // Handle action shipment logic
              setRefresh(!refresh);
            }}
          >
            {params.row.closed ? "Open" : "Close"}
          </Button>
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            onClick={() => {
              router.push(`/order-shipment/form/?id=${params.row.id}`);
            }}
          />
        </>
      ),
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
          {/* button to go to offer/order/${id} */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<LocalOffer />}
            onClick={() => {
              router.push(`/offer/form/?orderId=${orderId}`);
            }}
          >
            Teklif Oluştur
          </Button>
          <Typography variant="h4" gutterBottom>
            Sipariş Kalemleri
          </Typography>
          <DataGrid
            rows={orderItems}
            columns={columns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
          {/* <Typography variant="h4" gutterBottom>
            Shipments
          </Typography>
          <DataGrid
            rows={shipments}
            columns={shipmentColumns}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          /> */}
        </>
      )}
    </Paper>
  );
};

export default OrderView;
