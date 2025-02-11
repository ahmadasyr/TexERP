import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";

export interface Data {
  id: number;
  yarnTypeId: number;
  createdAt: Date;
  lot: string;
  entryKg: number;
  entryCount: number;
  netKg: number;
  count: number;
  waybillNo?: string;
  personnelId: number;
  yarnOrderId?: number;
  accountId?: number;
  warehouseId?: number;
}

export const tableName = "yarn-stock";

export const formFields = [
  createField({
    name: "yarnTypeId",
    label: "İplik Türü",
    type: "relation",
    relation: true,
    displayValue: ["name"],
    value: "id",
    table: "yarn-type",
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
    name: "createdAt",
    label: "Giriş Tarihi",
    type: "date",
    required: true,
  }),
  createField({ name: "lot", label: "Lot", type: "text", required: true }),
  createField({
    name: "entryKg",
    label: "Giriş Kg",
    type: "number",
    required: true,
  }),
  createField({
    name: "entryCount",
    label: "Giriş Adet",
    type: "number",
    required: true,
  }),
  createField({
    name: "netKg",
    label: "Net Kg",
    type: "number",
    required: true,
  }),
  createField({
    name: "count",
    label: "Net Bobin Adedi",
    type: "number",
    required: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "yarnType",
    numeric: false,
    disablePadding: false,
    label: "İplik Türü",
    displayValue: ["name"],
  },
  {
    id: "lot",
    numeric: false,
    disablePadding: false,
    label: "Lot",
  },
  {
    id: "entryKg",
    numeric: true,
    disablePadding: false,
    label: "Giriş Kg",
  },
  {
    id: "entryCount",
    numeric: true,
    disablePadding: false,
    label: "Giriş Adet",
  },
  {
    id: "netKg",
    numeric: true,
    disablePadding: false,
    label: "Net Kg",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Net Bobin Adedi",
  },
  {
    id: "waybillNo",
    numeric: false,
    disablePadding: false,
    label: "İrsaliye No",
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "yarnOrderId",
    numeric: false,
    disablePadding: false,
    label: "İplik Sipariş No",
  },
  {
    id: "warehouse",
    numeric: false,
    disablePadding: false,
    label: "Depo",
    displayValue: ["name"],
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Giriş Tarihi",
    date: true,
  },
];

export const title = "İplik Stok";
