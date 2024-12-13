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
            `${row[col.valueItem]?.[col.value]} - ${
              col.displayValue
                ? col.displayValue
                    .map((field: string) => row[col.valueItem]?.[field] || "")
                    .join(", ")
                : ""
            }`
          );
        } else if (col.type === "datetime") {
          if (row[col.name]) {
            const date = new Date(row[col.name]);
            mappedRow.push(date.toLocaleDateString());
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
  } catch (error) {
    console.error("Error fetching rows:", error);
  }
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
          // take only the first part (2)
          const relationValue = displayValue.split(" - ")[0];
          originalRow[col.name] = Number(relationValue);
        } else {
          originalRow[col.name] = null;
        }
        currentIndex += 1;
      } else if (col.type === "datetime") {
        // Recombine datetime
        const dateValue = mappedRow[currentIndex]
          ? new Date(mappedRow[currentIndex])
          : null;
        const timeValue = mappedRow[currentIndex + 1]
          ? mappedRow[currentIndex + 1]
          : null;
        if (dateValue && timeValue) {
          const dateString = dateValue.toLocaleDateString();
          let timeString = timeValue;
          if (timeString.endsWith("öö")) {
            timeString = timeString.slice(0, -2) + "am";
          }
          if (timeString.endsWith("ös")) {
            timeString = timeString.slice(0, -2) + "pm";
          }
          console.log(dateString, timeString);
          originalRow[col.name] = new Date(
            `${dateString} ${timeString}`
          ).toISOString();
        } else {
          originalRow[col.name] = null;
        }
        currentIndex += 2;
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
