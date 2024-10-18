import React from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface FormFieldProps {
  keyProp: string;
  formFields: any[];
  formData: { [key: string]: any };
  handleChange: (event: any) => void;
}

export const NewTextField = ({
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
      type="text"
      label={field?.label}
      value={formData[keyProp]}
      onChange={(e) =>
        handleChange({ target: { name: keyProp, value: e.target.value } })
      }
      required={field?.required}
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
        labelId={`${keyProp}-label`}
        name={keyProp}
        value={formData[keyProp] || ""} // Ensure value is valid
        onChange={(e) =>
          handleChange({
            target: { name: keyProp, value: e.target.value },
          } as React.ChangeEvent<{ name?: string; value: unknown }>)
        }
        disabled={
          field.dependant &&
          !formData[field.dependency as keyof typeof formData]
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

export const NewRelation = ({
  keyProp,
  formFields,
  formData,
  handleChange,
  tableData,
}: FormFieldProps & { tableData: any[] }) => {
  const field = formFields.find((f) => f.name === keyProp);
  if (!field) return null;

  return (
    <FormControl fullWidth>
      <InputLabel>{field.label}</InputLabel>
      <Select
        name={keyProp as string}
        value={formData[keyProp]}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
      >
        {tableData
          .find((table) => table.name === field.table)
          ?.values.map((value: any, index: number) => (
            <MenuItem key={index} value={value[field.value]}>
              {Array.isArray(field.displayValue)
                ? field.displayValue.map((item: any) => value[item]).join(" ")
                : value[field.displayValue]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
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
      name={keyProp as string}
      type="date"
      value={formData[keyProp]}
      label={field?.label}
      InputLabelProps={{ shrink: true }}
      onChange={(e) =>
        handleChange({ target: { name: keyProp, value: e.target.value } })
      }
    />
  );
};
