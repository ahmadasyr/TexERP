import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "offer";

export interface Data {
  id: number;
  offerNo: number;
  saleNo: number;
  offerDate: Date;
  customerId: number;
  date: Date;
  proformaNo: number;
  requestNo: number;
  requestDate: Date;
  requestDeadline: Date;
  requestBudget: number;
  productId: number;
  specification: string;
  detail: string;
  quantity: number;
  unit: string; // select mt or kg
  price: number;
  currencyId: number;
  vat: number;
  total: number;
  maturity: number;
  daysDue: number;
  deadlineDate: Date;
  specialRequirement: string;
  deliveryAddress: string;
  shippingMethod: string; // select
  proformaDetails: string;
  packingListNo: number;
  additionalTerms: string;
  validPeriod: number;
  validPeriodType: string; // select ay, hafta, gün
  conditions: any; // json
  lastValidityDate: Date;
  acceptanceDate: Date;
  rejectionDate: Date;
  status: string; // select Verilecek, Red, onaylandi, beklemede
  meetNote: string;
  lastMeetDate: Date;
  meetStatement: string;
  totalKDV: number;
}

export const formFields = [
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
    name: "offerNo",
    label: "Teklif No",
    type: "number",
    required: true,
  }),
  createField({
    name: "saleNo",
    label: "Satış No",
    type: "number",
    required: true,
  }),
  createField({
    name: "offerDate",
    label: "Teklif Tarihi",
    type: "datetime-local",
    required: true,
  }),
  createField({
    name: "date",
    label: "Giriş Tarihi",
    type: "date",
  }),
  createField({
    name: "proformaNo",
    label: "Proforma No",
    type: "number",
  }),
  createField({
    name: "requestNo",
    label: "Talep No",
    type: "number",
    required: true,
  }),
  createField({
    name: "requestDate",
    label: "Talep Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "requestDeadline",
    label: "Talep Son Tarihi",
    type: "date",
  }),
  createField({
    name: "requestBudget",
    label: "Talep Bütçesi",
    type: "float",
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
    required: true,
  }),
  createField({
    name: "specification",
    label: "Spesifikasyon",
    type: "text",
  }),
  createField({
    name: "detail",
    label: "Detay",
    type: "text",
  }),
  createField({
    name: "quantity",
    label: "Miktar",
    type: "number",
    required: true,
  }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    options: ["m", "kg"],
    required: true,
  }),
  createField({
    name: "price",
    label: "Fiyat",
    type: "float",
    required: true,
  }),
  createField({
    name: "currencyId",
    label: "Para Birimi",
    type: "number",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "vat",
    label: "KDV",
    type: "float",
    required: true,
  }),
  createField({
    name: "total",
    label: "Toplam",
    type: "float",
    required: true,
  }),
  createField({
    name: "maturity",
    label: "Vade",
    type: "float",
    required: true,
  }),
  createField({
    name: "daysDue",
    label: "Gün Sayısı",
    type: "number",
    required: true,
  }),
  createField({
    name: "deadlineDate",
    label: "Termin Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "specialRequirement",
    label: "Özel Gereksinim",
    type: "text",
  }),
  createField({
    name: "deliveryAddress",
    label: "Teslimat Adresi",
    type: "text",
    required: true,
  }),
  createField({
    name: "shippingMethod",
    label: "Nakliye Yöntemi",
    type: "select",
    required: true,

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
  createField({
    name: "proformaDetails",
    label: "Proforma Detayları",
    type: "text",
  }),
  createField({
    name: "packingListNo",
    label: "Paketleme Listesi No",
    type: "number",
  }),
  createField({
    name: "additionalTerms",
    label: "Ek Şartlar",
    type: "json",
  }),
  createField({
    name: "validPeriod",
    label: "Geçerlilik Süresi",
    type: "number",
    required: true,
  }),
  createField({
    name: "validPeriodType",
    label: "Geçerlilik Süresi Türü",
    type: "select",
    options: ["ay", "hafta", "gün"],
    required: true,
  }),
  createField({
    name: "conditions",
    label: "Koşullar",
    type: "json",
  }),
  createField({
    name: "lastValidityDate",
    label: "Son Geçerlilik Tarihi",
    type: "date",
    required: true,
    disabled: true,
  }),
  createField({
    name: "acceptanceDate",
    label: "Kabul Tarihi",
    type: "date",
  }),
  createField({
    name: "rejectionDate",
    label: "Red Tarihi",
    type: "date",
  }),
  createField({
    name: "status",
    label: "Durum",
    type: "select",
    options: ["Verilecek", "Red", "Onaylandi", "Beklemede"],
    required: true,
  }),
  createField({
    name: "meetNote",
    label: "Görüşme Notu",
    type: "text",
  }),
  createField({
    name: "lastMeetDate",
    label: "Son Görüşme Tarihi",
    type: "date",
  }),
  createField({
    name: "meetStatement",
    label: "Görüşme Beyanı",
    type: "text",
  }),
  createField({
    name: "totalKDV",
    label: "Toplam KDV",
    type: "float",
    required: true,
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
  {
    id: "offerNo",
    numeric: true,
    disablePadding: false,
    label: "Teklif No",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Durum",
  },
  {
    id: "saleNo",
    numeric: true,
    disablePadding: false,
    label: "Satış No",
  },
  {
    id: "offerDate",
    numeric: false,
    disablePadding: false,
    label: "Teklif Tarihi",
    date: true,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: " Oluşturulma Tarihi",
    date: true,
  },
  {
    id: "proformaNo",
    numeric: true,
    disablePadding: false,
    label: "Proforma No",
  },
  {
    id: "requestNo",
    numeric: true,
    disablePadding: false,
    label: "Talep No",
  },
  {
    id: "requestDate",
    numeric: false,
    disablePadding: false,
    label: "Talep Tarihi",
    date: true,
  },
  {
    id: "requestDeadline",
    numeric: false,
    disablePadding: false,
    label: "Talep Son Tarihi",
    date: true,
  },
  {
    id: "requestBudget",
    numeric: true,
    disablePadding: false,
    label: "Talep Bütçesi",
  },
  {
    id: "product",
    numeric: true,
    disablePadding: false,
    label: "Ürün",
    displayValue: ["name"],
  },
  {
    id: "specification",
    numeric: false,
    disablePadding: false,
    label: "Spesifikasyon",
  },
  {
    id: "detail",
    numeric: false,
    disablePadding: false,
    label: "Detay",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Miktar",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Birim",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Fiyat",
  },
  {
    id: "currency",
    numeric: true,
    disablePadding: false,
    label: "Para Birimi",
    displayValue: ["name"],
  },
  {
    id: "vat",
    numeric: true,
    disablePadding: false,
    label: "KDV",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Toplam",
  },
  {
    id: "maturity",
    numeric: true,
    disablePadding: false,
    label: "Vade",
  },
  {
    id: "daysDue",
    numeric: true,
    disablePadding: false,
    label: "Gün Sayısı",
  },
  {
    id: "deadlineDate",
    numeric: false,
    disablePadding: false,
    label: "Son Tarih",
    date: true,
  },
  {
    id: "specialRequirement",
    numeric: false,
    disablePadding: false,
    label: "Özel Gereksinim",
  },
  {
    id: "deliveryAddress",
    numeric: false,
    disablePadding: false,
    label: "Teslimat Adresi",
  },
  {
    id: "shippingMethod",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Yöntemi",
  },
  {
    id: "proformaDetails",
    numeric: false,
    disablePadding: false,
    label: "Proforma Detayları",
  },
  {
    id: "packingListNo",
    numeric: true,
    disablePadding: false,
    label: "Paketleme Listesi No",
  },
  {
    id: "additionalTerms",
    numeric: false,
    disablePadding: false,
    label: "Ek Şartlar",
  },
  {
    id: "validPeriod",
    numeric: true,
    disablePadding: false,
    label: "Geçerlilik Süresi",
  },
  {
    id: "validPeriodType",
    numeric: false,
    disablePadding: false,
    label: "Geçerlilik Süresi Türü",
  },
  {
    id: "conditions",
    numeric: false,
    disablePadding: false,
    label: "Koşullar",
  },
  {
    id: "lastValidityDate",
    numeric: false,
    disablePadding: false,
    label: "Son Geçerlilik Tarihi",
    date: true,
  },
  {
    id: "acceptanceDate",
    numeric: false,
    disablePadding: false,
    label: "Kabul Tarihi",
    date: true,
  },
  {
    id: "rejectionDate",
    numeric: false,
    disablePadding: false,
    label: "Red Tarihi",
  },

  {
    id: "meetNote",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Notu",
  },
  {
    id: "lastMeetDate",
    numeric: false,
    disablePadding: false,
    label: "Son Görüşme Tarihi",
    date: true,
  },
  {
    id: "meetStatement",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Beyanı",
  },
  {
    id: "totalKDV",
    numeric: true,
    disablePadding: false,
    label: "Toplam KDV",
  },
];

export const title = "Teklif";
