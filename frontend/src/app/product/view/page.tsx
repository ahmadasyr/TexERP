"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridActionsCellItem,
  GridRowModes,
  GridRenderEditCellParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Tabs,
  Tab,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { trTR } from "@/components/trTrGrid";
import { Add, CancelOutlined, EditOff } from "@mui/icons-material";
import { getPersonnelInfo, usePersonnelId } from "@/contexts/auth";

// Define types
interface Currency {
  id: number;
  name: string;
}
interface Personnel {
  label: any;
  value: any;
  id: number;
  firstName: string;
  lastName: string;
}
interface ProductPrice {
  id: number;
  currency?: Currency | number;
  personnel?: Personnel | number;
  unit?: string;
  price?: number;
  date?: Date;
  no: number;
  productId?: number;
  currencyId?: number;
  personnelId?: number;
}
interface Product {
  id: number;
  name: string;
  fine: number;
  mayA: number;
  mayB: number;
  ham: number;
  maxGrA: number;
  maxGrB: number;
  minGrA: number;
  minGrB: number;
  productPrice: ProductPrice[];
}

export interface Customer {
  id: number;
  name: string;
}

interface CustomerPrice {
  id: number;
  customerId?: number;
  productId: number;
  currencyId: number;
  personnelId: number;
  price: number;
  upfront: number;
  installment: number;
  unit: string;
  date: Date;
  no: number; // Add the 'no' property
}

const boxStyle = {
  mb: 3,
  p: 2,
  border: 1,
  borderColor: "grey.300",
  borderRadius: 2,
  height: "100%",
};

