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
import { trTR } from "@/components/trTrGrid";
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
          setYarnOrders(yarnRes);
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
        console.error("Error fetching data:", error);
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
      width: 130,
      editable: true,
    },
    {
      field: "personnelId",
      headerName: "Oluşturan Kişi",
      width: 130,
      editable: false,
      valueOptions: personnels,
      type: "singleSelect",
    },

    {
      field: "yarnOrderId",
      headerName: "Sipariş No",
      width: 200,
      editable: true,
      valueOptions: yarnOrders.map((order: YarnOrder) => {
        return {
          value: order.id,
          label: order.id + " - " + order.description,
        };
      }),
      type: "singleSelect",
    },

    {
      field: "accountId",
      headerName: "Geldiği Yer",
      width: 130,
      editable: false,
      valueOptions: accounts,
      type: "singleSelect",
    },
    {
      field: "count",
      headerName: "Bobin Sayısı",
      width: 130,
      editable: true,
      type: "number",
    },
    {
      field: "netKg",
      headerName: "Net Kg",
      width: 130,
      editable: true,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Aksiyonlar",
      width: 130,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            showInMenu={false}
            onClick={() => {
              handleSaveRow(params.row);
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
      ),
    },
  ];

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
        personnelId: 1,
        createdAt: new Date().toISOString(),
        yarnOrderId: null,
        accountId: null,
        lot: "",
      },
    ]);
  };

  const handleSaveRow = async (row: YarnStockEntry) => {
    const { id, netKg, count, yarnOrderId, lot } = row;
    if (id) {
      try {
        const response = await fetch(`/api/yarn/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ netKg, count, yarnOrderId, lot }),
        });

        if (!response.ok) {
          const errorDetails = await response.json().catch(() => null);
          throw new Error(
            `Failed to update row. ${
              errorDetails?.message || "Unknown error occurred"
            }`
          );
        }

        const updatedRow = await response.json();

        setYarnStockEntries((prev) =>
          prev.map((r) => (r.id === updatedRow.id ? updatedRow : r))
        );
      } catch (err) {
        console.error("Error updating row:", err);
      }
    } else {
      const data = {
        netKg,
        count,
        yarnOrderId,
        accountId:
          yarnOrders.find((order) => order.id === yarnOrderId)?.accountId ||
          null,
        lot,
        personnelId: 1,
        yarnTypeId: yarnType?.id,
      };

      try {
        const response = await fetch(`/api/yarn/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Check for successful response
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => null);
          throw new Error(
            `Failed to update row. ${
              errorDetails?.message || "Unknown error occurred"
            }`
          );
        }

        const updatedRow = await response.json();

        // Update state with the modified row
        setYarnStockEntries((prev) =>
          prev.map((r) => (r.id === updatedRow.id ? updatedRow : r))
        );
      } catch (err) {
        console.error("Error updating row:", err);
      }
    }
    setRefresh(!refresh);
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
      } catch (err) {
        console.error("Error deleting row:", err);
      }
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
              {/* Yarn Details */}

              {/* Yarn Stock Information */}

              {/* Yarn Order Information */}

              {/* Yarn Sales Information */}
            </>
          )}

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" mt={2}>
              İplik stok girişleri
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Add Row
            </Button>
          </Box>
          <Box style={{ height: 600, width: "100%" }}>
            {yarnStockEntries.length > 0 ? (
              <DataGrid
                rows={yarnStockEntries}
                columns={columns}
                rowModesModel={rowModesModel}
                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                getRowId={(row) => row.no}
              />
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No entries available.
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default YarnTypeView;
