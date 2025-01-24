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
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import { trTR } from "@/components/trTrGrid";
import { getPersonnelInfo, usePersonnelId } from "@/contexts/auth";
import { sub } from "date-fns";
import { CustomAutocomplete } from "@/components/table/utils";

const initialRows: GridRowsProp = [
  {
    id: 0, // Use a unique value instead of null
    purchaseOrderItemId: null,
    quantity: null,
    personnelId: getPersonnelInfo().id,
    description: "",
    isNew: true,
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
  setSubRows: React.Dispatch<React.SetStateAction<any[]>>;
  purchaseOrderId?: number;
}

export default function Sheet(props: SheetProps) {
  const { refresh, subRows, setSubRows, purchaseOrderId } = props;
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [materials, setMaterials] = React.useState<any[]>([]);
  const [orderItems, setOrderItems] = React.useState<any[]>([]);
  const [personnel, setPersonnel] = React.useState<any[]>([]);
  const [packagingTypes, setPackagingTypes] = React.useState<any[]>([]);

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

  React.useEffect(() => {
    if (subRows.length > 0) {
      setRows(subRows);
    }
  }, [refresh]);

  React.useEffect(() => {
    setSubRows([...rows]);
    console.log(rows);
  }, [rows]);

  React.useEffect(() => {
    fetch("/api/material/order/" + purchaseOrderId)
      .then((response) => response.json())
      .then((data) => {
        setOrderItems(
          data.flatMap((value: any) =>
            value.purchaseOrderItem.map((item: any) => ({
              id: item.id,
              value: item.quantity,
            }))
          )
        );
        setMaterials(
          data.flatMap((value: any) =>
            value.purchaseOrderItem.map((item: any) => ({
              value: item.id,
              label: `${item.id} - ${value.name}`,
            }))
          )
        );
      });
    fetch("/api/personnel")
      .then((response) => response.json())
      .then((data) =>
        setPersonnel(
          data.map((value: any) => ({
            value: value.id,
            label: `${value.firstName} ${value.lastName}`,
          }))
        )
      );
  }, [purchaseOrderId]);

  const columns: GridColDef[] = [
    {
      field: "purchaseOrderItemId",
      headerName: "Malzeme",
      width: 200,

      type: "singleSelect",
      valueOptions: materials,
      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomAutocomplete
          values={materials}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "purchaseOrderItemId",
              value: newValue,
            });
            params.api.setEditCellValue({
              id: params.id,
              field: "quantity",
              value: Number(
                orderItems.find((item) => item.id === newValue)?.value
              ),
            });
          }}
          label="Malzeme"
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Miktar",
      width: 110,
      type: "number",
    },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
    },
    {
      field: "personnelId",
      headerName: "Personel",
      width: 200,
      type: "singleSelect",
      valueOptions: personnel,
      valueSetter: (params) => {
        params.api.setEditCellValue({
          id: params.id,
          field: "personnelId",
          value: getPersonnelInfo().id,
        });
        return true;
      },
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
          columns={columns}
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      {alert ? <Alert severity="error">En az 1 satır olmalıdır.</Alert> : null}
    </>
  );
}
