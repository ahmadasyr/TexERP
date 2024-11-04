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
  }),
  createField({
    name: "offerNo",
    label: "Teklif No",
    type: "number",
  }),
  createField({
    name: "saleNo",
    label: "Satış No",
    type: "number",
  }),
  createField({
    name: "offerDate",
    label: "Teklif Tarihi",
    type: "date",
  }),
  createField({
    name: "date",
    label: "Tarih",
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
  }),
  createField({
    name: "requestDate",
    label: "Talep Tarihi",
    type: "date",
  }),
  createField({
    name: "requestDeadline",
    label: "Talep Son Tarihi",
    type: "date",
  }),
  createField({
    name: "requestBudget",
    label: "Talep Bütçesi",
    type: "number",
  }),
  createField({
    name: "productId",
    label: "Ürün ID",
    type: "number",
    relation: true,
    table: "product",
    value: "id",
    displayValue: "name",
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
  }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    options: ["mt", "kg"],
  }),
  createField({
    name: "price",
    label: "Fiyat",
    type: "number",
  }),
  createField({
    name: "currencyId",
    label: "Para Birimi",
    type: "number",
    relation: true,
    table: "currency",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "vat",
    label: "KDV",
    type: "number",
  }),
  createField({
    name: "total",
    label: "Toplam",
    type: "number",
  }),
  createField({
    name: "maturity",
    label: "Vade",
    type: "number",
  }),
  createField({
    name: "daysDue",
    label: "Gün Sayısı",
    type: "number",
  }),
  createField({
    name: "deadlineDate",
    label: "Son Tarih",
    type: "date",
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
  }),
  createField({
    name: "shippingMethod",
    label: "Nakliye Yöntemi",
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
    type: "text",
  }),
  createField({
    name: "validPeriod",
    label: "Geçerlilik Süresi",
    type: "number",
  }),
  createField({
    name: "validPeriodType",
    label: "Geçerlilik Süresi Türü",
    type: "select",
    options: ["ay", "hafta", "gün"],
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
    options: ["Verilecek", "Red", "onaylandi", "beklemede"],
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
    type: "number",
  }),
];

export const headCells: HeadCell[] = [
  {
    id: "customerId",
    numeric: false,
    disablePadding: true,
    label: "Müşteri Adı",
  },
  {
    id: "offerNo",
    numeric: true,
    disablePadding: false,
    label: "Teklif No",
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
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
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
  },
  {
    id: "requestDeadline",
    numeric: false,
    disablePadding: false,
    label: "Talep Son Tarihi",
  },
  {
    id: "requestBudget",
    numeric: true,
    disablePadding: false,
    label: "Talep Bütçesi",
  },
  {
    id: "productId",
    numeric: true,
    disablePadding: false,
    label: "Ürün ID",
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
    id: "currencyId",
    numeric: true,
    disablePadding: false,
    label: "Para Birimi",
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
  },
  {
    id: "acceptanceDate",
    numeric: false,
    disablePadding: false,
    label: "Kabul Tarihi",
  },
  {
    id: "rejectionDate",
    numeric: false,
    disablePadding: false,
    label: "Red Tarihi",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Durum",
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
