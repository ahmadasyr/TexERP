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

interface YarnOrder {
  id: number;
  accountId: number;
  sale: boolean;
  description: string;
  account: { name: string };
  personnel: Personnel;
  closed: boolean;
  createdAt: Date;
}

interface YarnOrderItem {
  id: number;
  yarnOrderId: number;
  yarnTypeId: number;
  kg: number;
  price: number;
  currencyId: number;
  personnelId: number;
  yarnOrder: YarnOrder;
  yarnType: { name: string };
  personnel: Personnel;
  lot: string;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

interface YarnOrderShipment {
  no: number;
  id?: number;
  yarnOrderId?: number;
  createdAt?: Date;
  sentDate?: Date;
  closed?: boolean;
  shippingCompanyId?: number;
  personnelId?: number;
  shippingCompany?: { name: string };
  personnel?: Personnel;
  shippingCarrier: { name: string };
  shippingCar: { plate: string };
  yarnOrderShipmentItem: YarnOrderShipmentItem[];
  yarnOrderShipmentSent: YarnOrderShipmentSent[];
}

interface YarnOrderShipmentSent {
  no: number;
  id?: number;
  yarnOrderShipmentId?: number;
  yarnOrderItemId?: number;
  sentKg: number;
  sentCount: number;
}

interface YarnOrderShipmentItem {
  no: number;
  id?: number;
  personnelId: number;
  yarnOrderShipmentId?: number;
  yarnOrderItemId?: number;
  sentKg: number;
  sentCount: number;
  kg?: number;
}

const YarnSaleView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const yarnOrderId = Number(searchParams.get("id"));
  // Define columns for the DataGrid
  const [yarnShipmentItems, setYarnShipmentItems] = useState<
    YarnOrderShipmentItem[]
  >([]);
  const [yarnOrder, setYarnOrder] = useState<YarnOrder | null>(null);
  const [orderItems, setOrderItems] = useState<YarnOrderItem[]>([]);
  const [shipments, setShipments] = useState<YarnOrderShipment[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!yarnOrderId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [yarnOrderRes, accountsRes, personnelsRes, shipmentsRes] =
          await Promise.all([
            fetch(`/api/yarn-order/${yarnOrderId}`),
            fetch(`/api/account/properties/0/0/1/0`),
            fetch(`/api/personnel`),
            fetch(`/api/yarn-order-shipment/order/${yarnOrderId}`),
          ]);

        if (!yarnOrderRes.ok) throw new Error("Failed to fetch yarn order.");
        const yarnOrderData = await yarnOrderRes.json();
        setYarnOrder(yarnOrderData);
        setOrderItems(
          yarnOrderData.yarnOrderItem.map(
            (item: YarnOrderItem, index: number) => {
              return {
                ...item,
                no: index + 1,
              };
            }
          ) || []
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
          setYarnShipmentItems(
            shipmentsData.flatMap((shipment: YarnOrderShipment) =>
              shipment.yarnOrderShipmentItem.map(
                (item: YarnOrderShipmentItem) => ({
                  ...item,
                })
              )
            )
          );
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
  }, [yarnOrderId, refresh]);

