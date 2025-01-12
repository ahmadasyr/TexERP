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
  firstOfferDate: Date;
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
  createField({
    name: "name",
    label: "Müşteri Adı",
    type: "text",
    required: true,
  }),
  createField({
    name: "foreign",
    label: "Yurtdışı",
    type: "checkbox",
    required: true,
  }),
  createField({
    name: "relatedPerson",
    label: "İlgili Kişi",
    type: "text",
  }),

  createField({ name: "title", label: "Unvan", type: "text" }),
  createField({ name: "email", label: "E-Posta", type: "email" }),
  createField({ name: "phoneNumber", label: "Telefon", type: "tel" }),
  createField({
    name: "firstOfferDate",
    label: "İlk Teklif Tarihi",
    type: "date",
  }),
  createField({
    name: "personnelId",
    label: "Satış Personeli",
    type: "relation",
    relation: true,
    table: "personnel/sales",
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
    required: true,
  }),
  createField({
    name: "firstRegisterDate",
    label: "İlk Kayıt Tarihi",
    type: "date",
  }),
  createField({
    name: "status",
    label: "Durum",
    type: "select",
    options: ["Mevcut", "Potansiyel", "Riskli", "Kara Liste"],
    required: true,
  }),
  createField({
    name: "returnDate",
    label: "Müşteri Dönme Tarihi",
    type: "date",
  }),
  createField({
    name: "salesOpinion",
    label: "Satış Birimi Görüşü",
    type: "text",
  }),
  createField({ name: "creditNote", label: "Kredi Notu", type: "text" }),
  createField({
    name: "shippingMethod",
    label: "Nakliye Şekli",
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
  createField({ name: "meterLimit", label: "Limit Metraj", type: "float" }),
  createField({ name: "address", label: "Adres", type: "text" }),
  createField({ name: "city", label: "Şehir", type: "text", required: true }),
  createField({
    name: "taxOfficeId",
    label: "Vergi Dairesi",
    type: "relation",
    relation: true,
    table: "tax-office",
    value: "id",
    displayValue: ["name"],
  }),
  createField({ name: "taxNumber", label: "Vergi No", type: "text" }),
  createField({ name: "paymentKind", label: "Ödeme Şekli", type: "text" }),
  createField({ name: "note", label: "Notlar", type: "text" }),
  createField({
    name: "bankId",
    label: "Çalışılan Banka",
    type: "number",
    relation: true,
    table: "bank",
    value: "id",
    displayValue: ["name"],
  }),
  createField({
    name: "currencyId",
    label: "Çalışılan Para Birimi",
    type: "relation",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: ["name"],
    creatable: false,
  }),
  createField({ name: "iban", label: "IBAN", type: "text" }),
  createField({ name: "swift", label: "SWIFT", type: "text" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "MÜŞTERİ ADI" },
  {
    id: "account",
    numeric: false,
    disablePadding: false,
    label: "HESAP TÜRÜ",
    displayValue: ["name"],
    clickable: true,
    uri: "/account/form/?id=",
  },
  {
    id: "foreign",
    numeric: false,
    disablePadding: false,
    label: "YURT DİŞİ",
  },
  {
    id: "relatedPerson",
    numeric: false,
    disablePadding: false,
    label: "İLGİLİ KİŞİ",
  },
  { id: "title", numeric: false, disablePadding: false, label: "Unvan" },
  { id: "email", numeric: false, disablePadding: false, label: "E-MAİL" },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "TELEFON",
  },
  {
    id: "firstOfferDate",
    numeric: false,
    disablePadding: false,
    label: "İLK TEKLİF TARİHİ",
    date: true,
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Satış Sorumlusu",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "firstRegisterDate",
    numeric: false,
    disablePadding: false,
    label: "İLK KAYIT TARİHİ",
    date: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "DURUM (M/P/R/K)",
  },
  {
    id: "returnDate",
    numeric: false,
    disablePadding: false,
    label: "M. DÖNME TARİHİ",
    date: true,
  },
  {
    id: "salesOpinion",
    numeric: false,
    disablePadding: false,
    label: "SATIŞ BİRİMİ GÖRÜŞÜ",
  },
  {
    id: "creditNote",
    numeric: false,
    disablePadding: false,
    label: "KREDİ NOTU",
  },
  {
    id: "shippingMethod",
    numeric: false,
    disablePadding: false,
    label: "NAKLİYE ŞEKLİ",
  },
  {
    id: "meterLimit",
    numeric: true,
    disablePadding: false,
    label: "LİMİT METRAJ",
  },
  { id: "address", numeric: false, disablePadding: false, label: "ADRES" },
  { id: "city", numeric: false, disablePadding: false, label: "ŞEHİR" },
  {
    id: "taxOffice",
    numeric: false,
    disablePadding: false,
    label: "Vergi Dairesi",
    displayValue: ["name"],
  },
  { id: "taxNumber", numeric: false, disablePadding: false, label: "Vergi No" },
  {
    id: "paymentKind",
    numeric: false,
    disablePadding: false,
    label: "ÖDEME ŞEKLİ",
  },
  { id: "note", numeric: false, disablePadding: false, label: "NOTLAR" },
  {
    id: "bank",
    numeric: false,
    disablePadding: false,
    label: "ÇALIŞILAN BANKA",
    displayValue: ["name"],
  },
  {
    id: "currency",
    numeric: false,
    disablePadding: false,
    label: "ÇALIŞILAN PARA BİRİMİ",
    displayValue: ["name"],
  },
  { id: "iban", numeric: false, disablePadding: false, label: "IBAN" },
  { id: "swift", numeric: false, disablePadding: false, label: "SWIFT" },
];

export const columns = [
  {
    name: "id",
    label: "No",
    type: "number",
    disabled: true,
  },
  {
    name: "name",
    label: "Müşteri Adı",
    type: "text",
    required: true,
  },
  {
    name: "foreign",
    label: "Yurtdışı",
    type: "boolean",
    required: true,
  },
  {
    name: "relatedPerson",
    label: "İlgili Kişi",
    type: "text",
  },
  {
    name: "title",
    label: "Unvan",
    type: "text",
  },
  {
    name: "email",
    label: "E-Posta",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Telefon",
    type: "tel",
  },
  {
    name: "firstOfferDate",
    label: "İlk Teklif Tarihi",
    type: "date",
  },
  {
    name: "personnelId",
    label: "Satış Personeli",
    valueItem: "personnel",
    type: "relation",
    relation: true,
    table: "personnel/sales",
    value: "id",
    displayValue: ["firstName", "lastName"],
    required: true,
  },
  {
    name: "firstRegisterDate",
    label: "İlk Kayıt Tarihi",
    type: "date",
  },
  {
    name: "status",
    label: "Durum",
    type: "select",
    options: ["Mevcut", "Potansiyel", "Riskli", "Kara Liste"],
    required: true,
  },
  {
    name: "returnDate",
    label: "Müşteri Dönme Tarihi",
    type: "date",
  },
  {
    name: "salesOpinion",
    label: "Satış Birimi Görüşü",
    type: "text",
  },
  {
    name: "creditNote",
    label: "Kredi Notu",
    type: "text",
  },
  {
    name: "shippingMethod",
    label: "Nakliye Şekli",
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
  },
  {
    name: "meterLimit",
    label: "Limit Metraj",
    type: "float",
  },
  {
    name: "address",
    label: "Adres",
    type: "text",
  },
  {
    name: "city",
    label: "Şehir",
    type: "text",
    required: true,
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
  {
    name: "taxNumber",
    label: "Vergi No",
    type: "text",
  },
  {
    name: "paymentKind",
    label: "Ödeme Şekli",
    type: "text",
  },
  {
    name: "note",
    label: "Notlar",
    type: "text",
  },
  {
    name: "bankId",
    label: "Çalışılan Banka",
    valueItem: "bank",
    type: "relation",
    relation: true,
    table: "bank",
    value: "id",
    displayValue: ["name"],
  },
  {
    name: "currencyId",
    label: "Çalışılan Para Birimi",
    valueItem: "currency",
    type: "relation",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: ["name"],
  },
  {
    name: "iban",
    label: "IBAN",
    type: "text",
  },
  {
    name: "swift",
    label: "SWIFT",
    type: "text",
  },
];

export const fetchOrders = async (setRows: any) => {
  try {
    const response = await fetch("/api/customer");
    const data = await response.json();
    setRows(data);
  } catch (error) {}
};

export const tableName = "customer";
export const idField = "id";
export const title = "Müşteri";
