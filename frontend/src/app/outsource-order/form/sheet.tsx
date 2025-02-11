"use client";
import * as React from "react";
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
import {
  ClickAwayListener,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { trTR } from "@/components/trTrGrid";
import { getPersonnelInfo } from "@/contexts/auth";
import { CustomAutocomplete } from "@/components/table/utils";

const initialRows: GridRowsProp = [];

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
  formData?: any;
}

export default function Sheet(props: SheetProps) {
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = Math.random();
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          groups: "",
          lot: "",
          yon: null,
          dyeColorId: "",
          dyeTypeId: "",
          quantity: 0,
          unit: "kg",
          note: "",
          personnelId: getPersonnelInfo().id,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
      }));
    };

    return (
      <GridToolbarContainer sx={{ padding: 0 }}>
        <Button
          variant="text"
          color="primary"
          sx={{ textTransform: "none", boxShadow: 0, padding: 1 }}
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Yeni satır ekle
        </Button>
      </GridToolbarContainer>
    );
  }
  const { refresh, subRows, setSubRows, formData } = props;
  const [rows, setRows] = React.useState(subRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [products, setProducts] = React.useState<any[]>([]);
  const [dyeColors, setDyeColors] = React.useState<any[]>([]);
  const [laminationColors, setLaminationColors] = React.useState<any[]>([]);
  const [personnels, setPersonnels] = React.useState<any[]>([]);
  const [outsourceTypes, setOutsourceTypes] = React.useState<any[]>([]);
  const [dyeTypes, setDyeTypes] = React.useState<any[]>([]);
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

  React.useEffect(() => {
    if (subRows.length > 0) {
      setRows(subRows);
    }
  }, [refresh]);
  const [groupedProducts, setGroupedProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSubRows([...rows]);
  }, [rows]);
  React.useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.map((value: any) => ({
            value: value.id,
            label: value.name,
          }))
        );
      });
    fetch("/api/dye-color")
      .then((response) => response.json())
      .then((data) => {
        setDyeColors(
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
    fetch("/api/outsource-type")
      .then((response) => response.json())
      .then((data) => {
        setOutsourceTypes(
          data.map((value: any) => ({
            value: value.id,
            label: value.name,
            group: value?.outsourceGroup?.name || "",
            parent: value?.parentOutsourceType?.name || "",
          }))
        );
      });
    fetch("/api/dye-type")
      .then((response) => response.json())
      .then((data) => {
        setDyeTypes(
          data.map((value: any) => ({ value: value.id, label: value.name }))
        );
      });
  }, []);
  React.useEffect(() => {
    if (!formData.id) {
      setRows([]);
    }
    if (formData?.productId && formData?.stockStatus) {
      fetch(`/api/stock/grouped/${formData.productId}/${formData.stockStatus}`)
        .then((response) => response.json())
        .then((data) => {
          setGroupedProducts(data);
        });
    }
  }, [formData.productId, formData.stockStatus]);
  const GroupsEditCell = (params: GridRenderEditCellParams) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSelect = (group: any) => {
      setRows(
        rows.map((row) => {
          if (row.id === params.id) {
            return {
              ...row,
              lot: group.lot,
              yon: group.yon,
            };
          }
          return row;
        })
      );
      handleClose();
    };

    return (
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Button
            sx={{
              width: "100%",
            }}
            onClick={handleClick}
            fullWidth
            size="large"
            variant="contained"
          >
            Lot ve Yön Seç
          </Button>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-start"
            modifiers={[
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                  padding: 10,
                },
              },
            ]}
            sx={{
              zIndex: 1300,
              width: 600,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            <Paper sx={{ maxHeight: 250, overflowY: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Lot</TableCell>
                    <TableCell>Yon</TableCell>
                    <TableCell>Metre</TableCell>
                    <TableCell>Kg</TableCell>
                    <TableCell>Top Sayısı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedProducts.length > 0 ? (
                    groupedProducts.map((group, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleSelect(group)}
                        hover
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <TableCell>{group.lot}</TableCell>
                        <TableCell>
                          {group.yon ? "B" : group.yon === false ? "A" : "Yok"}
                        </TableCell>
                        <TableCell>{group.totalMeter.toFixed(2)}m</TableCell>
                        <TableCell>{group.totalKg.toFixed(2)}kg</TableCell>
                        <TableCell>{group.count}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                        colSpan={5}
                      >
                        Stokta Yok
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Ürün",
      type: "singleSelect",
      editable: true,
      width: 150,
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
        />
      ),
    },
    {
      field: "dyeColorId",
      headerName: "Boya Rengi",
      type: "singleSelect",
      valueOptions: dyeColors,
      editable: true,
      width: 200,

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
          // label="Boya Rengi"
        />
      ),
    },
    {
      field: "laminationColorId",
      headerName: "Lamine Rengi",
      type: "singleSelect",
      valueOptions: laminationColors,
      editable: true,
      width: 200,

      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomAutocomplete
          values={laminationColors}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "laminationColorId",
              value: newValue,
            });
          }}
          // label="Boya Rengi"
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Miktar",
      type: "number",
      editable: true,
      width: 120,
    },
    {
      field: "unit",
      headerName: "Birim",
      type: "singleSelect",
      valueOptions: [
        {
          value: "kg",
          label: "Kg",
        },
        {
          value: "m",
          label: "Metre",
        },
      ],
      editable: true,
    },
    {
      field: "note",
      headerName: "not",
      type: "string",
      editable: true,
      width: 120,
    },
    {
      field: "personnelId",
      headerName: "Personel",
      type: "singleSelect",
      width: 120,
      valueOptions: personnels,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Düzenle",
      width: 120,
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <>
      <DataGrid
        style={{
          width: "100%",
          height: 500,
        }}
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
    </>
  );
}
