import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "competitor-report-subject";

export interface Data {
  id: number;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
];

export const title = "Rakip Rapor Konusu";
