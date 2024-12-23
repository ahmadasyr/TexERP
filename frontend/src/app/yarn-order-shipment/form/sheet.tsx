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
    personnelId: usePersonnelId(),
    yarnOrderShipmentId: 0,
    yarnOrderItemId: 0,
    sentKg: 0,
    sentCount: 0,
  },
];

interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

function EditToolbar({ setRows, setRowModesModel }: EditToolbarProps) {
  const handleClick = React.useCallback(() => {
    const id = Math.random();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        personnelId: usePersonnelId(),
        yarnOrderShipmentId: 0,
        yarnOrderItemId: 0,
        sentKg: 0,
        sentCount: 0,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "personnelId" },
    }));
  }, [setRows, setRowModesModel]);

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
  setSubRows: any;
}

export default function Sheet({ refresh, subRows, setSubRows }: SheetProps) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [alert, setAlert] = React.useState(false);
  const [personnels, setPersonnels] = React.useState<
    { value: number; label: string }[]
  >([]);

  React.useEffect(() => {
    if (subRows.length > 0) {
      setRows(subRows);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/personnel");
        if (!response.ok) throw new Error("Failed to fetch personnel data");
        const data = await response.json();
        setPersonnels(
          data.map((personnel: any) => ({
            value: personnel.id,
            label: `${personnel.firstName} ${personnel.lastName}`,
          }))
        );
      } catch (error) {
        setAlert(true);
      }
    };

    fetchData();
  }, [refresh, subRows]);

  React.useEffect(() => {
    setSubRows(rows);
  }, [rows, setSubRows]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = React.useCallback(
    (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    },
    []
  );

  const columns: GridColDef[] = [
    {
      field: "personnelId",
      headerName: "Okutulan Kişi",
      type: "singleSelect",
      editable: true,
      width: 150,
      valueOptions: personnels,
    },
    {
      field: "sentKg",
      headerName: "Kg",
      type: "number",
      editable: true,
      width: 150,
    },
    {
      field: "sentCount",
      headerName: "Bobin Adet",
      type: "number",
      editable: true,
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Düzenle",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return isInEditMode
          ? [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={() =>
                  setRowModesModel({
                    ...rowModesModel,
                    [id]: { mode: GridRowModes.View },
                  })
                }
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={() =>
                  setRowModesModel({
                    ...rowModesModel,
                    [id]: {
                      mode: GridRowModes.View,
                      ignoreModifications: true,
                    },
                  })
                }
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() =>
                  setRowModesModel({
                    ...rowModesModel,
                    [id]: { mode: GridRowModes.Edit },
                  })
                }
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => setRows(rows.filter((row) => row.id !== id))}
              />,
            ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": { color: "text.secondary" },
        "& .textPrimary": { color: "text.primary" },
      }}
    >
      {rows.length > 0 ? (
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
            noRowsOverlay: () => (
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <Alert severity="info">No data available</Alert>
              </Box>
            ),
          }}
          slotProps={
            {
              toolbar: { setRows, setRowModesModel },
            } as any
          }
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        />
      ) : (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <Alert severity="info">No data available</Alert>
        </Box>
      )}
    </Box>
  );
}
