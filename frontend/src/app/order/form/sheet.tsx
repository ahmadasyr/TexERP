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
  useGridApiContext,
} from "@mui/x-data-grid";
import {
  Alert,
  Autocomplete,
  AutocompleteValue,
  FormControl,
  TextField,
  UseAutocompleteProps,
} from "@mui/material";
import { trTR } from "@/components/trTrGrid";
import { getPersonnelInfo, usePersonnelId } from "@/contexts/auth";
import { CustomAutocomplete } from "@/components/table/utils";

const initialRows: GridRowsProp = [
  {
    id: 0,
    orderId: 0,
    productId: 0,
    dyeColorId: null,
    lot: "",
    outsourceTypeId: null,
    laminationColorId: null,
    quantity: 0,
    unit: "unit",
    description: "",
    personnelId: getPersonnelInfo().id,
    sentMeter: 0,
    sentKg: 0,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.random();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        orderId: 0,
        productId: 0,
        dyeColorId: null,
        lot: "",
        outsourceTypeId: null,
        laminationColorId: null,
        quantity: 0,
        unit: "unit",
        description: "",
        personnelId: getPersonnelInfo().id,
        sentMeter: 0,
        sentKg: 0,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
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
  subRows: any[];
  setSubRows: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Sheet(props: SheetProps) {
  const { refresh, subRows, setSubRows } = props;
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [products, setProducts] = React.useState<any[]>([]);
  const [dyeColors, setDyeColors] = React.useState<any[]>([]);
  const [itemTypes, setItemTypes] = React.useState<any[]>([]);
  const [laminationColors, setLaminationColors] = React.useState<any[]>([]);
  const [personnels, setPersonnels] = React.useState<any[]>([]);
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
    console.log(rows);
    setSubRows([...rows]);
  }, [rows]);
  React.useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        );
      });
    fetch("/api/dye-color")
      .then((response) => response.json())
      .then((data) => {
        setDyeColors(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        );
      });
    fetch("/api/item-type")
      .then((response) => response.json())
      .then((data) => {
        setItemTypes(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        );
      });
    fetch("/api/lamination-color")
      .then((response) => response.json())
      .then((data) => {
        setLaminationColors(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        );
      });
    fetch("/api/personnel")
      .then((response) => response.json())
      .then((data) => {
        setPersonnels(
          data.map((value: any) => ({
            value: value.id,
            label: `${value.firstName} ${value.lastName}`,
          }))
        );
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Ürün",
      width: 250,
      minWidth: 250,
      editable: true,
      type: "singleSelect",
      valueOptions: products,
      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomAutocomplete
          values={products}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "productId",
              value: newValue,
            });
          }}
          label="Ürün"
        />
      ),
    },
    {
      field: "dyeColorId",
      headerName: "Boya Rengi",
      type: "singleSelect",
      valueOptions: dyeColors,
      editable: true,
      width: 150,

      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomAutocomplete
          values={dyeColors}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "dyeColorId",
              value: newValue,
            });
          }}
          label="Boya Rengi"
        />
      ),
    },
    {
      field: "lot",
      headerName: "Lot",
      type: "string",
      editable: true,
      width: 150,
    },
    {
      field: "itemTypeId",
      headerName: "Kumaş Türü",
      type: "singleSelect",
      valueOptions: itemTypes,
      editable: true,
      width: 150,
    },
    {
      field: "laminationColorId",
      headerName: "Lamine Rengi",
      type: "singleSelect",
      valueOptions: laminationColors,
      editable: true,
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Miktar",
      type: "number",
      editable: true,
      width: 150,
    },
    {
      field: "unit",
      headerName: "Birim",
      type: "singleSelect",
      editable: true,
      width: 150,
      valueOptions: [
        { value: "kg", label: "Kg" },
        { value: "m", label: "Metre" },
      ],
    },
    {
      field: "description",
      headerName: "Açıklama",
      type: "string",
      editable: true,
      width: 150,
    },
    {
      field: "sentMeter",
      headerName: "Giden Metre",
      type: "number",

      width: 150,
    },
    {
      field: "sentKg",
      headerName: "Giden Kg",
      type: "number",
      width: 150,
    },
    {
      field: "personnelId",
      headerName: "Personel",
      type: "singleSelect",
      width: 150,
      valueOptions: personnels,
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
              sx={{
                color: "primary.main",
              }}
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
