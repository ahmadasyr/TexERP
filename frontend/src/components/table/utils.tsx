import {
  Autocomplete,
  Box,
  Chip,
  InputLabel,
  ListSubheader,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Data extends object>(
  order: Order,
  orderBy: keyof Data
): (a: Data, b: Data) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: keyof any;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  displayValue?: string[];
  date?: boolean;
  splitTime?: boolean;
  sum?: boolean;
  datetime?: boolean;
  clickable?: boolean;
  uri?: string;
  boolean?: boolean;
  actionConditions?: any;
}
export interface conditions {
  action: string[];
  checks: { key: string; type: string; value: any }[];
}
export const handleDelete = async (tableName: string, selected: number[]) => {
  let failed: number[] = [];
  await Promise.all(
    selected.map(async (id) => {
      try {
        if (tableName.startsWith("/")) {
          tableName = tableName.slice(1);
        }
        const response = await fetch(`/api/${tableName}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Failed to delete id: ${id}`);
        }
      } catch (error) {
        console.log(error);
        failed.push(id);
      }
    })
  );

  if (failed.length === selected.length) {
    return {
      code: 500,
      message: "Delete failed",
    };
  } else if (failed.length > 0) {
    return {
      code: 207,
      message: "Some rows couldn't be deleted",
      failed: failed,
    };
  } else {
    return {
      code: 200,
      message: "Delete successful",
    };
  }
};
function parseDate(input: string): Date {
  const [date, time, period] = input.split(" ");
  const [day, month, year] = date.split("/").map(Number);
  let [hours, minutes, seconds] = time.split(":").map(Number);

  // Convert to 24-hour format if needed
  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Create the ISO 8601 formatted string
  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return new Date(isoString);
}
export async function fetchExcelRows(
  URI: string,
  columnTypes: any[],
  setRows: Function,
  setInitialRows: Function
) {
  try {
    const response = await fetch(`/api/${URI}`);
    const data: any[] = await response.json();
    setInitialRows(data);
    const mappedRows = data.map((row) => {
      let mappedRow: any = [];
      columnTypes.forEach((col) => {
        if (col.type === "relation" && row[col.value]) {
          mappedRow.push(
            row[col.valueItem]?.[col.value]
              ? `${row[col.valueItem]?.[col.value]} - ${
                  col.displayValue
                    ? col.displayValue
                        .map(
                          (field: string) => row[col.valueItem]?.[field] || ""
                        )
                        .join(", ")
                    : ""
                }`
              : ""
          );
        } else if (col.type === "date") {
          if (row[col.name]) {
            const date = new Date(row[col.name]);
            mappedRow.push(
              date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            );
          } else {
            mappedRow.push("");
          }
        } else if (col.type === "datetime") {
          if (row[col.name]) {
            const date = new Date(row[col.name]);
            mappedRow.push(
              date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            );
            mappedRow.push(date.toLocaleTimeString());
          } else {
            mappedRow.push("");
            mappedRow.push("");
          }
        } else {
          mappedRow.push(row[col.name]);
        }
      });
      console.log(mappedRow);
      return mappedRow;
    });

    setRows(mappedRows);
  } catch (error) {}
}

export function reverseMappedRows(
  mappedRows: any[][],
  columnTypes: any[]
): any[] {
  return mappedRows.map((mappedRow) => {
    const originalRow: any = {};
    let currentIndex = 0;

    columnTypes.forEach((col) => {
      if (col.type === "relation") {
        // Reconstruct relation values
        const displayValue = mappedRow[currentIndex];
        if (displayValue && col.displayValue) {
          // example value 2 - Super, admin
          const relationValue = displayValue.split(" - ")[0];
          originalRow[col.name] = Number(relationValue);
        } else {
          originalRow[col.name] = null;
        }
        currentIndex += 1;
      } else if (col.type === "datetime") {
        // Recombine datetime
        const dateValue = mappedRow[currentIndex]
          ? new Date(mappedRow[currentIndex].split("/").reverse().join("-"))
          : null;
        const timeValue = mappedRow[currentIndex + 1]
          ? mappedRow[currentIndex + 1]
          : null;

        if (dateValue && timeValue) {
          const dateString = dateValue.toLocaleDateString("en-GB"); // Ensure consistent date format
          let timeString = timeValue.trim().toLowerCase();

          // Handle AM/PM adjustment
          if (timeString.endsWith("öö")) {
            timeString = timeString.slice(0, -2) + "am";
          }
          if (timeString.endsWith("ös")) {
            timeString = timeString.slice(0, -2) + "pm";
          }

          const dateTimeString = `${dateString} ${timeString}`;
          console.log(parseDate(dateTimeString));

          // correct format for datetime-local input: "2021-08-25T16:30"
          originalRow[col.name] = parseDate(dateTimeString).toISOString();
        } else {
          originalRow[col.name] = null;
        }
        currentIndex += 2;
      } else if (col.type === "date") {
        // Handle date type
        const dateValue = mappedRow[currentIndex]
          ? new Date(mappedRow[currentIndex].split("/").reverse().join("-"))
          : null;

        if (dateValue && !isNaN(dateValue.getTime())) {
          originalRow[col.name] = dateValue;
        } else {
          originalRow[col.name] = null;
        }
        currentIndex += 1;
      } else {
        // Handle regular columns
        const value = mappedRow[currentIndex];
        originalRow[col.name] = value === "" ? null : value;
        currentIndex += 1;
      }
    });

    return originalRow;
  });
}

