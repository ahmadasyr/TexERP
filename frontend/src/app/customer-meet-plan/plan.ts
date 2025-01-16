import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { relative } from "path";
export const tableName = "customer-meet-plan";

export interface Data {
  id: number;
  customerId: number;
  location: string;
  visitReason: string;
  plannedDate: Date;
  realDate: Date;
  returnDate: Date;
  customerMeetPlanAttendee: number[];
  customerMeetPlanCustomer: {
    customerId: number;
    note: string;
  };
  accuracyRate: number;
  note: string;
  travelExpense: number;
  accommodationExpense: number;
  foodExpense: number;
  giftExpense: number;
  officeExpense: number;
  sampleExpense: number;
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
  createField({ name: "location", label: "Yer", type: "text", required: true }),
  createField({
    name: "visitReason",
    label: "Ziyaret Nedeni",
    type: "text",
    required: true,
  }),
  createField({
    name: "plannedDate",
    label: "Planlanan Ziyaret Tarihi",
    type: "datetime-local",
    required: true,
  }),
  createField({
    name: "realDate",
    label: "Gerçekleşen Ziyaret Tarihi",
    type: "datetime-local",
  }),
  createField({
    name: "returnDate",
    label: "Ziyaretten Dönüş Tarihi",
    type: "datetime-local",
  }),
  createField({
    name: "customerMeetPlanAttendee",
    label: "Ziyareti Gerçekleştiren Kişiler",
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
  createField({
    name: "sampleExpense",
    label: "Numune Gideri",
    type: "float",
  }),
];

export const columns = [
  { name: "id", label: "No", type: "number", disabled: true },
  {
    name: "customerId", // name of key/field
    label: "Firma Adı", // label to display
    valueItem: "customer", // where to read from row
    value: "id", // value to send and set
    displayValue: ["name"], // value to display
    type: "relation", // type of column
    table: "customer", // table name to fetch from api
    relation: true, // is it a relation
  },
  { name: "location", label: "Yer", type: "text" },
  { name: "visitReason", label: "Ziyaret Nedeni", type: "text" },
  { name: "plannedDate", label: "Planlanan Ziyaret Tarihi", type: "datetime" },
  { name: "realDate", label: "Gerçekleşen Ziyaret Tarihi", type: "datetime" },
  {
    name: "visitingPersonnelId",
    label: "Ziyareti Gerçekleştiren Personel",
    valueItem: "visitingPersonnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
    type: "relation",
    table: "personnel",
    relation: true,
  },
  { name: "result", label: "Ziyaret Sonucu", type: "text" },
  { name: "accuracyRate", label: "Ziyaret Gerçekleşme Oranı", type: "number" },
  { name: "note", label: "Açıklama", type: "text" },
  { name: "travelExpense", label: "Yol Gideri", type: "float" },
  { name: "accommodationExpense", label: "Konaklama Gideri", type: "float" },
  { name: "foodExpense", label: "Yemek Gideri", type: "float" },
  { name: "giftExpense", label: "Promosyon / Hediye Gideri", type: "float" },
  {
    name: "officeExpense",
    label: "Basılı Doküman / Kartela Gideri",
    type: "float",
  },
  {
    name: "sampleExpense",
    label: "Numune Gideri",
    type: "float",
  },
];

export const headCells: HeadCell[] = [
  {
    id: "customer",
    numeric: false,
    disablePadding: true,
    label: "Müşteri Adı",
    displayValue: ["name"],
  },
  { id: "location", numeric: false, disablePadding: false, label: "Yer" },
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
  {
    id: "sampleExpense",
    numeric: true,
    disablePadding: false,
    label: "Numune Gideri",
  },
];

export const title = "Müşteri Görüşme Planı";
