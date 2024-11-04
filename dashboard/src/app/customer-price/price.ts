import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "customer-price";

export interface Data {
  id: number;
  customerId: number;
  productId: number;
  currencyId: number;
  price: number;
  unit: string;
  date: Date;
}

export const formFields = [
  createField({
    name: "customerId",
    label: "Müşteri Adı",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "productId",
    label: "Ürün Adı",
    type: "number",
    relation: true,
    table: "product",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "currencyId",
    label: "Para Birimi",
    type: "number",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: "name",
    required: true,
    creatable: false,
  }),
  createField({
    name: "price",
    label: "Fiyat",
    type: "float",
    required: true,
  }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    options: ["kg", "mt"],
    required: true,
  }),
  createField({
    name: "date",
    label: "Tarih",
    type: "date",
  }),
];

export const headCells: HeadCell[] = [
  {
    id: "customer",
    numeric: false,
    disablePadding: true,
    label: "Müşteri Adı",
    displayValue: ["name"],
  },
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Ürün Adı",
    displayValue: ["name"],
  },
  {
    id: "currency",
    numeric: false,
    disablePadding: true,
    label: "Para Birimi",
    displayValue: ["name"],
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Fiyat",
    sum: true,
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Birim",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    date: true,
  },
];

export const title = "Müşteri Fiyatları";