export function CustomAutocomplete(props: any) {
  const { value, onChange, valueKey, displayValueKey, values, label, groupBy } =
    props;

  const handleOnChange = (event: any, newValue: any) => {
    onChange(newValue ? newValue[valueKey] : null);
  };

  // Find the currently selected value or default to null
  const selectedOption =
    values.find((item: any) => item[valueKey] === value)?.[displayValueKey] ||
    null;

  return (
    <Autocomplete
      style={{
        width: "100%",
        border: "none !important",
        borderRadius: "0",
      }}
      disablePortal
      id="values-id"
      groupBy={groupBy ? (option: any) => option[groupBy] : undefined}
      options={values} // Pass objects as options
      getOptionLabel={(option: any) => option[displayValueKey]} // Map to displayValueKey
      isOptionEqualToValue={
        (option: any, value: any) => option[valueKey] === value[valueKey] // Compare by valueKey
      }
      value={
        selectedOption !== null
          ? values.find((item: any) => item[displayValueKey] === selectedOption)
          : null
      } // Ensure value is never undefined
      onChange={handleOnChange}
      renderInput={(params) => (
        <TextField
          label={label} // Add a label if required
          style={{ border: "none !important", borderRadius: "0" }}
          {...params}
        />
      )}
    />
  );
}

export function CustomChipSelect(props: any) {
  const { value, onChange, valueKey, displayValueKey, values, label } = props;

  const handleChange = (event: any) => {
    const selectedValues = event.target.value.map(
      (selectedDisplayValue: string) =>
        values.find(
          (item: any) => item[displayValueKey] === selectedDisplayValue
        )?.[valueKey]
    );
    onChange(selectedValues);
  };

  const selectedDisplayValues = values
    .filter(
      (item: any) => Array.isArray(value) && value.includes(item[valueKey])
    )
    .map((item: any) => item[displayValueKey]);

  return (
    <>
      <Select
        style={{
          width: "100%",
          border: "none !important",
          borderRadius: "0",
        }}
        labelId="custom-chip-select-label"
        id="custom-chip-select"
        multiple
        value={selectedDisplayValues}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {values.map((item: any) => (
          <MenuItem key={item[valueKey]} value={item[displayValueKey]}>
            {item[displayValueKey]}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
export function CustomChipSelectWithGroups(props: any) {
  const { value, onChange, valueKey, displayValueKey, values, label } = props;

  const handleChange = (event: any) => {
    const selectedValues = event.target.value.map(
      (selectedDisplayValue: string) =>
        values.find(
          (item: any) => item[displayValueKey] === selectedDisplayValue
        )?.[valueKey]
    );
    onChange(selectedValues);
  };

  const selectedDisplayValues = values
    .filter(
      (item: any) => Array.isArray(value) && value.includes(item[valueKey])
    )
    .map((item: any) => item[displayValueKey]);

  return (
    <>
      <Select
        style={{
          width: "100%",
          border: "none !important",
          borderRadius: "0",
        }}
        labelId="custom-chip-select-label"
        id="custom-chip-select"
        multiple
        value={selectedDisplayValues}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {values.map((item: any) => (
          <MenuItem key={item[valueKey]} value={item[displayValueKey]}>
            {item[displayValueKey]}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

{
  /* <MenuItem key={item[valueKey]} value={item[displayValueKey]}>
              {item[displayValueKey]}
            </MenuItem> */
}

export function CustomChipSelectWithGroupsAutocomplete(props: any) {
  const { value, onChange, valueKey, displayValueKey, values, label } = props;

  const handleOnChange = (event: any, newValue: any[]) => {
    const selectedValues = newValue.map(
      (item: any) =>
        values.find((val: any) => val[displayValueKey] === item)?.[valueKey]
    );
    onChange(selectedValues);
  };

  const selectedOptions = values.filter((item: any) =>
    value.includes(item[valueKey])
  );

  return (
    <Autocomplete
      multiple
      limitTags={1}
      id="multiple-limit-tags"
      options={values.map((item: any) => item[displayValueKey])}
      getOptionLabel={(option) => option}
      value={selectedOptions.map((item: any) => item[displayValueKey])}
      onChange={handleOnChange}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="" />
      )}
      sx={{ width: "500px" }}
    />
  );
}
