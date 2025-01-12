import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "offer";

export interface Data {
  id: number;
  createdAt: Date;
  personnelId: number;
  paymentDue: number;
  deliveryDeadlineDate: Date;
  validPeriod: number;
  validPeriodType: string; // Replace with actual enum (ay, hafta, gün)
  lastValidityDate: Date;
  additionalTerms?: any; // json
  conditions?: any; // json
  total: number;
  totalKDV: number;
  responseDate?: Date;
  detail?: string;
  meetStatement?: string;
  meetNote?: string;
  status: string; // offerStatus
  customerTargetPrice?: number;
  orderId?: number;
}

export const formFields = [
  createField({
    name: "personnelId",
    label: "Personel ID",
    type: "number",
    required: true,
  }),
  createField({
    name: "paymentDue",
    label: "Ödeme Vadesi",
    type: "number",
    required: true,
  }),
  createField({
    name: "deliveryDeadlineDate",
    label: "Teslimat Son Tarihi",
    type: "datetime-local",
    required: true,
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
    name: "lastValidityDate",
    label: "Son Geçerlilik Tarihi",
    type: "datetime-local",
    required: true,
  }),
  createField({
    name: "additionalTerms",
    label: "Ek Şartlar",
    type: "json",
  }),
  createField({
    name: "conditions",
    label: "Koşullar",
    type: "json",
  }),
  createField({
    name: "total",
    label: "Toplam",
    type: "float",
    required: true,
  }),
  createField({
    name: "totalKDV",
    label: "Toplam KDV",
    type: "float",
    required: true,
  }),
  createField({
    name: "responseDate",
    label: "Yanıt Tarihi",
    type: "datetime-local",
  }),
  createField({
    name: "detail",
    label: "Detay",
    type: "text",
  }),
  createField({
    name: "meetStatement",
    label: "Görüşme Beyanı",
    type: "text",
  }),
  createField({
    name: "meetNote",
    label: "Görüşme Notu",
    type: "text",
  }),
  createField({
    name: "status",
    label: "Durum",
    type: "select",
    options: ["Verilecek", "Red", "Onaylandi", "Beklemede"],
    required: true,
  }),
  createField({
    name: "customerTargetPrice",
    label: "Müşteri Hedef Fiyatı",
    type: "float",
  }),
  createField({
    name: "orderId",
    label: "Sipariş ID",
    type: "number",
  }),
];

export const headCells: HeadCell[] = [
  {
    id: "personnelId",
    numeric: true,
    disablePadding: false,
    label: "Personel ID",
  },
  {
    id: "paymentDue",
    numeric: true,
    disablePadding: false,
    label: "Ödeme Vadesi",
  },
  {
    id: "deliveryDeadlineDate",
    numeric: false,
    disablePadding: false,
    label: "Teslimat Son Tarihi",
    date: true,
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
    id: "lastValidityDate",
    numeric: false,
    disablePadding: false,
    label: "Son Geçerlilik Tarihi",
    date: true,
  },
  {
    id: "additionalTerms",
    numeric: false,
    disablePadding: false,
    label: "Ek Şartlar",
  },
  {
    id: "conditions",
    numeric: false,
    disablePadding: false,
    label: "Koşullar",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Toplam",
  },
  {
    id: "totalKDV",
    numeric: true,
    disablePadding: false,
    label: "Toplam KDV",
  },
  {
    id: "responseDate",
    numeric: false,
    disablePadding: false,
    label: "Yanıt Tarihi",
    date: true,
  },
  {
    id: "detail",
    numeric: false,
    disablePadding: false,
    label: "Detay",
  },
  {
    id: "meetStatement",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Beyanı",
  },
  {
    id: "meetNote",
    numeric: false,
    disablePadding: false,
    label: "Görüşme Notu",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Durum",
  },
  {
    id: "customerTargetPrice",
    numeric: true,
    disablePadding: false,
    label: "Müşteri Hedef Fiyatı",
  },
  {
    id: "orderId",
    numeric: true,
    disablePadding: false,
    label: "Sipariş ID",
  },
];

export const title = "Teklif";
