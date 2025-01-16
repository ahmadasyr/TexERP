import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "product";

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

export const title = "Ürün";

export const URI = "/product";

export const conditions = [
  {
    action: ["edit", "delete", "create"],
    checks: [
      {
        key: "name",
        type: "equal",
        value: "deneme",
      },
    ],
  },
];
export const columns = [
  { name: "id", label: "No", type: "number", disabled: true },
  // {
  //   name: "outsourceTypeId", // name of key/field
  //   label: "Firma Adı", // label to display
  //   valueItem: "customer", // where to read from row
  //   value: "id", // value to send and set
  //   displayValue: ["name"], // value to display
  //   type: "relation", // type of column
  //   table: "outsource-type", // table name to fetch from api
  //   relation: true, // is it a relation
  // },
  {
    name: "productId",
    label: "Ürün Adı",
    type: "relation",
    table: "product",
    value: "id",
    displayValue: ["name"],
    relation: true,
    required: true,
    valueItem: "product",
  },
  { name: "date", label: "Tarih", type: "date" },
  { name: "unit", label: "Birim", type: "select", options: ["kg", "m"] },
  { name: "upfront", label: "Peşinat", type: "float" },
  { name: "price", label: "Fiyat", type: "float" },
  { name: "installment", label: "Vadeli", type: "float" },
  {
    name: "currencyId",
    label: "Para Birimi",
    type: "relation",
    table: "currency",
    value: "id",
    displayValue: ["name"],
    relation: true,
    required: true,
    valueItem: "currency",
  },
  {
    name: "personnelId",
    label: "Oluşturan Personel",
    valueItem: "personnel",
    type: "relation",
    relation: true,
    table: "personnel/sales",
    value: "id",
    displayValue: ["firstName", "lastName"],
    required: true,
  },
];
