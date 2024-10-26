import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "customer-complaint";

export interface Data {
  id: number;
  date: Date;
  subject: string;
  customerId: number;
  productId: number;
  packagingDate: Date;
  complaintDetails: string;
  dealingPersonnelId: number;
  dealingDate: Date;
  evaluatingPersonnelId: number;
  actionTaken: string;
  dofNo: number;
  result: string;
}

export const formFields = [
  createField({ name: "date", label: "Şikayet Tarihi", type: "date" }),
  createField({
    name: "subject",
    label: "Şikayetin Konusu/İçeriği",
    type: "text",
  }),
  createField({
    name: "customerId",
    label: "Müşteri Adı",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "productId",
    label: "Ürün",
    type: "number",
    relation: true,
    table: "product",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "packagingDate",
    label: "Şikayet Edilen Ürünün Ambalaj Tarihi",
    type: "date",
  }),
  createField({
    name: "complaintDetails",
    label: "Müşteri Talebi",
    type: "text",
  }),
  createField({
    name: "dealingPersonnelId",
    label: "Müşteri ile Temas Kuran Kişi",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "dealingDate",
    label: "Müşteri Temas Tarihi",
    type: "date",
  }),
  createField({
    name: "evaluatingPersonnelId",
    label: "Şikayeti Değerlendiren Kişi",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "actionTaken",
    label: "Şikayet Sonucu Gerçekleştirilen Faaliyetler",
    type: "text",
  }),
  createField({ name: "dofNo", label: "DÖF Açıldıysa No", type: "number" }),
  createField({ name: "result", label: "Sonuç", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Şikayet Tarihi",
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Şikayetin Konusu/İçeriği",
  },
  {
    id: "customerId",
    numeric: true,
    disablePadding: false,
    label: "Müşteri Adı",
  },
  { id: "productId", numeric: true, disablePadding: false, label: "Ürün ID" },
  {
    id: "packagingDate",
    numeric: false,
    disablePadding: false,
    label: "Şikayet Edilen Ürünün Ambalaj Tarihi",
  },
  {
    id: "complaintDetails",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Talebi",
  },
  {
    id: "dealingPersonnelId",
    numeric: true,
    disablePadding: false,
    label: "Müşteri ile Temas Kuran Kişi",
  },
  {
    id: "dealingDate",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Temas Tarihi",
  },
  {
    id: "evaluatingPersonnelId",
    numeric: true,
    disablePadding: false,
    label: "Şikayeti Değerlendiren Kişi",
  },
  {
    id: "actionTaken",
    numeric: false,
    disablePadding: false,
    label: "Şikayet Sonucu Gerçekleştirilen Faaliyetler",
  },
  {
    id: "dofNo",
    numeric: true,
    disablePadding: false,
    label: "DÖF  Açıldıysa No",
  },
  { id: "result", numeric: false, disablePadding: false, label: "Sonuç" },
];

export const title = "Müşteri Şikayetleri";
