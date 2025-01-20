import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";

export interface Data {
  id: number;
  name: string;
  accountId: number;
  materials: string;
  foreign: boolean;
  suitable: boolean;
  supplierScore: number;
  approved: boolean;
  evaluationDate: Date;
  createdAt: Date;
  entryScore?: number;
  maxApprovalDate?: Date;
  contractType?: string;
  contractDate?: Date;
  contractValidityPeriod?: number;
  selfPickup: boolean;
  address: string;
  phone?: string;
  email?: string;
  authorizedPerson?: string;
  authorizedPersonPhone?: string;
  authorizedPersonEmail?: string;
  taxOfficeId?: number;
  taxNumber?: string;
  vade?: number;
  iso9001Status: boolean;
  iso14001Status: boolean;
  iso45001Status: boolean;
}

export const formFields = [
  createField({
    name: "name",
    label: "TEDARİKÇİ",
    type: "text",
    required: true,
  }),
  createField({
    name: "accountId",
    label: "Hesap ID",
    type: "number",
    required: true,
  }),
  createField({
    name: "materials",
    label: "SATIN ALINAN HAMMADDE / MALZEME / HİZMET",
    type: "text",
    required: true,
  }),
  createField({
    name: "foreign",
    label: "YURT İÇİ / DIŞI",
    type: "select",
    options: [
      {
        label: "Yurt İçi",
        value: false,
      },
      {
        label: "Yurt Dışı",
        value: true,
      },
    ],
  }),
  createField({
    name: "suitable",
    label: "Tedarikçi Alım Onay Durumu",
    type: "select",
    options: [
      {
        label: "Onaylı",
        value: true,
      },
      {
        label: "Onaysız",
        value: false,
      },
    ],
  }),
  createField({
    name: "supplierScore",
    label: "TEDARİKÇİ PUANI",
    type: "number",
    required: true,
  }),
  createField({
    name: "approved",
    label: "Tedarikçi Durumu (Min 70 puan)",
    type: "select",
    options: [
      {
        label: "Onaylı",
        value: true,
      },
      {
        label: "Onaysız",
        value: false,
      },
    ],
  }),
  createField({
    name: "evaluationDate",
    label: "DEĞERLENDİRME TARİHİ",
    type: "date",
    required: true,
  }),
  createField({
    name: "createdAt",
    label: "TEDARİKÇİ SEÇME GİRİŞ TARİHİ",
    type: "date",
    required: true,
  }),
  createField({
    name: "entryScore",
    label: "TEDARİKÇİ SEÇME GİRİŞ PUANI",
    type: "number",
  }),
  createField({
    name: "maxApprovalDate",
    label: "Onaylanması Gereken Azami Tarih",
    type: "date",
  }),
  createField({
    name: "contractType",
    label: "Sözleme Tipi",
    type: "text",
  }),
  createField({
    name: "contractDate",
    label: "Sözleşme Tarihi",
    type: "date",
  }),
  createField({
    name: "contractValidityPeriod",
    label: "Sözleşme Geçerlilik Süresi",
    type: "number",
  }),
  createField({
    name: "selfPickup",
    label: "Lojistik Tipi",
    type: "select",
    options: [
      {
        label: "Gel Al",
        value: true,
      },
      {
        label: "Tedarikçiden Teslim",
        value: false,
      },
    ],
  }),
  createField({
    name: "address",
    label: "Adres",
    type: "text",
    required: true,
  }),
  createField({ name: "phone", label: "Telefon", type: "tel" }),
  createField({ name: "email", label: "E-posta", type: "email" }),
  createField({
    name: "authorizedPerson",
    label: "YETKİLİ KİŞİ",
    type: "text",
  }),
  createField({
    name: "authorizedPersonPhone",
    label: "Yetkili Tel",
    type: "tel",
  }),
  createField({
    name: "authorizedPersonEmail",
    label: "Yetkili E-posta",
    type: "email",
  }),
  createField({
    name: "taxOfficeId",
    label: "Vergi Dairesi",
    type: "relation",
    relation: true,
    table: "tax-office",
    value: "id",
    displayValue: ["name"],
  }),
  createField({
    name: "taxNumber",
    label: "Vergi Kimlik No",
    type: "text",
  }),
  createField({
    name: "vade",
    label: "Vade (gün)",
    type: "number",
  }),
  createField({
    name: "iso9001Status",
    label: "9001 Belgesi Durumu",
    type: "checkbox",
  }),
  createField({
    name: "iso14001Status",
    label: "14001 Belgesi Durumu",
    type: "checkbox",
  }),
  createField({
    name: "iso45001Status",
    label: "45001 Belgesi Durumu",
    type: "checkbox",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "TEDARİKÇİ" },
  {
    id: "account",
    numeric: false,
    disablePadding: false,
    label: "HESAP",
    displayValue: ["name"],
    clickable: true,
    uri: "/account/form/?id=",
  },
  {
    id: "materials",
    numeric: false,
    disablePadding: false,
    label: "SATIN ALINAN HAMMADDE / MALZEME / HİZMET",
  },
  {
    id: "foreign",
    numeric: false,
    disablePadding: false,
    label: "YURT DIŞI",
  },
  {
    id: "suitable",
    numeric: false,
    disablePadding: false,
    label: "Tedarikçi Alım Onay Durumu",
  },
  {
    id: "supplierScore",
    numeric: true,
    disablePadding: false,
    label: "TEDARİKÇİ PUANI",
  },
  {
    id: "approved",
    numeric: false,
    disablePadding: false,
    label: "Tedarikçi Durumu (Min 70 puan)",
  },
  {
    id: "evaluationDate",
    numeric: false,
    disablePadding: false,
    label: "DEĞERLENDİRME TARİHİ",
    date: true,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "TEDARİKÇİ SEÇME GİRİŞ TARİHİ",
    date: true,
  },
  {
    id: "entryScore",
    numeric: true,
    disablePadding: false,
    label: "TEDARİKÇİ SEÇME GİRİŞ PUANI",
  },
  {
    id: "maxApprovalDate",
    numeric: false,
    disablePadding: false,
    label: "Onaylanması Gereken Azami Tarih",
    date: true,
  },
  {
    id: "contractType",
    numeric: false,
    disablePadding: false,
    label: "Sözleme Tipi",
  },
  {
    id: "contractDate",
    numeric: false,
    disablePadding: false,
    label: "Sözleşme Tarihi",
    date: true,
  },
  {
    id: "contractValidityPeriod",
    numeric: true,
    disablePadding: false,
    label: "Sözleşme Geçerlilik Süresi",
  },
  {
    id: "selfPickup",
    numeric: false,
    disablePadding: false,
    label: "Kendi Alımı",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Adres" },
  { id: "phone", numeric: false, disablePadding: false, label: "Telefon" },
  { id: "email", numeric: false, disablePadding: false, label: "E-posta" },
  {
    id: "authorizedPerson",
    numeric: false,
    disablePadding: false,
    label: "YETKİLİ KİŞİ",
  },
  {
    id: "authorizedPersonPhone",
    numeric: false,
    disablePadding: false,
    label: "Yetkili Tel",
  },
  {
    id: "authorizedPersonEmail",
    numeric: false,
    disablePadding: false,
    label: "Yetkili E-posta",
  },
  {
    id: "taxOffice",
    numeric: false,
    disablePadding: false,
    label: "Vergi Dairesi",
    displayValue: ["name"],
  },
  {
    id: "taxNumber",
    numeric: false,
    disablePadding: false,
    label: "Vergi Kimlik No",
  },
  { id: "vade", numeric: true, disablePadding: false, label: "Vade (gün)" },
  // {
  //   id: "iso9001Status",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "9001 Belgesi Durumu",
  // },
  // {
  //   id: "iso14001Status",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "14001 Belgesi Durumu",
  // },
  // {
  //   id: "iso45001Status",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "45001 Belgesi Durumu",
  // },
];

export const columns = [
  { name: "id", label: "No", type: "number", disabled: true },
  { name: "name", label: "TEDARİKÇİ", type: "text", required: true },
  {
    name: "materials",
    label: "SATIN ALINAN HAMMADDE / MALZEME / HİZMET",
    type: "text",
    required: true,
  },
  { name: "foreign", label: "YURT İÇİ / DIŞI", type: "boolean" },
  {
    name: "suitable",
    label: "Tedarikçi Alım Onay Durumu",
    type: "boolean",
  },
  {
    name: "supplierScore",
    label: "TEDARİKÇİ PUANI",
    type: "number",
    required: true,
  },
  {
    name: "approved",
    label: "Tedarikçi Durumu (Min 70 puan)",
    type: "boolean",
  },
  {
    name: "evaluationDate",
    label: "DEĞERLENDİRME TARİHİ",
    type: "date",
    required: true,
  },
  {
    name: "createdAt",
    label: "TEDARİKÇİ SEÇME GİRİŞ TARİHİ",
    type: "date",
    required: true,
  },
  { name: "entryScore", label: "TEDARİKÇİ SEÇME GİRİŞ PUANI", type: "number" },
  {
    name: "maxApprovalDate",
    label: "Onaylanması Gereken Azami Tarih",
    type: "date",
  },
  { name: "contractType", label: "Sözleme Tipi", type: "text" },
  { name: "contractDate", label: "Sözleşme Tarihi", type: "date" },
  {
    name: "contractValidityPeriod",
    label: "Sözleşme Geçerlilik Süresi",
    type: "number",
  },
  { name: "selfPickup", label: "Lojistik Tipi", type: "boolean" },
  { name: "address", label: "Adres", type: "text", required: true },
  { name: "phone", label: "Telefon", type: "tel" },
  { name: "email", label: "E-posta", type: "email" },
  { name: "authorizedPerson", label: "YETKİLİ KİŞİ", type: "text" },
  {
    name: "authorizedPersonPhone",
    label: "Yetkili Tel",
    type: "tel",
  },
  {
    name: "authorizedPersonEmail",
    label: "Yetkili E-posta",
    type: "email",
  },
  {
    name: "taxOfficeId",
    label: "Vergi Dairesi",
    valueItem: "taxOffice",
    type: "relation",
    relation: true,
    table: "tax-office",
    value: "id",
    displayValue: ["name"],
  },
  { name: "taxNumber", label: "Vergi Kimlik No", type: "text" },
  { name: "vade", label: "Vade (gün)", type: "number" },
  // { name: "iso9001Status", label: "9001 Belgesi Durumu", type: "boolean" },
  // { name: "iso14001Status", label: "14001 Belgesi Durumu", type: "boolean" },
  // { name: "iso45001Status", label: "45001 Belgesi Durumu", type: "boolean" },
];

export const fetchOrders = async (setRows: any) => {
  try {
    const response = await fetch("/api/supplier");
    const data = await response.json();
    setRows(data);
  } catch (error) {}
};

export const tableName = "supplier";
export const idField = "id";
export const title = "Tedarikçi";
