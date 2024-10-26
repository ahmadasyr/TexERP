import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "product";

export interface Data {
  id: number;
  code: string;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text" }),
  createField({ name: "code", label: "Kod", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "code", numeric: false, disablePadding: false, label: "Kod" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
];

export const title = "Ürün";

export const URI = "/product";
