import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "account";

export interface Data {
  id: number;
  name: string;
  debit: number;
  credit: number;
  createdAt: Date;
  updatedAt?: Date;
  outsource: boolean;
  dye: boolean;
  yarn: boolean;
  buys: boolean;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
  createField({
    name: "debit",
    label: "Debit",
    type: "number",
  }),
  createField({
    name: "credit",
    label: "Credit",
    type: "number",
  }),
  createField({
    name: "outsource",
    label: "Fason işi yapar",
    type: "checkbox",
    required: true,
  }),
  createField({
    name: "dye",
    label: "Boyahane işi yapar",
    type: "checkbox",
    required: true,
  }),
  createField({
    name: "yarn",
    label: "İplik Satar/Alır",
    type: "checkbox",
    required: true,
  }),
  createField({
    name: "buys",
    label: "Müşteridir",
    type: "checkbox",
    required: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  { id: "debit", numeric: true, disablePadding: false, label: "Debit" },
  { id: "credit", numeric: true, disablePadding: false, label: "Credit" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated At",
  },
  {
    id: "outsource",
    numeric: false,
    disablePadding: false,
    label: "Fason işi yapar",
  },
  {
    id: "dye",
    numeric: false,
    disablePadding: false,
    label: "Boyahane işi yapar",
  },
  {
    id: "yarn",
    numeric: false,
    disablePadding: false,
    label: "İplik Satar/Alır",
  },
  {
    id: "buys",
    numeric: false,
    disablePadding: false,
    label: "Müşteridir",
  },
];

export const title = "account";
