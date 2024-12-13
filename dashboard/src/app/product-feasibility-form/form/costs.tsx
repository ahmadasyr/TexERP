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
import { Add } from "@mui/icons-material";
import { Alert, Dialog } from "@mui/material";

const initialRows: GridRowsProp = [
  {
    id: Math.random(),
    name: "Birim Ürün Makine ve İşçilik Maliyeti",
    cost: "",
    evaluation: "",
    note: "",
  },
  {
    id: Math.random(),
    name: "Birim Malzeme Maliyeti",
    cost: "",
    evaluation: "",
    note: "",
  },
  {
    id: Math.random(),
    name: "Yardımcı Ekipmanların Maliyeti",
    cost: "",
    evaluation: "",
    note: "",
  },
  {
    id: Math.random(),
    name: "Test ve Ölçüm Maliyetleri",
    cost: "",
    evaluation: "",
    note: "",
  },
  {
    id: Math.random(),
    name: "ARGE Maliyetleri",
    cost: "",
    evaluation: "",
    note: "",
  },
  {
    id: Math.random(),
    name: "Diğer Maliyetler",
    cost: "",
    evaluation: "",
    note: "",
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
        name: "",
        cost: "",
        evaluation: "",
        note: "",
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Costs(props: SheetProps) {
  const { refresh, subRows, setSubRows, handleChange } = props;
  const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

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
    if (subRows.length !== 0) {
      setRows(subRows);
    }
  }, [refresh]);
  React.useEffect(() => {
    if (Array.isArray(rows)) {
      setSubRows([...rows]);
      handleChange({
        target: { name: "costs", value: rows },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [rows]);

  const Footer = () => {
    const totalCost = rows.reduce(
      (sum, row) => sum + (parseFloat(row.cost) || 0),
      0
    );

    return (
      <Box sx={{ padding: 2 }}>
        <strong>Toplam Maliyet: </strong> {totalCost.toFixed(2)}
      </Box>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Maliyet Kalemi",
      type: "string",
      editable: true,
      width: 300,
    },
    {
      field: "cost",
      headerName: "Maliyet",
      type: "number",
      editable: true,
      width: 200,
    },
    {
      field: "evaluation",
      headerName: "Uygunluk Değerlendirme",
      type: "string",
      editable: true,
      width: 200,
    },
    {
      field: "note",
      headerName: "Açıklama",
      type: "string",
      editable: true,
      width: 200,
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
          slotProps={
            {
              toolbar: { setRows, setRowModesModel },
            } as any
          }
          slots={{ footer: Footer }}
        />
      </Box>
      {alert ? <Alert severity="error">En az 1 satır olmalıdır.</Alert> : null}
    </>
  );
}
