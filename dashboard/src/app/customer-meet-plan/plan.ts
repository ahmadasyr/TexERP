import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "customer-meet-plan";

export interface Data {
  id: number;
  customerId: number;
  country: string;
  visitReason: string;
  plannedDate: Date;
  realDate: Date;
  visitingPersonnelId: number;
  accuracyRate: number;
  note: string;
  travelExpense: number;
  accommodationExpense: number;
  foodExpense: number;
  giftExpense: number;
  officeExpense: number;
}

export const formFields = [
  createField({
    name: "customerId",
    label: "Firma Adı",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({ name: "country", label: "Ülke", type: "text", required: true }),
  createField({
    name: "visitReason",
    label: "Ziyaret Nedeni",
    type: "text",
    required: true,
  }),
  createField({
    name: "plannedDate",
    label: "Planlanan Ziyaret Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "realDate",
    label: "Gerçekleşen Ziyaret Tarihi",
    type: "date",
  }),
  createField({
    name: "visitingPersonnelId",
    label: "Ziyareti Gerçekleştiren Personel",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
  }),
  createField({ name: "result", label: "Ziyaret Sonucu", type: "text" }),
  createField({
    name: "accuracyRate",
    label: "Ziyaret Gerçekleşme Oranı",
    type: "number",
  }),
  createField({ name: "note", label: "Açıklama", type: "text" }),
  createField({
    name: "travelExpense",
    label: "Yol Gideri",
    type: "float",
  }),
  createField({
    name: "accommodationExpense",
    label: "Konaklama Gideri",
    type: "float",
  }),
  createField({ name: "foodExpense", label: "Yemek Gideri", type: "float" }),
  createField({
    name: "giftExpense",
    label: "Promosyon / Hediye Gideri",
    type: "float",
  }),
  createField({
    name: "officeExpense",
    label: "Basılı Doküman / Kartela Gideri",
    type: "float",
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
  { id: "country", numeric: false, disablePadding: false, label: "Ülke" },
  {
    id: "visitReason",
    numeric: false,
    disablePadding: false,
    label: "Ziyaret Nedeni",
  },
  {
    id: "plannedDate",
    numeric: false,
    disablePadding: false,
    label: "Planlanan Ziyaret Tarihi",
    date: true,
  },
  {
    id: "realDate",
    numeric: false,
    disablePadding: false,
    label: "Gerçekleşen Ziyaret Tarihi",
    date: true,
  },
  {
    id: "visitingPersonnel",
    numeric: false,
    disablePadding: false,
    label: "Ziyareti Gerçekleştiren Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "result",
    numeric: false,
    disablePadding: false,
    label: "Ziyaret Sonucu",
  },
  {
    id: "accuracyRate",
    numeric: true,
    disablePadding: false,
    label: "Ziyaret Gerçekleşme Oranı",
  },
  { id: "note", numeric: false, disablePadding: false, label: "Açıklama" },
  {
    id: "travelExpense",
    numeric: true,
    disablePadding: false,
    label: "Yol Gideri",
  },
  {
    id: "accommodationExpense",
    numeric: true,
    disablePadding: false,
    label: "Konaklama Gideri",
  },
  {
    id: "foodExpense",
    numeric: true,
    disablePadding: false,
    label: "Yemek Gideri",
  },
  {
    id: "giftExpense",
    numeric: true,
    disablePadding: false,
    label: "Promosyon / Hediye Gideri",
  },
  {
    id: "officeExpense",
    numeric: true,
    disablePadding: false,
    label: "Basılı Doküman / Kartela Gideri",
  },
];

export const title = "Müşteri Görüşme Planı";
