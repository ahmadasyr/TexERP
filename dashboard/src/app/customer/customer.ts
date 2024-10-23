import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export interface Data {
  id: number;
  name: string;
  foreign: boolean;
  relatedPerson: string;
  title: string;
  email: string;
  phoneNumber: string;
  firstOffer: Date;
  personnelId?: number;
  firstRegisterDate: Date;
  status: string;
  returnDate: Date;
  salesOpinion: string;
  creditNote: string;
  shippingMethod: string;
  meterLimit: number;
  address: string;
  city: string;
  taxOfficeId: number;
  taxNumber: string;
  paymentKind: string;
  note: string;
  bankId: number;
  currencyId: number;
  iban: string;
  swift: string;
  personnel?: object;
  taxOffice?: object;
  bank?: object;
  currency?: object;
}

export const formFields = [
  createField({ name: "name", label: "Name", type: "text" }),
  createField({ name: "foreign", label: "Foreign", type: "checkbox" }),
  createField({
    name: "relatedPerson",
    label: "Related Person",
    type: "text",
  }),
  createField({ name: "title", label: "Title", type: "text" }),
  createField({ name: "email", label: "Email", type: "email" }),
  createField({ name: "phoneNumber", label: "Phone Number", type: "tel" }),
  createField({
    name: "firstOffer",
    label: "First Offer",
    type: "datetime-local",
  }),
  createField({
    name: "personnelId",
    label: "Sales Person ID",
    type: "relation",
    relation: true,
    table: "personnel/sales",
    value: "id",
    displayValue: ["firstName", "lastName"],
  }),
  createField({
    name: "firstRegisterDate",
    label: "First Register Date",
    type: "date",
  }),
  createField({
    name: "status",
    label: "Status",
    type: "select",
    options: ["Mevcut", "Potansiyel", "Riskli", "Kara Liste"],
  }),
  createField({ name: "returnDate", label: "Return Date", type: "date" }),
  createField({ name: "salesOpinion", label: "Sales Opinion", type: "text" }),
  createField({ name: "creditNote", label: "Credit Note", type: "text" }),
  createField({
    name: "shippingMethod",
    label: "Shipping Method",
    type: "select",
    options: [
      "Fabrikadan",
      "Depodan",
      "Limana",
      "EXW",
      "FCA",
      "CPT",
      "CIP",
      "DAT",
      "DAP",
      "DDP",
      "FAS",
      "FOB",
      "CFR",
      "CIF",
    ],
  }),
  createField({ name: "meterLimit", label: "Meter Limit", type: "float" }),
  createField({ name: "address", label: "Address", type: "text" }),
  createField({ name: "city", label: "City", type: "text" }),
  createField({
    name: "taxOfficeId",
    label: "Tax Office ID",
    type: "relation",
    relation: true,
    table: "tax-office",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "taxNumber", label: "Tax Number", type: "text" }),
  createField({ name: "paymentKind", label: "Payment Kind", type: "text" }),
  createField({ name: "note", label: "Note", type: "text" }),
  createField({
    name: "bankId",
    label: "Bank ID",
    type: "number",
    relation: true,
    table: "bank",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "currencyId",
    label: "Currency ID",
    type: "relation",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "iban", label: "IBAN", type: "text" }),
  createField({ name: "swift", label: "Swift", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "meterLimit",
    numeric: true,
    disablePadding: false,
    label: "Meter Limit",
  },
  { id: "foreign", numeric: false, disablePadding: false, label: "Foreign" },
  {
    id: "relatedPerson",
    numeric: false,
    disablePadding: false,
    label: "Related Person",
  },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "firstOffer",
    numeric: false,
    disablePadding: false,
    label: "First Offer",
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Sales Person",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "bank",
    numeric: false,
    disablePadding: false,
    label: "Bank",
    displayValue: ["name"],
  },
  {
    id: "firstRegisterDate",
    numeric: false,
    disablePadding: false,
    label: "First Register Date",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "returnDate",
    numeric: false,
    disablePadding: false,
    label: "Return Date",
  },
  {
    id: "salesOpinion",
    numeric: false,
    disablePadding: false,
    label: "Sales Opinion",
  },
  { id: "swift", numeric: false, disablePadding: false, label: "Swift" },
];

export const fetchData = async (setRows: any) => {
  try {
    const response = await fetch("http://localhost:3001/api/customer");
    const data = await response.json();
    setRows(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const fetchOrders = async (setRows: any) => {
  try {
    const response = await fetch("http://localhost:3001/api/customer");
    const data = await response.json();
    setRows(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const tableName = "customer";
export const idField = "id";
export const title = "Customer";
