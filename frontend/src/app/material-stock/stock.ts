import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";

export interface Data {
  id: number;
  materialId: number;
  warehouseId?: number;
  quantity: number;
  unit: string;
  createdAt: Date;
  purchaseOrderItemId?: number;
  personnelId: number;
  movedFromStockId?: number;
  movedPersonnelId?: number;
}

export const tableName = "material-stock";

export const formFields = [
  createField({
    name: "materialId",
    label: "Malzeme",
    type: "relation",
    relation: true,
    displayValue: ["name"],
    value: "id",
    table: "material",
    groupBy: "category",
    required: true,
  }),
  createField({
    name: "warehouseId",
    label: "Depo",
    type: "relation",
    table: "warehouse",
    relation: true,
    displayValue: ["name"],
    value: "id",
    groupBy: "parent",
    required: true,
  }),

  createField({
    name: "quantity",
    label: "Miktar",
    type: "number",
    required: true,
  }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    options: [
      { value: "kg", label: "KG" },
      { value: "metre", label: "Metre" },
      { value: "adet", label: "Adet" },
      { value: "litre", label: "Litre" },
      { value: "paket", label: "Paket" },
      { value: "kutu", label: "Kutu" },
      { value: "ton", label: "Ton" },
      { value: "koli", label: "Koli" },
    ],
    required: true,
  }),
  createField({
    name: "createdAt",
    label: "Giriş Tarihi",
    type: "date",
    required: true,
  }),

  createField({
    name: "personnelId",
    label: "Giren Personel",
    type: "relation",
    table: "personnel",
    required: true,
    relation: true,
    displayValue: ["firstName", "lastName"],
    value: "id",
    disabled: true,
    creatable: false,
  }),
  createField({
    name: "movedFromStockId",
    label: "Stoktan Taşınan Malzeme",
    type: "relation",
    table: "material-stock",
    relation: true,
    displayValue: ["id"],
    value: "id",
  }),
  createField({
    name: "movedPersonnelId",
    label: "Taşıyan Personel",
    type: "relation",
    table: "personnel",
    relation: true,
    displayValue: ["firstName", "lastName"],
    value: "id",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "material",
    numeric: false,
    disablePadding: false,
    label: "Malzeme",
    displayValue: ["name"],
  },
  {
    id: "warehouse",
    numeric: false,
    disablePadding: false,
    label: "Depo",
    displayValue: ["name"],
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Miktar",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Birim",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Giriş Tarihi",
    date: true,
  },
  {
    id: "purchaseOrderItemId",
    numeric: false,
    disablePadding: false,
    label: "Satınalma Sipariş Kalemi",
    displayValue: ["id"],
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "movedFromStock",
    numeric: false,
    disablePadding: false,
    label: "Stoktan Taşınan Malzeme",
    displayValue: ["id"],
  },
  {
    id: "movedPersonnel",
    numeric: false,
    disablePadding: false,
    label: "Taşıyan Personel",
    displayValue: ["firstName", "lastName"],
  },
];

export const title = "Malzeme Stok";
