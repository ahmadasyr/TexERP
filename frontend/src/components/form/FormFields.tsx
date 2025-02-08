import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FormFieldProps {
  keyProp: string;
  formFields: any[];
  formData: { [key: string]: any };
  handleChange: (event: any) => void;
  togglePopup?: (table: string, column: string, on: boolean) => void;
  multiline?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
}

const gridSize = 12;

export const NewTextField = ({
  keyProp,
  formFields,
  formData,
  handleChange,
  multiline,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  return (
    <TextField
      fullWidth
      name={keyProp as string}
      multiline={multiline}
      rows={4}
      type="text"
      label={field?.label}
      disabled={field?.disabled}
      value={formData[keyProp] || ""}
      onChange={(e) =>
        handleChange({ target: { name: keyProp, value: e.target.value } })
      }
      required={field?.required}
      InputLabelProps={{ shrink: !!formData[keyProp] }}
    />
  );
};

export const NewCheckBox = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);

  return (
    <FormControl fullWidth>
      <FormControlLabel
        label={field?.label}
        control={
          <Checkbox
            checked={(formData[keyProp] as boolean) || false}
            onChange={(e) =>
              handleChange({
                target: { name: keyProp, value: e.target.checked },
              })
            }
            name={keyProp as string}
          />
        }
      />
    </FormControl>
  );
};

export const NewSelect = ({
  keyProp,
  formFields,
  formData,
  handleChange,
  disabled,
}: FormFieldProps) => {
  const field = formFields.find((field) => field.name === keyProp);
  if (!field || !field.options) {
    return "";
  }
  return (
    <FormControl fullWidth>
      <InputLabel
        id={`${keyProp}-label`}
        shrink={formData[keyProp] !== undefined && formData[keyProp] !== null}
      >
        {field.label}
      </InputLabel>
      <Select
        required={field?.required}
        labelId={`${keyProp}-label`}
        name={keyProp}
        value={formData[keyProp] ?? ""}
        onChange={(e) =>
          handleChange({
            target: { name: keyProp, value: e.target.value },
          } as React.ChangeEvent<{ name?: string; value: unknown }>)
        }
        // shrink label if value is not empty
        disabled={
          (field.dependant &&
            !formData[field.dependency as keyof typeof formData]) ||
          field.disabled ||
          disabled
        }
      >
        <MenuItem value={""}>
          <em>Yok</em>
        </MenuItem>
        {field.dependant && formData[field.dependency as keyof typeof formData]
          ? field.multiOptions
              .find(
                (option: any) =>
                  option.value ===
                  formData[field.dependency as keyof typeof formData]
              )
              ?.options.map((option: any) => (
                <MenuItem
                  key={option.value || option}
                  value={option.value || option}
                >
                  {option.label || option}
                </MenuItem>
              ))
          : field.options.map((option: any) =>
              typeof option === "object" ? (
                <MenuItem
                  key={option.value}
                  value={option.value == false ? false : option.value}
                >
                  {option.label}
                </MenuItem>
              ) : (
                <MenuItem
                  key={option.value || option}
                  value={option.value || option}
                >
                  {option.label || option}
                </MenuItem>
              )
            )}
      </Select>
    </FormControl>
  );
};

export const NewPhone = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  return (
    <Grid item xs={gridSize}>
      {/* <TextField
        fullWidth
        name={keyProp as string}
        type="tel"
        label={field?.label}
        value={formData[keyProp]}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
        required={field?.required}
        InputLabelProps={{ shrink: !!formData[keyProp] }}
        slotProps={{
          input: {
            
            inputMode: "tel",
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          },
        }}
      /> */}
      <MuiTelInput
        defaultCountry={"TR"}
        value={formData[keyProp] || ""}
        onChange={(e) => handleChange({ target: { name: keyProp, value: e } })}
        label={field?.label}
        fullWidth
        required={field?.required}
      />
    </Grid>
  );
};

