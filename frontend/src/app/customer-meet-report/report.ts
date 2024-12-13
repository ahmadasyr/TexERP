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
  createField({
    name: "revisionDate",
    label: "Revizyon Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "meetDate",
    label: "Görüşme Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "personnelId",
    label: "Görüşen Kişi",
    type: "number",
    relation: true,
    table: "personnel/sales",
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
    required: true,
  }),
  createField({
    name: "visitReason",
    label: "Ziyaret Amacı",
    type: "select",
    options: ["Pazarlama Faaliyeti", "Rutin Ziyaret", "Şikâyet", "Diğer"],
    required: true,
  }),
  createField({
    name: "customerId",
    label: "Müşteri Firma",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",

    displayValue: "name",
    required: true,
  }),
  createField({ name: "city", label: "İl", type: "text", required: true }),
  createField({
    name: "district",
    label: "İlçe",
    type: "text",
    required: true,
  }),
  createField({
    name: "peopleMet",
    label: "Görüşülen Kişi(ler)",
    type: "json",
    required: true,
  }),
  createField({
    name: "wayOfMeeting",
    label: "Görüşmenin Yapılış Şekli",
    type: "text",
    required: true,
  }),
  createField({
    name: "contentsOfMeeting",
    label: "Görüşmenin İçeriği ve Konular",
    type: "text",
    required: true,
  }),
  createField({
    name: "customerNote",
    label: "Müşterinin Beklentisi/Şikayeti/Memnuniyeti",
    type: "text",
  }),
  createField({
    name: "responseToCustomer",
    label: "Müşteriye Yapılan Geri Bildirim Detayları",
    type: "text",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
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
    id: "personnel",
    numeric: true,
    disablePadding: false,
    label: "Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "visitReason",
    numeric: false,
    disablePadding: false,
    label: "Ziyaret Nedeni",
  },
  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Müşteri",
    displayValue: ["name"],
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
