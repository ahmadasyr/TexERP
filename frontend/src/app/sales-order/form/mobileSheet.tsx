"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, TextField, FormControl, Autocomplete } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

interface MobileSheetEditProps {
  rows: readonly any[];
  setRows: (rows: any[]) => void;
  products: any[];
  dyeColors: any[];
  itemTypes: any[];
  laminationColors: any[];
  outsourceTypes: any[];
}

export default function MobileSheetEdit({
  rows,
  setRows,
  products,
  dyeColors,
  itemTypes,
  laminationColors,
  outsourceTypes,
}: MobileSheetEditProps) {
  const [editingRowId, setEditingRowId] = React.useState(null);
  interface TempValues {
    productId?: number;
    dyeColorId?: number;
    itemType?: string;
    laminationColorId?: number;
    meter?: number;
    kg?: number;
    orderItemSpecification?: number[];
    description?: string;
  }

  const [tempValues, setTempValues] = React.useState<TempValues>({});

  const handleEditClick = (rowId: React.SetStateAction<null>) => {
    setEditingRowId(rowId);
    const row = rows.find((row) => row.id === rowId);
    setTempValues(row);
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setTempValues({});
  };

  const handleSaveClick = () => {
    setRows(
      rows.map((row) => (row.id === editingRowId ? { ...tempValues } : row))
    );
    setEditingRowId(null);
    setTempValues({});
  };

  const handleDeleteClick = (rowId: any) => {
    setRows(rows.filter((row) => row.id !== rowId));
  };

  const handleInputChange = (field: string, value: string | number | any[]) => {
    setTempValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {rows.map((row) => (
        <Box
          key={row.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          {editingRowId === row.id ? (
            <FormControl fullWidth sx={{ gap: 2 }}>
              <Autocomplete
                options={products}
                getOptionLabel={(option) => option.label}
                value={
                  products.find(
                    (product) => product.value === tempValues.productId
                  ) || null
                }
                onChange={(event, newValue) =>
                  handleInputChange("productId", newValue?.value || 0)
                }
                renderInput={(params) => <TextField {...params} label="Ürün" />}
              />
              <Autocomplete
                options={dyeColors}
                getOptionLabel={(option) => option.label}
                value={
                  dyeColors.find(
                    (color) => color.value === tempValues.dyeColorId
                  ) || null
                }
                onChange={(event, newValue) =>
                  handleInputChange("dyeColorId", newValue?.value || null)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Boya Rengi" />
                )}
              />
              <Autocomplete
                options={itemTypes}
                getOptionLabel={(option) => option.label}
                value={
                  itemTypes.find(
                    (type) => type.value === tempValues.itemType
                  ) || null
                }
                onChange={(event, newValue) =>
                  handleInputChange("itemType", newValue?.value || null)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Kumaş Türü" />
                )}
              />
              <Autocomplete
                options={laminationColors}
                getOptionLabel={(option) => option.label}
                value={
                  laminationColors.find(
                    (color) => color.value === tempValues.laminationColorId
                  ) || null
                }
                onChange={(event, newValue) =>
                  handleInputChange(
                    "laminationColorId",
                    newValue?.value || null
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="Lamine Rengi" />
                )}
              />
              <TextField
                label="Metre"
                type="number"
                value={tempValues.meter || 0}
                onChange={(e) =>
                  handleInputChange("meter", Number(e.target.value))
                }
              />
              <TextField
                label="Kg"
                type="number"
                value={tempValues.kg || 0}
                onChange={(e) =>
                  handleInputChange("kg", Number(e.target.value))
                }
              />
              <Autocomplete
                multiple
                options={outsourceTypes}
                getOptionLabel={(option) => option.label}
                value={
                  outsourceTypes.filter((type) =>
                    tempValues.orderItemSpecification?.includes(type.value)
                  ) || []
                }
                onChange={(event, newValue) =>
                  handleInputChange(
                    "orderItemSpecification",
                    newValue.map((v) => v.value)
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="Özellikler" />
                )}
              />
              <TextField
                label="Açıklama"
                value={tempValues.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveClick}
                >
                  Kaydet
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelClick}
                >
                  İptal
                </Button>
              </Box>
            </FormControl>
          ) : (
            <>
              <Typography variant="h6">
                Ürün:{" "}
                {products.find((product) => product.value === row.productId)
                  ?.label || ""}
              </Typography>
              <Typography>
                Boya Rengi:{" "}
                {dyeColors.find((color) => color.value === row.dyeColorId)
                  ?.label || ""}
              </Typography>
              <Typography>
                Kumaş Türü:{" "}
                {itemTypes.find((type) => type.value === row.itemType)?.label ||
                  ""}
              </Typography>
              <Typography>
                Lamine Rengi:{" "}
                {laminationColors.find(
                  (color) => color.value === row.laminationColorId
                )?.label || ""}
              </Typography>
              <Typography>Metre: {row.meter}</Typography>
              <Typography>Kg: {row.kg}</Typography>
              <Typography>
                Özellikler:{" "}
                {row.orderItemSpecification
                  ?.map(
                    (spec: any) =>
                      outsourceTypes.find((type) => type.value === spec)?.label
                  )
                  .join(", ") || ""}
              </Typography>
              <Typography>Açıklama: {row.description}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(row.id)}
                >
                  Düzenle
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(row.id)}
                >
                  Sil
                </Button>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