export const NewEmail = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  return (
    <Grid item xs={gridSize}>
      <TextField
        fullWidth
        name={keyProp as string}
        type="email"
        label={field?.label}
        value={formData[keyProp] || ""}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
        required={field?.required}
        slotProps={{
          input: {
            inputMode: "email",
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  );
};

export const NewNumber = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  return (
    <TextField
      fullWidth
      name={keyProp as string}
      type="number"
      label={field?.label}
      value={
        formData[keyProp] || formData[keyProp] === 0 ? formData[keyProp] : ""
      }
      disabled={field?.disabled}
      onChange={(e) =>
        handleChange({
          target: { name: keyProp, value: parseFloat(e.target.value) },
        })
      }
      required={field?.required}
      InputLabelProps={{
        shrink: !!formData[keyProp] || formData[keyProp] === 0,
      }}
    />
  );
};
const formatDateForDateTimeLocal = (date: Date) => {
  const pad = (n: any) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export const NewDate = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  return (
    <TextField
      fullWidth
      disabled={field?.disabled}
      name={keyProp as string}
      type={field?.type}
      value={
        formData[keyProp] && field.type === "date"
          ? new Date(formData[keyProp]).toISOString().split("T")[0]
          : formData[keyProp] && field.type === "datetime-local"
          ? formData[keyProp] &&
            formatDateForDateTimeLocal(new Date(formData[keyProp]))
          : formData[keyProp] || ""
      }
      label={field?.label}
      InputLabelProps={{ shrink: true }}
      onChange={(e) =>
        handleChange({
          target: {
            name: keyProp,
            value: e.target.value,
          },
        })
      }
      required={field?.required}
    />
  );
};
export const NewRelation = ({
  keyProp,
  formFields,
  formData,
  handleChange,
  tableData,
  togglePopup,
  disabled,
}: FormFieldProps & { tableData: any[] }) => {
  const field = formFields.find((f) => f.name === keyProp);
  if (!field) return null; // Return null for clarity

  const [searchTerm, setSearchTerm] = useState("");

  const selectedTable = tableData.find((table) => table.name === field.table);
  const selectedValue =
    selectedTable?.values.find(
      (value: any) => value[field.value] === formData[keyProp]
    ) || null; // Ensure it defaults to null

  const filteredOptions: any[] = field.relationDependancy
    ? tableData
        .find((table) => table.name === field.table)
        ?.values?.filter((value: any) =>
          Array.isArray(field.displayValue)
            ? field.displayValue
                .map((item: any) => String(value[item] ?? ""))
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              value[field.relationDependancy.field] ===
                formData[field.relationDependancy.value]
            : String(value[field.displayValue] ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              value[field.relationDependancy.field] ===
                formData[field.relationDependancy.value]
        ) ?? []
    : tableData
        .find((table) => table.name === field.table)
        ?.values?.filter((value: any) =>
          Array.isArray(field.displayValue)
            ? field.displayValue
                .map((item: any) => String(value[item] ?? ""))
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : String(value[field.displayValue] ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) ?? [];

  return (
    <>
      <FormControl fullWidth>
        <Autocomplete
          disabled={field?.disabled || disabled}
          options={
            field.groupBy
              ? filteredOptions.sort(
                  (a, b) =>
                    -String(b[field.groupBy]).localeCompare(
                      String(a[field.groupBy])
                    )
                )
              : filteredOptions || []
          }
          getOptionLabel={(option: any) =>
            Array.isArray(field.displayValue)
              ? field.displayValue.map((item: any) => option[item]).join(" ")
              : option[field.displayValue]
          }
          groupBy={(option) =>
            field.groupBy
              ? option[field.groupBy]
                ? option[field.groupBy]
                : `Ana ${field.label}`
              : undefined
          }
          renderInput={(params) => (
            <TextField
              required={field?.required}
              {...params}
              label={field.label}
              placeholder="Ara..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          value={selectedValue}
          onChange={(event, newValue) => {
            handleChange({
              target: {
                name: keyProp,
                value: newValue ? newValue[field.value] : "",
              },
            });
          }}
        />
      </FormControl>

      {field?.creatable && (
        <IconButton
          style={{ fontSize: "1rem" }}
          color="primary"
          onClick={() => {
            togglePopup && togglePopup(field.table, keyProp, true);
          }}
        >
          Yeni {field.label} Ekle
          <AddIcon />
        </IconButton>
      )}
    </>
  );
};

export const NewMultiRelation = ({
  keyProp,
  formFields,
  formData,
  handleChange,
  tableData,
  togglePopup,
  multiSelect,
}: FormFieldProps & { tableData: any[] }) => {
  const field = formFields.find((f) => f.name === keyProp);
  if (!field) return "";

  const [searchTerm, setSearchTerm] = useState("");

  const selectedTable = tableData.find((table) => table.name === field.table);
  const selectedValues = selectedTable
    ? selectedTable.values.filter((value: any) =>
        (formData[keyProp] || []).includes(value[field.value])
      )
    : [];

  const filteredOptions: string[] = field.relationDependancy
    ? tableData
        .find((table) => table.name === field.table)
        ?.values?.filter((value: any) =>
          Array.isArray(field.displayValue)
            ? field.displayValue
                .map((item: any) => String(value[item] ?? ""))
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              value[field.relationDependancy.field] ===
                formData[field.relationDependancy.value]
            : String(value[field.displayValue] ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              value[field.relationDependancy.field] ===
                formData[field.relationDependancy.value]
        ) ?? []
    : tableData
        .find((table) => table.name === field.table)
        ?.values?.filter((value: any) =>
          Array.isArray(field.displayValue)
            ? field.displayValue
                .map((item: any) => String(value[item] ?? ""))
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : String(value[field.displayValue] ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) ?? [];

  return (
    <>
      <FormControl fullWidth>
        <Autocomplete
          multiple={multiSelect || false}
          disabled={field?.disabled}
          options={filteredOptions || []}
          getOptionLabel={(option: any) =>
            Array.isArray(field.displayValue)
              ? field.displayValue.map((item: any) => option[item]).join(" ")
              : option[field.displayValue]
          }
          renderInput={(params) => (
            <>
              <TextField
                required={field?.required}
                {...params}
                label={field.label}
                placeholder="Ara..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </>
          )}
          value={selectedValues}
          onChange={(event, newValue) => {
            handleChange({
              target: {
                name: keyProp,
                value: newValue
                  ? newValue.map((val: any) => val[field.value])
                  : [],
              },
            });
          }}
        />
      </FormControl>

      {field?.creatable ? (
        <IconButton
          style={{ fontSize: "1rem" }}
          color="primary"
          onClick={() => {
            togglePopup && togglePopup(field.table, keyProp, true);
          }}
        >
          Yeni {field.label} Ekle
          <AddIcon />
        </IconButton>
      ) : (
        ""
      )}
    </>
  );
};

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Delete, Email, Phone } from "@mui/icons-material";
import { MuiTelInput } from "mui-tel-input";

export const NewMultiEntryField = ({
  keyProp,
  formFields,
  formData,
  handleChange,
}: FormFieldProps) => {
  const field = formFields.find((f) => f.name === keyProp);
  const [inputValue, setInputValue] = useState("");

  const handleAddEntry = () => {
    if (inputValue.trim() !== "") {
      const updatedArray = [...(formData[keyProp] || []), inputValue.trim()];
      handleChange({ target: { name: keyProp, value: updatedArray } });
      setInputValue("");
    }
  };

  const handleRemoveEntry = (index: number) => {
    const updatedArray = formData[keyProp].filter(
      (_: any, i: number) => i !== index
    );
    handleChange({ target: { name: keyProp, value: updatedArray } });
  };

  return (
    <FormControl fullWidth required={field?.required}>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{field?.label}</TableCell>
              <TableCell>Aksiyon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  name={keyProp as string}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddEntry();
                    }
                  }}
                  required={formData[keyProp]?.[0] === undefined} // Make TextField required
                />
              </TableCell>
              <TableCell width={"1rem"}>
                <IconButton color="primary" onClick={handleAddEntry}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {formData[keyProp]?.map((entry: string, index: number) => (
              <TableRow key={index}>
                <TableCell>{entry}</TableCell>
                <TableCell width={"1rem"}>
                  <IconButton
                    color="default"
                    onClick={() => handleRemoveEntry(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
};
