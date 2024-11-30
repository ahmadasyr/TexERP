import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "yarn-type";

export interface Data {
  id: number;
  name: string;
  count: number;
  unit: string;
  color: string;
  colorCode: string;
  price: number;
  currencyId: number;
  createdAt: Date;
  updatedAt: Date;
  personnelId: number;
}

export const formFields = [
  createField({ name: "name", label: "Ad", type: "Text", required: true }),
  createField({
    name: "count",
    label: "Ölçü",
    type: "Number",
    required: true,
  }),
  createField({ name: "unit", label: "Birim", type: "Text", required: true }),
  createField({ name: "color", label: "Renk", type: "Text" }),
  createField({ name: "colorCode", label: "Renk Kodu", type: "Text" }),
  createField({
    name: "price",
    label: "Fiyat",
    type: "Number",
    required: false,
  }),
  createField({
    name: "currencyId",
    label: "Döviz",
    type: "Number",
    required: false,
  }),
  createField({
    name: "createdAt",
    label: "Oluşturulma Tarihi",
    type: "DateTime",
    disabled: true,
  }),
  createField({
    name: "personnelId",
    label: "Personel",
    relation: true,
    required: true,
    table: "personnel",
    type: "relation",
    displayValue: ["firstName", "lastName"],
    value: "id",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "Ad" },
  { id: "count", numeric: false, disablePadding: false, label: "Ölçü" },
  { id: "unit", numeric: false, disablePadding: false, label: "Birim" },
  { id: "color", numeric: false, disablePadding: false, label: "Renk" },
  {
    id: "colorCode",
    numeric: false,
    disablePadding: false,
    label: "Renk Kodu",
  },
  { id: "price", numeric: false, disablePadding: false, label: "Fiyat" },
  {
    id: "currencyId",
    numeric: false,
    disablePadding: false,
    label: "Döviz",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Oluşturulma Tarihi",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Güncellenme Tarihi",
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Oluşturan kişi",
    displayValue: ["firstName", "lastName"],
  },
];

export const title = "İplik Türleri";