const ProductView = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [productPrice, setProductPrice] = useState<ProductPrice[]>([]);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerPrices, setCustomerPrices] = useState<CustomerPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<
    { value: number; label: string }[]
  >([]);
  const [personnelId, setPersonnelId] = useState<number>(
    getPersonnelInfo()?.id
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [
          productResponse,
          personnelResponse,
          currencyResponse,
          customerResponse,
        ] = await Promise.all([
          fetch(`/api/product/${id}`),
          fetch(`/api/personnel`),
          fetch(`/api/currency`),
          fetch(`/api/customer`),
        ]);

        if (!productResponse.ok)
          throw new Error("Failed to fetch product data.");

        const productData = await productResponse.json();
        setProduct(productData);

        setProductPrice(
          productData.productPrice.map(
            (entry: ProductPrice, index: number) => ({
              ...entry,
              no: index + 1,
            })
          )
        );

        setCustomerPrices(
          productData.customerPrice.map(
            (entry: CustomerPrice, index: number) => ({
              ...entry,
              no: index + 1,
            })
          )
        );

        if (personnelResponse.ok) {
          const personnelRes = await personnelResponse.json();
          setPersonnels(
            personnelRes.map((personnel: Personnel) => ({
              value: personnel?.id,
              label: `${personnel.firstName} ${personnel.lastName}`,
            }))
          );
        }

        if (currencyResponse.ok) {
          const currencyRes = await currencyResponse.json();
          setCurrencies(
            currencyRes.map((currency: Currency) => ({
              value: currency?.id,
              label: currency.name,
            }))
          );
        }
        if (customerResponse.ok) {
          const customerRes = await customerResponse.json();
          setCustomers(
            customerRes.map((customer: Customer) => ({
              value: customer?.id,
              label: customer.name,
            }))
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setPersonnelId(getPersonnelInfo()?.id);
    console.log(getPersonnelInfo());
  }, [id, refresh]);

  const handleSaveClick = async (row: ProductPrice) => {
    const oldPrice = productPrice.find((p) => p.id === row.id)?.price || 0;

    setSelectedProductPrice(row);

    // Open the modal to ask user for customer selection
    setIsModalOpen(true);

    // Proceed with API update after the modal closes
    const payload = {
      ...row,
      currencyId:
        typeof row.currency === "object" ? row.currency?.id : row.currency,
      personnelId:
        typeof row.personnel === "object" ? row.personnel?.id : row.personnel,
      productId: row.productId,
    };
    try {
      const response = await fetch(`/api/product-price/${row.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setRefresh((prev) => !prev); // Refresh data
      }
    } catch (error) {
      throw new Error("Failed to save row.");
    }
  };

  const handleAddRow = (tab: number) => {
    const newRow =
      tab === 0
        ? {
            id: Math.random(),
            no: productPrice.length + 1,
            unit: "kg",
            price: 0,
            upfront: 0,
            installment: 0,
            currencyId: Number(currencies[0].value),
            personnelId: Number(personnelId),
            date: new Date(),
            productId: Number(id),
          }
        : {
            id: Math.random(),
            no: customerPrices.length + 1,
            unit: "kg",
            price: 0,
            upfront: 0,
            installment: 0,
            currencyId: Number(currencies[0].value),
            personnelId: Number(personnelId),
            date: new Date(),
            customerId: undefined,
            productId: Number(id),
          };
    // const post = async () => {
    if (tab === 0) {
      setProductPrice((prev) => [...prev, newRow]);
    } else {
      setCustomerPrices((prev) => [...prev, newRow]);
    }
  };
  const handleProcessRowUpdate = async (
    newRow: ProductPrice,
    oldRow: ProductPrice
  ) => {
    try {
      const URI =
        tab === 0 ? "product-price" : tab === 1 ? "customer-price" : "";
      // Prepare the payload
      const { id, ...payload } = {
        ...newRow,
        currencyId: Number(newRow.currencyId),
        personnelId: Number(newRow.personnelId),
        productId: newRow.productId,
      };
      let rowId = newRow?.id < 1 ? "" : newRow.id;

      // Send API request
      const response = await fetch(`/api/${URI}/${rowId || ""}`, {
        method: rowId ? "PUT" : "POST",
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
      setProductPrice((prev) =>
        prev.map((entry) =>
          entry.no === oldRow.no ? { ...entry, ...updatedRow } : entry
        )
      );
      setRefresh(!refresh);
      return updatedRow; // Necessary to update the DataGrid UI
    } catch (error) {
      return oldRow; // Rollback to old values in case of error
    }
  };
  const columns: GridColDef[] = [
    { field: "no", headerName: "#", width: 100 },
    {
      field: "id",
      headerName: "No",
      width: 100,
      valueFormatter: (params, row) => {
        return Number(row.id) < 1 ? "Taslak" : row.id;
      },
    },
    {
      field: "date",
      headerName: "Tarih",
      width: 200,
      editable: true,
      type: "date",
      valueFormatter: (params, row) => {
        return new Date(row.date).toLocaleString("tr-TR");
      },
    },
    {
      field: "unit",
      headerName: "Birim",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { value: "kg", label: "kg" },
        { value: "m", label: "Metre" },
      ],
    },
    {
      field: "upfront",
      headerName: "Peşin",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "price",
      headerName: "Fiyat",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "installment",
      headerName: "Vadeli",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "currencyId",
      headerName: "Para Birimi",
      width: 200,
      type: "singleSelect",
      editable: true,
      valueOptions: currencies,
    },
    {
      field: "personnelId",
      headerName: "Oluşturan kişi",
      width: 200,
      valueGetter: (params, row) => {
        const personnel = personnels.find(
          (personnel) => personnel?.value === row.personnelId
        );
        return personnel ? `${personnel?.label}` : "N/A";
      },
    },
    {
      field: "actions",
      headerName: "Aksiyonlar",
      width: 150,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          {rowModesModel[params?.id]?.mode === GridRowModes.Edit ? (
            <>
              <GridActionsCellItem
                icon={<CancelOutlined />}
                label="Cancel"
                onClick={() =>
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.View },
                  }))
                }
              />
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={() => {
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.View },
                  }));
                  handleSaveClick(params.row as ProductPrice);
                }}
              />
            </>
          ) : (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() =>
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.Edit },
                  }))
                }
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteRow(params.row?.id)}
              />
            </>
          )}
        </>
      ),
    },
  ];

  const customerColumns: GridColDef[] = [
    { field: "no", headerName: "#", width: 100 },
    {
      field: "id",
      headerName: "No",
      width: 100,
      valueFormatter: (params, row) => {
        return Number(row.id) < 1 ? "Taslak" : row.id;
      },
    },
    {
      field: "date",
      headerName: "Tarih",
      width: 200,
      editable: true,
      type: "date",
      valueFormatter: (params, row) => {
        return new Date(row.date).toLocaleString("tr-TR");
      },
    },
    {
      field: "customerId",
      headerName: "Müşteri",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: customers,
    },
    {
      field: "unit",
      headerName: "Birim",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { value: "kg", label: "kg" },
        { value: "m", label: "Metre" },
      ],
    },
    {
      field: "upfront",
      headerName: "Peşin",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "price",
      headerName: "Fiyat",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "installment",
      headerName: "Vadeli",
      width: 200,
      editable: true,
      type: "number",
    },
    {
      field: "currencyId",
      headerName: "Para Birimi",
      width: 200,
      type: "singleSelect",
      editable: true,
      valueOptions: currencies,
    },
    {
      field: "personnelId",
      headerName: "Oluşturan kişi",
      width: 200,
      valueGetter: (params, row) => {
        const personnel = personnels.find(
          (personnel) => personnel?.value === row.personnelId
        );
        return personnel ? `${personnel?.label}` : "N/A";
      },
    },
    {
      field: "actions",
      headerName: "Aksiyonlar",
      width: 150,
      renderCell: (params: GridRenderEditCellParams) => (
        <>
          {rowModesModel[params?.id]?.mode === GridRowModes.Edit ? (
            <>
              <GridActionsCellItem
                icon={<CancelOutlined />}
                label="Cancel"
                onClick={() =>
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.View },
                  }))
                }
              />
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={() => {
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.View },
                  }));
                }}
              />
            </>
          ) : (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() =>
                  setRowModesModel((prev) => ({
                    ...prev,
                    [params?.id]: { mode: GridRowModes.Edit },
                  }))
                }
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteRow(params.row?.id)}
              />
            </>
          )}
        </>
      ),
    },
  ];

  const handleDeleteRow = (rowId: number) => {
    const deleteRow = async () => {
      try {
        const URI =
          tab === 0 ? "product-price" : tab === 1 ? "customer-price" : "";
        const response = await fetch(`/api/${URI}/${rowId}`, {
          method: "DELETE",
        });
        setProductPrice((prev) => prev.filter((row) => row.id !== rowId));
        if (!response.ok) {
        }
      } catch (error) {}
    };
    deleteRow();
    setRefresh(!refresh);
  };

  const [tab, setTab] = useState(0);
  const tabProps = (index: number) => ({
    onClick: () => setTab(index),
    selected: tab === index,
  });
  interface CustomTabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
  }

  const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
    children,
    value,
    index,
  }) => {
    return value === index ? <>{children}</> : null;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductPrice, setSelectedProductPrice] =
    useState<ProductPrice | null>(null);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {product && (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={boxStyle}>
                  <Typography variant="h4">Ürün Detayları</Typography>
                  {[
                    { label: "ID", value: product?.id },
                    { label: "Name", value: product.name },
                    { label: "Fine", value: product.fine },
                    { label: "May A", value: product.mayA },
                    { label: "May B", value: product.mayB },
                    { label: "Ham", value: product.ham },
                    { label: "Max Gr A", value: product.maxGrA },
                    { label: "Max Gr B", value: product.maxGrB },
                    { label: "Min Gr A", value: product.minGrA },
                    { label: "Min Gr B", value: product.minGrB },
                  ].map((field) => (
                    <Typography key={field.label}>
                      <strong>{field.label}:</strong> {field.value}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={boxStyle}>
                  <Typography variant="h4">Fiyat bilgisi</Typography>
                  {[
                    {
                      label: "Fiyat",
                      value:
                        productPrice.length > 0
                          ? productPrice[productPrice.length - 1].price
                          : "N/A",
                    },
                  ].map((field) => (
                    <Typography key={field.label}>
                      <strong>{field.label}:</strong> {field.value}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
          <Box style={{ height: 600, width: "100%" }}>
            <Tabs sx={{ mb: 2 }} value={tab}>
              <Tab label="Fiyatlar" {...tabProps(0)} />
              <Tab label="Müşteri Fiyatları" {...tabProps(1)} />
            </Tabs>

            <DataGrid
              rows={tab === 0 ? productPrice : tab == 1 ? customerPrices : []}
              columns={tab === 0 ? columns : tab === 1 ? customerColumns : []}
              sortModel={[
                {
                  field: "date",
                  sort: "desc",
                },
              ]}
              getRowId={(row) => row.id}
              rowModesModel={rowModesModel}
              localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
              editMode="row"
              processRowUpdate={handleProcessRowUpdate}
              onRowEditStop={(params) => {
                setRowModesModel((prev) => ({
                  ...prev,
                  [params?.id]: { mode: GridRowModes.View },
                }));
              }}
              //   add row button
              slots={{
                toolbar: () => (
                  <GridToolbarContainer>
                    <Button
                      color="primary"
                      startIcon={<Add />}
                      onClick={() => handleAddRow(tab)}
                    >
                      Yeni satır ekle
                    </Button>
                  </GridToolbarContainer>
                ),
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductView;
