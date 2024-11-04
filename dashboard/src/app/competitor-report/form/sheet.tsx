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
    id: 0,
    competitionReportSubjectId: "",
    exists: false,
    status: "",
    gap: "",
    strategy: "",
    action: "",
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
        competitionReportSubjectId: "",
        exists: false,
        status: "",
        gap: "",
        strategy: "",
        action: "",
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
}
export default function Sheet(props: SheetProps) {
  const { refresh, subRows, setSubRows } = props;
  const [rows, setRows] = React.useState(initialRows);
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
  const [values, setValues] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/competitor-report-subject`
      );
      const data = await response.json();
      setValues(
        data.map((value: any) => {
          return { value: value.id, label: value.name };
        })
      );
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    setRows(subRows);
  }, [refresh]);
  React.useEffect(() => {
    setSubRows([...rows]);
  }, [rows]);

  const columns: GridColDef[] = [
    {
      field: "competitionReportSubjectId",
      headerName: "Konu",
      type: "singleSelect",
      valueOptions: values,
      editable: true,
      width: 150,
    },
    {
      field: "exists",
      headerName: "Mevcut",
      type: "boolean",
      editable: true,
      width: 150,
    },
    {
      field: "status",
      headerName: "Rakiplerin Durumu",
      type: "string",
      editable: true,
      width: 150,
    },
    {
      field: "gap",
      headerName: "Gap",
      type: "string",
      editable: true,
      width: 150,
    },
    {
      field: "strategy",
      headerName: "Strateji",
      type: "string",
      editable: true,
      width: 150,
    },
    {
      field: "action",
      headerName: "Aksiyon",
      type: "string",
      editable: true,
      width: 150,
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
            toolbar: EditToolbar as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      {alert ? <Alert severity="error">En az 1 satır olmalıdır.</Alert> : null}
    </>
  );
}
