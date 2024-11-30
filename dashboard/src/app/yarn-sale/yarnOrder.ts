import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "yarn-order";

export interface Data {
  id: number;
  createdAt: string;
  accountId: number;
  sale: boolean;
  description: string;
  personnelId: number;
}

export const formFields = [
  createField({
    name: "accountId",
    label: "Müşteri/Şirket",
    type: "relation",
    relation: true,
    table: "account/properties/0/0/1/0",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "personnelId",
    label: "Personnel",
    type: "relation",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "sale",
    label: "Satış",
    type: "checkbox",
    required: true,
  }),
  createField({
    name: "description",
    label: "Açıklama",
    type: "text",
    required: true,
  }),
  createField({
    name: "createdAt",
    label: "Created At",
    type: "date",
    required: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    date: true,
  },
  {
    id: "account",
    numeric: true,
    disablePadding: false,
    label: "Müşteri/Şirket",
    displayValue: ["name"],
  },
  {
    id: "personnel",
    numeric: true,
    disablePadding: false,
    label: "Oluşturan Kişi",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Açıklama",
  },
];

export const title = "İplik Satışları";
