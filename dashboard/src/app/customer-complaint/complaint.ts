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
  createField({
    name: "date",
    label: "Şikayet Tarihi",
    type: "date",
  }),
  createField({
    name: "subject",
    label: "Şikayetin Konusu/İçeriği",
    type: "text",
    required: true,
  }),
  createField({
    name: "customerId",
    label: "Müşteri Adı",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
    required: true,
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
    required: true,
  }),
  createField({
    name: "dealingPersonnelId",
    label: "Müşteri ile Temas Kuran Kişi",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
    required: true,
    creatable: false,
  }),
  createField({
    name: "dealingDate",
    label: "Müşteri Temas Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "evaluatingPersonnelId",
    label: "Şikayeti Değerlendiren Kişi",
    type: "number",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
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
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Şikayet Tarihi",
    date: true,
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Şikayetin Konusu/İçeriği",
  },
  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Müşteri Adı",
    displayValue: ["name"],
  },
  {
    id: "product",
    numeric: true,
    disablePadding: false,
    label: "Ürün ID",
    displayValue: ["name"],
  },
  {
    id: "packagingDate",
    numeric: false,
    disablePadding: false,
    label: "Şikayet Edilen Ürünün Ambalaj Tarihi",
    date: true,
  },
  {
    id: "complaintDetails",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Talebi",
  },
  {
    id: "dealingPersonnel",
    numeric: true,
    disablePadding: false,
    label: "Müşteri ile Temas Kuran Kişi",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "dealingDate",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Temas Tarihi",
    date: true,
  },
  {
    id: "evaluatingPersonnel",
    numeric: true,
    disablePadding: false,
    label: "Şikayeti Değerlendiren Kişi",
    displayValue: ["firstName", "lastName"],
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
