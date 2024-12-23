import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "lamination-color";

export interface Data {
  id: number;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
];

export const title = "Lamine Rengi";
