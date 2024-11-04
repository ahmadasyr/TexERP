import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "competitor-report";

export interface Data {
  id: number;
  competitorId: number;
  date: string;
}

export const formFields = [
  createField({
    name: "competitorId",
    label: "Rakip",
    type: "relation",
    relation: true,
    table: "competitor",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({ name: "date", label: "Tarih", type: "date", required: true }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "competitor",
    numeric: true,
    disablePadding: false,
    label: "Rakip",
    displayValue: ["name"],
  },
  { id: "date", numeric: false, disablePadding: false, label: "Tarih" },
];

export const title = "Rakip Analiz Raporları";
