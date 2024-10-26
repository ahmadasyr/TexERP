import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "customer-meet-report";

export interface Data {
  id: number;
  revisionDate: Date;
  meetDate: Date;
  personnelId: number;
  visitReason: string;
  customerId: number;
  city: string;
  district: string;
  peopleMet: any; // Assuming Json type can be represented as any
  wayOfMeeting: string;
  contentsOfMeeting: string;
  customerNote: string;
  responseToCustomer: string;
}

export const formFields = [
  createField({ name: "revisionDate", label: "Revizyon Tarihi", type: "date" }),
  createField({ name: "meetDate", label: "Görüşme Tarihi", type: "date" }),
  createField({
    name: "personnelId",
    label: "Personel ID",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "visitReason", label: "Ziyaret Nedeni", type: "text" }),
  createField({
    name: "customerId",
    label: "Müşteri ID",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
  }),
  createField({ name: "city", label: "Şehir", type: "text" }),
  createField({ name: "district", label: "İlçe", type: "text" }),
  createField({ name: "peopleMet", label: "Görüşülen Kişiler", type: "json" }),
  createField({ name: "wayOfMeeting", label: "Görüşme Şekli", type: "text" }),
  createField({
    name: "contentsOfMeeting",
    label: "Görüşme İçeriği",
    type: "text",
  }),
  createField({ name: "customerNote", label: "Müşteri Notu", type: "text" }),
  createField({
    name: "responseToCustomer",
    label: "Müşteriye Yanıt",
    type: "text",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "revisionDate",
    numeric: false,
    disablePadding: false,
    label: "Revizyon Tarihi",
  },
  {
    id: "meetDate",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Tarihi",
  },
  {
    id: "personnelId",
    numeric: true,
    disablePadding: false,
    label: "Personel ID",
  },
  {
    id: "visitReason",
    numeric: false,
    disablePadding: false,
    label: "Ziyaret Nedeni",
  },
  {
    id: "customerId",
    numeric: true,
    disablePadding: false,
    label: "Müşteri ID",
  },
  { id: "city", numeric: false, disablePadding: false, label: "Şehir" },
  { id: "district", numeric: false, disablePadding: false, label: "İlçe" },
  {
    id: "peopleMet",
    numeric: false,
    disablePadding: false,
    label: "Görüşülen Kişiler",
  },
  {
    id: "wayOfMeeting",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Şekli",
  },
  {
    id: "contentsOfMeeting",
    numeric: false,
    disablePadding: false,
    label: "Görüşme İçeriği",
  },
  {
    id: "customerNote",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Notu",
  },
  {
    id: "responseToCustomer",
    numeric: false,
    disablePadding: false,
    label: "Müşteriye Yanıt",
  },
];

export const title = "Müşteri Görüşme Raporu";
