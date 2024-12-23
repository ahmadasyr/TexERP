"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import { trTR } from "@/components/trTrGrid";
import { usePersonnelId } from "@/contexts/auth";

interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

function EditToolbar({ setRows, setRowModesModel }: EditToolbarProps) {
  const personnelId = usePersonnelId();

  const handleClick = () => {
    const id = Math.random();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        yarnTypeId: "",
        kg: 0,
        price: 0,
        currencyId: "",
        personnelId,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "price" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Yeni satır ekle
      </Button>
    </GridToolbarContainer>
  );
}

interface SheetProps {
  refresh: boolean;
  subRows: GridRowsProp;
  setSubRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  addNewPrice: (newPrice: any) => void;
}

export default function Sheet({
  refresh,
  subRows,
  setSubRows,
  addNewPrice,
}: SheetProps) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [yarnTypes, setYarnTypes] = React.useState<any[]>([]);
  const [currencies, setCurrencies] = React.useState<any[]>([]);
  const personnelId = usePersonnelId();
  const [editMode, setEditMode] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  React.useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`/api/currency`);
        if (!response.ok) throw new Error("Failed to fetch currencies");
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {}
    };
    fetchCurrencies();
  }, []);
  React.useEffect(() => {
    if (subRows.length > 0) {
      setRows(subRows);
    }
  }, [refresh, subRows]);

  React.useEffect(() => {
    setSubRows(rows);
  }, [rows, setSubRows]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    setEditMode(false);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setEditMode(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const row = rows.find((row) => row.id === id);
    if (row) addNewPrice(row);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const priceColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "price",
      headerName: "Fiyat",
      width: 200,
      editable: true,
    },
    {
      field: "currency",
      headerName: "Para Birimi",
      width: 200,
      type: "singleSelect",
      editable: true,
      valueOptions: currencies.map((currency) => ({
        value: currency.id,
        label: currency.name,
      })),
      valueGetter: (params, row) => row.currency?.name || "N/A",
    },
    {
      field: "personnel",
      headerName: "Personel",
      width: 200,
      valueGetter: (params, row) => row.personnel?.name || "N/A",
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          {editMode ? (
            <>
              <Button
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleSaveClick(params.row.id)}
              >
                Kaydet
              </Button>
              <Button color="secondary" startIcon={<DeleteIcon />}>
                İptal
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick(params.row.id)}
              >
                Düzenle
              </Button>
              <Button
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick(params.row.id)}
              >
                Sil
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={priceColumns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar as unknown as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel } as any,
          }}
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      {alert && <Alert severity="error">En az 1 satır olmalıdır.</Alert>}
    </>
  );
}