  const handleAddRow = (shipmentIndex: number) => {};
  const handleSaveRow = (row: YarnOrderShipmentItem) => {};
  const handleDeleteRow = (no: number) => {};
  const [itemToShip, setItemToShip] = useState<YarnOrderShipmentItem | null>(
    null
  );
  const [shipFormOpen, setShipFormOpen] = useState(false);
  const [formData, setFormData] = useState<{
    sentKg: number;
    sentCount: number;
    personnelId: number;
    yarnOrderItemId: number | null;
    yarnOrderShipmentId: number | null;
  }>({
    sentKg: 0,
    sentCount: 0,
    personnelId: 0,
    yarnOrderItemId: null,
    yarnOrderShipmentId: null,
  });
  const handleShip = (row: YarnOrderShipmentItem) => {
    setItemToShip(row);
    setFormData({
      sentKg: 0,
      sentCount: 0,
      personnelId: 1,
      yarnOrderItemId: Number(row.id),
      yarnOrderShipmentId: null,
    });
    setShipFormOpen(true);
  };
  const handleSubmit = async (data: typeof formData) => {
    // find if there is an ongoing shipment with closed as false
    const shipment = shipments.find((shipment) => !shipment.closed);
    if (shipment) {
      const res = await fetch(`/api/yarn-order-shipment-Item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          yarnOrderShipmentId: shipment.id,
        }),
      });
    } else {
      // create a new shipment then create a shipment item
      const res = await fetch(`/api/yarn-order-shipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yarnOrderId: yarnOrderId,
          personnelId: 1,
        }),
      });
      if (res.ok) {
        const shipmentData = await res.json();
        const res2 = await fetch(`/api/yarn-order-shipment-Item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            yarnOrderShipmentId: shipmentData.id,
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
      field: "yarnType",
      headerName: "İplik Türü",
      width: 150,
      valueGetter: (value, row) =>
        orderItems.find((item) => item.id === row.id)?.yarnType.name,
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
    },
    {
      field: "kg",
      headerName: "Kg",
      width: 100,
    },
    {
      field: "orderedKg",
      headerName: "Sevk Emri Verilen Kg",
      width: 150,
      valueGetter: (value, row) => {
        const shipmentItems = yarnShipmentItems.filter(
          (item) => item.yarnOrderItemId === row.id
        );
        const totalSentKg = shipmentItems.reduce(
          (acc, item) => acc + item.sentKg,
          0
        );
        return totalSentKg;
      },
    },
    {
      field: "sentKg",
      headerName: "Sevk Edilen Kg",
      width: 150,
      valueGetter: (value, row) => {
        const shipmentItem = shipments
          .flatMap((shipment) => shipment.yarnOrderShipmentSent)
          .find((item) => item?.yarnOrderItemId === row.id);
        return shipmentItem?.sentKg;
      },
    },
    {
      field: "remainingKg",
      headerName: "Kalan Kg",
      width: 150,
      valueGetter: (value, row) => {
        const shipmentItems = yarnShipmentItems.filter(
          (item) => item.yarnOrderItemId === row.id
        );
        const totalSentKg = shipmentItems.reduce(
          (acc, item) => acc + item.sentKg,
          0
        );
        return row.kg - totalSentKg;
      },
    },
    {
      field: "orderedCount",
      headerName: "Sevk Emri Verilen Bobin",
      width: 150,
      valueGetter: (value, row) => {
        const shipmentItems = yarnShipmentItems.filter(
          (item) => item.yarnOrderItemId === row.id
        );
        const totalSentCount = shipmentItems.reduce(
          (acc, item) => acc + item.sentCount,
          0
        );
        return totalSentCount;
      },
    },
    {
      field: "sentCount",
      headerName: "Sevk Edilen Bobin",
      valueGetter: (value, row) => {
        const shipmentItem = shipments
          .flatMap((shipment) => shipment.yarnOrderShipmentSent)
          .find((item) => item?.yarnOrderItemId === row.id);
        return shipmentItem?.sentCount;
      },
      width: 150,
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
            onClick={() => handleShip(params.row as YarnOrderShipmentItem)}
          />
        </>
      ),
    },
  ];

  const actionShipment = async (shipment: YarnOrderShipment) => {
    if (shipment.closed) {
      const res = await fetch(`/api/yarn-order-shipment/${shipment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          closed: false,
        }),
      });
    } else {
      const res = await fetch(`/api/yarn-order-shipment/${shipment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          closed: true,
        }),
      });
    }
    setRefresh(!refresh);
  };

  const shipmentColumns: GridColDef[] = [
    {
      field: "no",
      headerName: "#",
      width: 70,
      type: "number",
      valueGetter: (value, row) =>
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
      valueGetter: (value, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCompany
          ?.name || null,
    },
    {
      field: "shippingCarrier",
      headerName: "Nakliyeci",
      width: 150,
      valueGetter: (value, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCarrier
          ?.name || null,
    },
    {
      field: "shippingCar",
      headerName: "Araç",
      width: 150,
      valueGetter: (value, row) =>
        shipments.find((shipment) => shipment.id === row.id)?.shippingCar
          ?.plate || null,
    },
    {
      field: "sentDate",
      headerName: "Sevk Tarihi",
      width: 150,
      valueFormatter: (value, row) => {
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
      valueGetter: (value, row) =>
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
                (shipment) =>
                  shipment.id === (params.row as YarnOrderShipment).id
              )?.closed ? (
                <LocalShipping />
              ) : (
                <Close />
              )
            }
            variant="contained"
            color={
              shipments.find(
                (shipment) =>
                  shipment.id === (params.row as YarnOrderShipment).id
              )?.closed
                ? "secondary"
                : "error"
            }
            onClick={() => actionShipment(params.row as YarnOrderShipment)}
          >
            {shipments.find(
              (shipment) => shipment.id === (params.row as YarnOrderShipment).id
            )?.closed
              ? "Aç"
              : "Kapat"}
          </Button>
          <GridActionsCellItem
            icon={<Edit />}
            label="Düzenle"
            // on click go to edit page /yarn-order-shipment/form/?id=shipment.id
            onClick={() => {
              router.push(`/yarn-order-shipment/form/?id=${params.row.id}`);
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
          {yarnOrder && (
            <Box sx={boxStyle}>
              <Typography variant="h4" gutterBottom>
                İplik Satış Detayları
              </Typography>
              {[
                { label: "ID", value: yarnOrder.id },
                { label: "Hesap", value: yarnOrder.account.name },
                { label: "Açıklama", value: yarnOrder.description },
                { label: "Satış", value: yarnOrder.sale ? "Evet" : "Hayır" },
                {
                  label: "Personel",
                  value:
                    yarnOrder.personnel?.firstName +
                    " " +
                    yarnOrder.personnel?.lastName,
                },
                { label: "Durum", value: yarnOrder.closed ? "Kapalı" : "Açık" },
                {
                  label: "Oluşturulma Tarihi",
                  value: new Intl.DateTimeFormat("tr-TR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(yarnOrder.createdAt)),
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
                    {itemToShip.no}. İplik Türü:{" "}
                    {
                      orderItems.find((item) => item.id === itemToShip.id)
                        ?.yarnType.name
                    }
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Sevk Edilecek Kg:</strong>{" "}
                        {yarnShipmentItems
                          .filter(
                            (item) => item.yarnOrderItemId === itemToShip.id
                          )
                          .reduce((acc, item) => acc + item.sentKg, 0)}{" "}
                        Kg
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Sevk Edilecek Bobin Adet:</strong>{" "}
                        {itemToShip.sentCount || 0} Bobin
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
                        <strong>Bobin miktar:</strong>{" "}
                        <TextField
                          type="number"
                          size="small"
                          value={formData.sentCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sentCount: +e.target.value,
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
            Bu sipariş fişe ait iplikler
          </Typography>
          <DataGrid
            rows={orderItems}
            columns={columns}
            rowCount={orderItems.length}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          />
          <Typography variant="h4" gutterBottom>
            Bu sipariş fişe ait sevkiyatlar
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

export default YarnSaleView;
