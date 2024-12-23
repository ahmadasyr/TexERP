"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridActionsCellItem,
  GridRowModes,
  GridCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { Box, Typography, Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { trTR } from "@/components/trTrGrid";
import { Cancel, CancelOutlined, EditOff } from "@mui/icons-material";
import { usePersonnelId } from "@/contexts/auth";
const boxStyle = {
  mb: 3,
  p: 2,
  border: 1,
  borderColor: "grey.300",
  borderRadius: 2,
  height: "100%",
};
// Define types for yarnType and yarnStockEntry
interface YarnType {
  id: number;
  name: string;
  count: number;
  unit: string;
  color: string;
  colorCode: string;
  personnel?: {
    firstName: string;
    lastName: string;
  };
  price: number;
  currency?: {
    name: string;
  };
  yarnOrderItem: [
    {
      kg: number;
      price: number;
      yarnOrder: {
        sale: boolean;
      };
    }
  ];
}

interface YarnStockEntry {
  no: number;
  id: number | null;
  netKg: number;
  count: number;
  yarnTypeId: number;
  personnelId: number;
  createdAt: string;
  yarnOrderId: number | null;
  accountId: number | null;
  lot: string;
  waybillNo: string;
}

interface Account {
  id: number;
  name: string;
}

interface YarnOrder {
  id: number;
  accountId: number;
  sale: boolean;
  description: string;
  account: {
    name: string;
  };
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

const YarnTypeView = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [yarnType, setYarnType] = useState<YarnType | null>(null);
  const [yarnStockEntries, setYarnStockEntries] = useState<YarnStockEntry[]>(
    []
  );
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [yarnOrders, setYarnOrders] = useState<YarnOrder[]>([]);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [
          yarnTypeResponse,
          accountsResponse,
          yarnOrdersResponse,
          personnelResponse,
        ] = await Promise.all([
          fetch(`/api/yarn-type/${id}`),
          fetch(`/api/account/properties/0/0/1/0`),
          fetch(`/api/yarn-order/ongoing`),
          fetch(`/api/personnel`),
        ]);

        if (!yarnTypeResponse.ok) {
          throw new Error("Failed to fetch yarn type data.");
        }

        const yarnTypeData = await yarnTypeResponse.json();
        setYarnType(yarnTypeData);
        setYarnStockEntries(
          yarnTypeData.yarnStock.map((entry: YarnStockEntry, index: number) => {
            return { ...entry, no: index + 1 };
          })
        );

        console.log(yarnStockEntries);

        if (accountsResponse.ok) {
          const accountRes = await accountsResponse.json();
          setAccounts(
            await accountRes.map((acc: Account) => {
              return { value: acc.id, label: acc.name };
            })
          );
        } else {
          console.warn("Failed to fetch accounts.");
        }

        if (yarnOrdersResponse.ok) {
          const yarnRes = await yarnOrdersResponse.json();
          setYarnOrders(yarnRes.filter((order: YarnOrder) => !order.sale));
        } else {
          console.warn("Failed to fetch yarn orders.");
        }

        if (personnelResponse.ok) {
          const personnelRes = await personnelResponse.json();
          setPersonnels(
            personnelRes.map((personnel: Personnel) => {
              return {
                value: personnel.id,
                label: `${personnel.firstName} ${personnel.lastName}`,
              };
            })
          );
        } else {
          console.warn("Failed to fetch personnel.");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, refresh]);

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "no", headerName: "#", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "createdAt",
      headerName: "Tarih",
      width: 180,
      editable: false,
      valueFormatter: (params) => {
        return (
          new Date(params as string).toLocaleDateString("tr-TR") +
          " " +
          new Date(params as string).toLocaleTimeString("tr-TR")
        );
      },
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 150,
      editable: true,
    },
    {
      field: "personnelId",
      headerName: "Oluşturan Kişi",
      width: 150,
      editable: false,
      valueOptions: personnels,
      type: "singleSelect",
    },

    {
      field: "yarnOrderId",
      headerName: "Sipariş No",
      width: 200,
      editable: true,
      valueOptions: [
        { value: "", label: "Yok" },
        ...yarnOrders.map((order: YarnOrder) => ({
          value: order.id,
          label: `${order.id} - ${order.description}`,
        })),
      ],
      type: "singleSelect",
    },

    {
      field: "accountId",
      headerName: "Geldiği Yer",
      width: 150,
      editable: false,
      valueOptions: accounts,
      type: "singleSelect",
    },
    {
      field: "waybillNo",
      headerName: "İrsaliye No",
      width: 150,
      editable: true,
    },
    {
      field: "entryKg",
      headerName: "Giriş Kg",
      width: 150,
      editable: false,
      // make it look uneditable
    },
    {
      field: "netKg",
      headerName: "Net Kg (Mevcut)",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "entryCount",
      headerName: "Giriş Bobin Sayısı",
      width: 150,
      editable: false,
    },
    {
      field: "count",
      headerName: "Bobin Sayısı (Mevcut)",
      width: 150,
      editable: true,
      type: "number",
    },

    {
      field: "actions",
      headerName: "Aksiyonlar",
      width: 150,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          {rowModesModel[params.id]?.mode === GridRowModes.Edit ? (
            <>
              <GridActionsCellItem
                icon={<EditOff />}
                label="Cancel"
                showInMenu={false}
                onClick={() => {
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params.id]: { mode: GridRowModes.View },
                  }));
                }}
              />
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                showInMenu={false}
                onClick={() => {
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params.id]: {
                      mode: GridRowModes.View,
                    },
                  }));
                  console.log(params);
                }}
              />
            </>
          ) : (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                showInMenu={false}
                onClick={() => {
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params.id]: { mode: GridRowModes.Edit },
                  }));
                }}
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                showInMenu={false}
                onClick={() => {
                  handleDeleteRow(params.row.no);
                }}
              />
            </>
          )}
        </>
      ),
    },
  ];

  const handleProcessRowUpdate = async (
    newRow: YarnStockEntry,
    oldRow: YarnStockEntry
  ) => {
    try {
      // Prepare the payload
      const payload = {
        ...newRow,
        accountId: yarnOrders.find((acc) => acc.id === newRow.yarnOrderId)
          ?.accountId,
      };

      // Send API request
      const response = await fetch(`/api/yarn/${newRow.id || ""}`, {
        method: newRow.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null);
        throw new Error(
          `Failed to save row. ${errorDetails?.message || "Unknown error"}`
        );
      }

      const updatedRow = await response.json();

      // Update the state
      setYarnStockEntries((prev) =>
        prev.map((entry) =>
          entry.no === oldRow.no ? { ...entry, ...updatedRow } : entry
        )
      );

      return updatedRow; // Necessary to update the DataGrid UI
    } catch (error) {
      return oldRow; // Rollback to old values in case of error
    }
  };

  const handleAddRow = () => {
    if (!yarnType) return;
    setYarnStockEntries((prev) => [
      ...prev,
      {
        no: prev.length + 1,
        id: null,
        netKg: 0,
        count: 0,
        yarnTypeId: yarnType.id,
        personnelId: usePersonnelId(),
        createdAt: new Date().toISOString(),
        yarnOrderId: null,
        accountId: null,
        lot: "",
        waybillNo: "",
      },
    ]);
  };

  const handleSaveRow = async (row: YarnStockEntry) => {
    // const payload = {
    //   id: row.id,
    //   net_kg: row.netKg, // map camelCase to snake_case if needed
    //   count: row.count,
    //   yarn_order_id: row.yarnOrderId,
    //   lot: row.lot,
    //   waybill_no: row.waybillNo,
    //   // Include other required fields if needed
    // };

    // try {
    //   const response = await fetch(`/api/yarn/${row.id || ""}`, {
    //     method: row.id ? "PUT" : "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     const errorDetails = await response.json().catch(() => null);
    //     throw new Error(
    //       `Failed to save row. ${errorDetails?.message || "Unknown error"}`
    //     );
    //   }

    //   const updatedRow = await response.json();

    //   setYarnStockEntries((prev) =>
    //     prev.map((entry) =>
    //       entry.no === row.no ? { ...entry, ...updatedRow } : entry
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error saving row:", error);
    // }
    console.log(row);
  };

  const handleDeleteRow = async (rowId: number) => {
    const deleteId = yarnStockEntries.find((entry) => entry.no === rowId)?.id;
    const confirmed = confirm("Are you sure you want to delete this row?");
    if (!confirmed) return;
    if (deleteId) {
      try {
        const response = await fetch(`/api/yarn/${deleteId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorDetails = await response.json().catch(() => null);
          throw new Error(
            `Failed to delete row. ${
              errorDetails?.message || "Unknown error occurred"
            }`
          );
        }

        if (yarnStockEntries.length === 1) {
          setYarnStockEntries([]);
          return;
        }
        setYarnStockEntries((prev) => prev.filter((r) => r.no !== rowId));
      } catch (err) {}
    } else {
      if (yarnStockEntries.length === 1) {
        setYarnStockEntries([]);
        return;
      }
      setYarnStockEntries((prev) => prev.filter((r) => r.no !== rowId));
    }
  };

  // data
  const totalKg = yarnStockEntries.reduce(
    (total, entry) => total + entry.netKg,
    0
  );
  const totalCount = yarnStockEntries.reduce(
    (total, entry) => total + entry.count,
    0
  );

  const orders = yarnType?.yarnOrderItem.filter((item) => !item.yarnOrder.sale);
  const totalOrderKg = orders?.reduce((total, item) => total + item.kg, 0);
  const totalOrderPrice = orders?.reduce(
    (total, item) => total + item.price,
    0
  );

  const sales = yarnType?.yarnOrderItem.filter((item) => item.yarnOrder.sale);
  const totalSaleKg = sales?.reduce((total, item) => total + item.kg, 0);
  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {yarnType && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={4} md={3}>
                  <Box sx={boxStyle}>
                    <Typography variant="h4" gutterBottom>
                      İplik Detayları
                    </Typography>
                    {[
                      { label: "ID", value: yarnType.id },
                      { label: "Adı", value: yarnType.name },
                      { label: "Ölçü", value: yarnType.count },
                      { label: "Birim", value: yarnType.unit },
                      {
                        label: "Renk",
                        value: `${yarnType.color} (${yarnType.colorCode})`,
                      },
                      {
                        label: "Oluşturan Kişi",
                        value: `${yarnType.personnel?.firstName} ${yarnType.personnel?.lastName}`,
                      },
                      { label: "Fiyat", value: yarnType.price },
                      { label: "Döviz", value: yarnType.currency?.name },
                    ].map(({ label, value }) => (
                      <Typography key={label} variant="body1">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box sx={boxStyle}>
                    <Typography variant="h6" gutterBottom>
                      İplik Stok Bilgileri
                    </Typography>
                    {[
                      {
                        label: "Toplam Girişler",
                        value: yarnStockEntries.length,
                      },
                      { label: "Toplam Kg", value: totalKg },
                      { label: "Toplam Count", value: totalCount },
                    ].map(({ label, value }) => (
                      <Typography key={label} variant="body1">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box sx={boxStyle}>
                    <Typography variant="h6" gutterBottom>
                      İplik Sipariş Bilgileri
                    </Typography>
                    {[
                      { label: "Sipariş Sayısı", value: orders?.length },
                      {
                        label: "Toplam Sipariş Edilen Kg",
                        value: totalOrderKg,
                      },
                      {
                        label: "Toplam Sipariş Edilen Fiyat",
                        value: totalOrderPrice,
                      },
                    ].map(({ label, value }) => (
                      <Typography key={label} variant="body1">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Box sx={boxStyle}>
                    <Typography variant="h6" gutterBottom>
                      İplik Satış Bilgileri
                    </Typography>
                    {[
                      { label: "Satış Sayısı", value: sales?.length },
                      { label: "Toplam Satış Kg", value: totalSaleKg },
                    ].map(({ label, value }) => (
                      <Typography key={label} variant="body1">
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </>
          )}

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" mt={2}>
              İplik stok girişleri
            </Typography>
          </Box>
          <Box style={{ height: 600, width: "100%" }}>
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Yeni Giriş Ekle
            </Button>
            {yarnStockEntries.length > 0 ? (
              <DataGrid
                rows={yarnStockEntries}
                columns={columns}
                rowModesModel={rowModesModel}
                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                getRowId={(row) => row.id || row.no}
                editMode="row"
                processRowUpdate={handleProcessRowUpdate}
              />
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                Kayıt bulunamadı.
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default YarnTypeView;
