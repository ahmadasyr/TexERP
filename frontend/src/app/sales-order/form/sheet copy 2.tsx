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
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  UseAutocompleteProps,
} from "@mui/material";
import { trTR } from "@/components/trTrGrid";
import { getPersonnelInfo, usePersonnelId } from "@/contexts/auth";
import {
  CustomAutocomplete,
  CustomChipSelect,
  CustomChipSelectWithGroups,
} from "@/components/table/utils";
import { Delete } from "@mui/icons-material";
import { itemTypes } from "@/contexts/itemTypes";

interface orderItem {
  id: number;
  orderId: number;
  productId: number;
  dyeColorId?: number | null;
  laminationColorId?: number | null;
  itemType: string;
  description?: string | null;
  personnelId: number;
  meter: number;
  kg: number;
  orderItemSpecification: number[];
}
const initialRows: GridRowsProp = [];

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
        dyeColorId: 0,
        laminationColorId: 0,
        itemType: "",
        description: "",
        personnelId: getPersonnelInfo().id,
        meter: 0,
        kg: 0,
        orderItemSpecification: [],
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
  const [laminationColors, setLaminationColors] = React.useState<any[]>([]);
  const [personnels, setPersonnels] = React.useState<any[]>([]);
  const [outsourceTypes, setOutsourceTypes] = React.useState<any[]>([]);
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
  }, []);

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Ürün",
      width: 150,
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
      width: 120,

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
      field: "itemType",
      headerName: "Kumaş Türü",
      type: "singleSelect",
      valueOptions: itemTypes,
      editable: true,
      width: 120,
    },
    {
      field: "laminationColorId",
      headerName: "Lamine Rengi",
      type: "singleSelect",
      valueOptions: laminationColors,
      editable: true,
      width: 120,
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
          label="Lamine Rengi"
        />
      ),
    },
    {
      field: "meter",
      headerName: "Metre",
      type: "number",
      editable: true,
      width: 120,
    },
    {
      field: "kg",
      headerName: "Kg",
      type: "number",
      editable: true,
    },
    {
      field: "orderItemSpecification",
      headerName: "Özellikler",
      width: 250,
      minWidth: 250,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => (
        <CustomChipSelectWithGroups
          values={outsourceTypes}
          valueKey="value"
          displayValueKey="label"
          value={params.value}
          onChange={(newValue: any) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "orderItemSpecification",
              value: newValue,
            });
          }}
          label="Özellikler"
        />
      ),
      renderCell(params) {
        return params.value
          ? params.value
              .map(
                (value: any) =>
                  outsourceTypes.find((type) => type.value === value)?.label
              )
              .join(", ")
          : null;
      },
    },
    {
      field: "description",
      headerName: "Açıklama",
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

  const [isTop, setIsTop] = React.useState(true);
  const [topCount, setTopCount] = React.useState(0);
  const [isPerTop, setIsPerTop] = React.useState(false);
  const [topQuantity, setTopQuantity] = React.useState(50);
  const [tempValues, setTempValues] = React.useState<any>({});
  const [meter, setMeter] = React.useState(0);
  const [kg, setKg] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const handleOnChange = (
    newValue: any,
    updatedValues: any,
    nextFieldId: string
  ) => {
    setTempValues((prevValues: any) => ({
      ...prevValues,
      ...updatedValues,
    }));
    if (nextFieldId) {
      document.getElementById(nextFieldId)?.focus();
    }
  };
  const handleAddRow = () => {
    const id = Math.floor(Math.random() * 1200000) + 1;
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        orderId: 0,
        productId: tempValues.productId || 0,
        dyeColorId: tempValues.dyeColorId || null,
        laminationColorId: tempValues.laminationColorId || null,
        itemType: tempValues.itemType || null,
        description: tempValues.description || "",
        personnelId: getPersonnelInfo().id,
        meter: tempValues.meter || 0,
        kg: tempValues.kg || 0,
        orderItemSpecification: tempValues.orderItemSpecification || [],
      },
    ]);
    setTempValues({});
    setMeter(0);
    setKg(0);
    setDescription("");
    setTopCount(0);
    setIsPerTop(false);

    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input: any) => (input.value = ""));
  };

  const calculateMeter = () => {
    return topCount * topQuantity;
  };

  const handleTopCountChange = (value: string) => {
    const newTopCount = Number(value);
    setTopCount(newTopCount);
    if (isPerTop) {
      const newMeter = newTopCount * topQuantity;
      setMeter(newMeter);
      updateTempValues({ meter: newMeter });
    } else {
    }
  };

  const handleIsPerTopChange = (value: string) => {
    const newIsPerTop = value === "true";
    setIsPerTop(newIsPerTop);
    if (newIsPerTop) {
      const newMeter = topCount * topQuantity;
      setMeter(newMeter);
    } else {
      setMeter(0);
      updateTempValues({ description: "" });
    }
  };

  const updateTempValues = (updatedValues: any) => {
    setTempValues((prevValues: any) => ({ ...prevValues, ...updatedValues }));
  };

  return (
    <>
      {window.innerWidth > 600 ? (
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
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
              }}
              fullWidth
            >
              <Typography variant="h5" gutterBottom>
                Ürün Ekle
              </Typography>
              <Autocomplete
                id="productId"
                options={products}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) =>
                  updateTempValues(
                    newValue ? { productId: newValue.value } : {}
                  )
                }
                renderInput={(params) => <TextField {...params} label="Ürün" />}
              />
              <Autocomplete
                id="dyeColorId"
                options={dyeColors}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) =>
                  updateTempValues(
                    newValue ? { dyeColorId: newValue.value } : {}
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="Boya Rengi" />
                )}
              />
              <Autocomplete
                id="itemType"
                options={itemTypes}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) =>
                  updateTempValues(newValue ? { itemType: newValue.value } : {})
                }
                renderInput={(params) => (
                  <TextField {...params} label="Kumaş Türü" />
                )}
              />
              <Autocomplete
                id="laminationColorId"
                options={laminationColors}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) =>
                  updateTempValues(
                    newValue ? { laminationColorId: newValue.value } : {}
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="Lamine Rengi" />
                )}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isTop}
                    id="isTop"
                    onChange={() => setIsTop(!isTop)}
                  />
                }
                label="Top Sayı Var"
              />
              {(isTop && (
                <>
                  <TextField
                    id="topCount"
                    label="Top Adedi"
                    type="number"
                    onChange={(e) => handleTopCountChange(e.target.value)}
                  />
                  <TextField
                    id="meter"
                    label="Metre"
                    type="number"
                    disabled={isTop}
                    value={calculateMeter()}
                    onChange={(e) =>
                      updateTempValues({ meter: Number(e.target.value) })
                    }
                  />
                </>
              )) || (
                <TextField
                  id="meter"
                  label="Metre"
                  type="number"
                  onChange={(e) =>
                    updateTempValues({ meter: Number(e.target.value) })
                  }
                />
              )}

              <TextField
                id="kg"
                label="Kg"
                type="number"
                onChange={(e) =>
                  updateTempValues({ kg: Number(e.target.value) })
                }
              />
              <Autocomplete
                id="orderItemSpecification"
                multiple
                options={outsourceTypes}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) =>
                  updateTempValues({
                    orderItemSpecification: newValue.map((v) => v.value),
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Özellikler" />
                )}
              />
              <TextField
                id="description"
                label="Açıklama"
                onChange={(e) =>
                  updateTempValues({ description: e.target.value })
                }
              />
              <Button variant="contained" onClick={handleAddRow}>
                Ekle
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      )}
      {rows.length > 0 && window.innerWidth < 600 && (
        <Box sx={{ height: 500, width: "100%", mt: 2, position: "relative" }}>
          {rows.map((row) => (
            <Box
              key={row.id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: "100%",
              }}
            >
              <Typography variant="h6">
                Ürün:{" "}
                {
                  products.find((product) => product.value === row.productId)
                    ?.label
                }
              </Typography>
              <Typography variant="body1">
                Boya Rengi:{" "}
                {
                  dyeColors.find((color) => color.value === row.dyeColorId)
                    ?.label
                }
              </Typography>
              <Typography variant="body1">
                Kumaş Türü:{" "}
                {itemTypes.find((type) => type.value === row.itemType)?.label}
              </Typography>
              <Typography variant="body1">
                Lamine Rengi:{" "}
                {
                  laminationColors.find(
                    (color) => color.value === row.laminationColorId
                  )?.label
                }
              </Typography>
              <Typography variant="body1">Metre: {row.meter}</Typography>
              <Typography variant="body1">Kg: {row.kg}</Typography>
              <Typography variant="body1">
                Özellikler:{" "}
                <b>
                  {row.orderItemSpecification
                    .map(
                      (spec: any) =>
                        outsourceTypes.find((type) => type.value === spec)
                          ?.label
                    )
                    .join(", ")}
                </b>
              </Typography>
              <Typography variant="body1">
                Açıklama: {row.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick(row.id)}
                >
                  Sil
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
