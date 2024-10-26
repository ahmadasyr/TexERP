import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "tax-office";

export interface Data {
  id: number;
  name: string;
  city: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text" }),
  createField({ name: "city", label: "Şehir", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  { id: "city", numeric: false, disablePadding: false, label: "Şehir" },
];

export const title = "Vergi Dairesi";
