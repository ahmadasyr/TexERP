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
  togglePopup?: (table: string, column: string) => void;
  multiline?: boolean;
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
      value={formData[keyProp]}
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
            checked={formData[keyProp] as boolean}
            defaultChecked={false}
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
}: FormFieldProps) => {
  const field = formFields.find((field) => field.name === keyProp);
  if (!field || !field.options) {
    return null;
  }
  return (
    <FormControl fullWidth>
      <InputLabel id={`${keyProp}-label`}>{field.label}</InputLabel>
      <Select
        required={field?.required}
        labelId={`${keyProp}-label`}
        name={keyProp}
        value={formData[keyProp] || ""} // Ensure value is valid
        onChange={(e) =>
          handleChange({
            target: { name: keyProp, value: e.target.value },
          } as React.ChangeEvent<{ name?: string; value: unknown }>)
        }
        disabled={
          (field.dependant &&
            !formData[field.dependency as keyof typeof formData]) ||
          field.disabled
        }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {field.dependant && formData[field.dependency as keyof typeof formData]
          ? field.multiOptions
              .find(
                (option: any) =>
                  option.value ===
                  formData[field.dependency as keyof typeof formData]
              )
              ?.options.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
          : field.options.map((option: any) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
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
        value={formData[keyProp]}
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
        value={formData[keyProp]}
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
      value={formData[keyProp]}
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
          : formData[keyProp]
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
}: FormFieldProps & { tableData: any[] }) => {
  const field = formFields.find((f) => f.name === keyProp);
  if (!field) return null;

  const [searchTerm, setSearchTerm] = useState("");

  const selectedTable = tableData.find((table) => table.name === field.table);
  const selectedValue = selectedTable
    ? selectedTable.values.find(
        (value: any) => value[field.value] === formData[keyProp]
      )
    : null;

  const filteredOptions = field.relationDependancy
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
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </>
          )}
          value={selectedValue || null}
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

      {field?.creatable ? (
        <IconButton
          style={{ fontSize: "1rem" }}
          color="primary"
          onClick={() => {
            togglePopup && togglePopup(field.table, keyProp);
          }}
        >
          Yeni {field.label} Ekle
          <AddIcon />
        </IconButton>
      ) : null}
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
      {/* MUI Table */}
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
