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
