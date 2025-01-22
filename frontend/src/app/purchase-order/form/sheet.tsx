"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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

const initialRows: GridRowsProp = [
  {
    id: 0,
    material: "",
    quantity: 0,
    unit: "",
    requestedDate: "",
    description: "",
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface SheetProps {
  refresh: boolean;
  subRows: any[];
}

export default function Sheet(props: SheetProps) {
  const { refresh, subRows } = props;
  const [rows, setRows] = React.useState(subRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [yarnTypes, setYarnTypes] = React.useState<any[]>([]);
  const [currencies, setCurrencies] = React.useState<any[]>([]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row?.id === newRow?.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [alert, setAlert] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "material", headerName: "Malzeme", width: 200 },
    {
      field: "quantity",
      headerName: "Miktar",
      width: 150,

      type: "number",
    },
    {
      field: "originalQuantity",
      headerName: "İstenen Miktar",
      width: 150,
      type: "number",
    },
    {
      field: "supervisorQuantity",
      headerName: "Bölüm Müdürü Miktarı",
      width: 150,
      type: "number",
    },
    {
      field: "purchasingQuantity",
      headerName: "Satın Alma Miktarı",
      width: 150,
      type: "number",
    },

    {
      field: "unit",
      headerName: "Birim",
      width: 150,

      type: "singleSelect",
      valueOptions: [
        {
          label: "KG",
          value: "KG",
        },
        {
          label: "Metre",
          value: "metre",
        },
        {
          label: "Adet",
          value: "adet",
        },
        {
          label: "Litre",
          value: "litre",
        },
        {
          label: "Paket",
          value: "paket",
        },
        {
          label: "Kutu",
          value: "kutu",
        },
        {
          label: "Ton",
          value: "ton",
        },
        {
          label: "Koli",
          value: "koli",
        },
      ],
    },
    {
      field: "requestedDate",
      headerName: "İhtiyaç Tarihi",
      width: 200,

      type: "date",
      valueGetter: (params) => {
        return params ? new Date(params) : null;
      },
    },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
    },
  ];
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      let index = rows.length;
      setRows((oldRows) => [
        ...oldRows,
        {
          index: oldRows.length,
          id: null,
          material: "",
          quantity: 0,
          unit: "",
          requestedDate: "",
          description: "",
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [index]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
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
          columns={columns}
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      {alert ? <Alert severity="error">En az 1 satır olmalıdır.</Alert> : null}
    </>
  );
}
