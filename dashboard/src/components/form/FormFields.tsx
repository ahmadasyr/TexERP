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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FormFieldProps {
  keyProp: string;
  formFields: any[];
  formData: { [key: string]: any };
  handleChange: (event: any) => void;
  togglePopup?: (table: string, column: string) => void;
}

const gridSize = 12;
export const NewTextField = ({
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
        type="text"
        label={field?.label}
        value={formData[keyProp]}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
        required={field?.required}
      />
    </Grid>
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
    <Grid item xs={gridSize}>
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
    </Grid>
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
    <Grid item xs={gridSize}>
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
          {field.dependant &&
          formData[field.dependency as keyof typeof formData]
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
    </Grid>
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
      <TextField
        fullWidth
        name={keyProp as string}
        type="tel"
        label={field?.label}
        value={formData[keyProp]}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
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
    <Grid item xs={gridSize}>
      <TextField
        fullWidth
        name={keyProp as string}
        type="number"
        label={field?.label}
        value={formData[keyProp]}
        onChange={(e) =>
          handleChange({
            target: { name: keyProp, value: parseFloat(e.target.value) },
          })
        }
        required={field?.required}
      />
    </Grid>
  );
};

// export const NewRelations = ({
//   keyProp,
//   formFields,
//   formData,
//   handleChange,
//   tableData,
//   togglePopup,
// }: FormFieldProps & { tableData: any[] }) => {
//   const field = formFields.find((f) => f.name === keyProp);
//   if (!field) return null;

//   const selectedValue = tableData
//     .find((table) => table.name === field.table)
//     ?.values.find((value: any) => value[field.value] === formData[keyProp]);

//   const displayValue = selectedValue
//     ? Array.isArray(field.displayValue)
//       ? field.displayValue.map((item: any) => selectedValue[item]).join(" ")
//       : selectedValue[field.displayValue]
//     : "";

//   return (
//     <Grid item xs={gridSize}>
//       <FormControl fullWidth>
//         <InputLabel>{field.label}</InputLabel>
//         <Select
//           name={keyProp as string}
//           value={formData[keyProp]}
//           onChange={(e) =>
//             handleChange({ target: { name: keyProp, value: e.target.value } })
//           }
//           renderValue={() => displayValue}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {tableData
//             .find((table) => table.name === field.table)
//             ?.values.map((value: any, index: number) => (
//               <MenuItem key={index} value={value[field.value]}>
//                 {Array.isArray(field.displayValue)
//                   ? field.displayValue.map((item: any) => value[item]).join(" ")
//                   : value[field.displayValue]}
//               </MenuItem>
//             ))}
//         </Select>
//         <IconButton
//           style={{ fontSize: "1rem" }}
//           color="primary"
//           onClick={() => {
//             togglePopup && togglePopup(field?.table, keyProp);
//           }}
//         >
//           Add new
//           <AddIcon />
//         </IconButton>
//       </FormControl>
//     </Grid>
//   );
// };

export const NewDate = ({
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
        type={field?.type}
        value={
          formData[keyProp] && field.type === "date"
            ? new Date(formData[keyProp]).toISOString().split("T")[0]
            : formData[keyProp]
        }
        label={field?.label}
        InputLabelProps={{ shrink: true }}
        onChange={(e) =>
          handleChange({ target: { name: keyProp, value: e.target.value } })
        }
      />
    </Grid>
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

  const selectedValue = tableData
    .find((table) => table.name === field.table)
    ?.values.find((value: any) => value[field.value] === formData[keyProp]);

  const filteredOptions = tableData
    .find((table) => table.name === field.table)
    ?.values.filter((value: any) =>
      Array.isArray(field.displayValue)
        ? field.displayValue
            .map((item: any) => value[item])
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : value[field.displayValue]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Grid item xs={gridSize}>
        <FormControl fullWidth>
          <Autocomplete
            options={filteredOptions || []}
            getOptionLabel={(option: any) =>
              Array.isArray(field.displayValue)
                ? field.displayValue.map((item: any) => option[item]).join(" ")
                : option[field.displayValue]
            }
            renderInput={(params) => (
              <>
                <TextField
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
      </Grid>
      <IconButton
        style={{ fontSize: "1rem" }}
        color="primary"
        onClick={() => {
          togglePopup && togglePopup(field.table, keyProp);
        }}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
