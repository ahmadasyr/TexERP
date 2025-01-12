import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "account";

export interface Data {
  id: number;
  name: string;
  debit: number;
  credit: number;
  createdAt: Date;
  accountTypeId: number;
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
    name: "accountTypeId",
    type: "relation",
    label: "Hesap Türü",
    relation: true,
    table: "account-type",
    value: "id",
    displayValue: ["name", "code"],
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  {
    id: "accountType",
    numeric: false,
    disablePadding: false,
    label: "Hesap Türü",
    displayValue: ["code", "name"],
  },
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
];

export const title = "account";
