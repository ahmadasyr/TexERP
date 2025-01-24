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
    materialId: null,
    quantity: undefined,
    personnelId: getPersonnelInfo().id,
    unit: "",
    pricePerUnit: undefined,
    currencyId: undefined,
    vat: 0,
    packagingTypeId: null,
    specification: "",
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
}

export default function Sheet(props: SheetProps) {
  const { refresh, subRows, setSubRows } = props;
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [materials, setMaterials] = React.useState<any[]>([]);
  const [currencies, setCurrencies] = React.useState<any[]>([]);
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
    fetch("/api/material")
      .then((response) => response.json())
      .then((data) =>
        setMaterials(
          data.map((value: any) => ({
            value: value.id,
            label: value.name,
            category: value.category,
          }))
        )
      );
    fetch("/api/currency")
      .then((response) => response.json())
      .then((data) =>
        setCurrencies(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        )
      );
    fetch("/api/packaging-type")
      .then((response) => response.json())
      .then((data) =>
        setPackagingTypes(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        )
      );
  }, []);

  const columns: GridColDef[] = [
    {
      field: "materialId",
      headerName: "Malzeme",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: materials,
      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomAutocomplete
          values={materials}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          groupBy="category"
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "materialId",
              value: newValue,
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
      editable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Birim",
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "KG", value: "KG" },
        { label: "Metre", value: "metre" },
        { label: "Adet", value: "adet" },
        { label: "Litre", value: "litre" },
        { label: "Paket", value: "paket" },
        { label: "Kutu", value: "kutu" },
        { label: "Ton", value: "ton" },
        { label: "Koli", value: "koli" },
      ],
    },
    {
      field: "pricePerUnit",
      headerName: "Birim Fiyatı",
      width: 110,
      editable: true,
      type: "number",
    },
    {
      field: "vat",
      headerName: "KDV",
      width: 110,
      editable: true,
      type: "number",
      valueFormatter: (params, row) => `${row.vat as number}%`,
    },
    {
      field: "totalPrice",
      headerName: "Toplam Fiyat",
      width: 110,
      editable: false,
      type: "number",
      valueFormatter: (params, row) =>
        (row.quantity * row.pricePerUnit * (1 + row.vat / 100)).toFixed(2),
    },
    {
      field: "currencyId",
      headerName: "Para Birimi",
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: currencies,
    },

    {
      field: "packagingTypeId",
      headerName: "Ambalaj Tipi",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: packagingTypes,
    },
    {
      field: "specification",
      headerName: "Spesifikasyon",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Açıklama",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Düzenle",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={
              rows.length > 1 ? handleDeleteClick(id) : () => setAlert(true)
            }
            color="inherit"
          />,
        ];
      },
    },
  ];

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const newId =
        rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 0;
      setRows((oldRows) => [
        ...oldRows,
        {
          id: newId,
          purchaseOrderId: 0,
          materialId: 0,
          quantity: 0,
          personnelId: getPersonnelInfo().id,
          unit: "",
          pricePerUnit: 0,
          currencyId: 0,
          vat: 0,
          packagingTypeId: null,
          specification: "",
          description: "",
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: "material" },
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
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
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
      {alert ? <Alert severity="error">En az 1 satır olmalıdır.</Alert> : null}
    </>
  );
}
