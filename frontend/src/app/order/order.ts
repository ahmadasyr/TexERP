import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "order";

export interface Data {
  id: number;
  orderNo: string;
  customerId: number;
  index: number;
  productId: number;
  quantity: number;
  unit: string;
  deliveryAddress: string;
  acceptanceDate: Date;
  specifications: string;
  details: string;
}

export const formFields = [
  createField({ name: "orderNo", label: "Sipariş No", type: "text" }),
  createField({
    name: "customerId",
    label: "Müşteri",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "index", label: "Index", type: "number" }),
  createField({
    name: "productId",
    label: "Ürün",
    type: "number",
    relation: true,
    table: "product",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "quantity", label: "Miktar", type: "number" }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    options: ["kg", "m"],
  }),
  createField({
    name: "deliveryAddress",
    label: "Teslimat Adresi",
    type: "text",
  }),
  createField({ name: "acceptanceDate", label: "Kabul Tarihi", type: "date" }),
  createField({ name: "specifications", label: "Özellikler", type: "text" }),
  createField({ name: "details", label: "Detaylar", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "orderNo",
    numeric: false,
    disablePadding: false,
    label: "Sipariş No",
  },
  {
    id: "customer",
    numeric: false,
    disablePadding: false,
    label: "Müşteri",
    displayValue: ["name"],
  },
  { id: "index", numeric: true, disablePadding: false, label: "Index" },
  {
    id: "product",
    numeric: false,
    disablePadding: false,
    label: "Ürün",
    displayValue: ["name"],
  },
  { id: "quantity", numeric: true, disablePadding: false, label: "Miktar" },
  { id: "unit", numeric: false, disablePadding: false, label: "Birim" },
  {
    id: "deliveryAddress",
    numeric: false,
    disablePadding: false,
    label: "Teslimat Adresi",
  },
  {
    id: "acceptanceDate",
    numeric: false,
    disablePadding: false,
    label: "Kabul Tarihi",
  },
  {
    id: "specifications",
    numeric: false,
    disablePadding: false,
    label: "Özellikler",
  },
  { id: "details", numeric: false, disablePadding: false, label: "Detaylar" },
];

export const title = "Müşteri Siparişleri";
