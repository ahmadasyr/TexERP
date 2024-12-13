import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { create } from "domain";
export const tableName = "product-feasibility-form";

export interface Data {
  id: number;
  date: Date;
  attendees: any;
  productName: string;
  customerId: number;
  yearlyProductionCount: number;
  startDateGoal: Date;
  productPriceGoal: number;
  marketReady: boolean;
  demandReady: boolean;
  legalReady: boolean;
  testReady: boolean;
  productionReady: boolean;
  measurementReady: boolean;
  rawMaterialCost: number;
  productionCost: number;
  process: any;
  material: any;
  auxEquipment: any;
  machine: any;
  costs: any;
  cost: number;
  customerBudget: number;
  priceDifferencePercent: number;
  suitable: boolean;
  costsCovered: boolean;
}

export const formFields = [
  createField({ name: "id", label: "No", type: "number" }),
  createField({ name: "date", label: "Tarih", type: "date" }),
  createField({
    name: "attendees",
    label: "Toplantı Katılımcıları",
    type: "json",
  }),
  createField({
    name: "productName",
    label: "Ürün Adı",
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
    name: "yearlyProductionCount",
    label: "Yıllık Üretim Adedi",
    type: "number",
  }),
  createField({
    name: "startDateGoal",
    label: "Hedef Üretime Başlama Tarihi ",
    type: "date",
  }),
  createField({
    name: "productPriceGoal",
    label: "Hedef Ürün Fiyatı",
    type: "number",
    required: true,
  }),
  createField({
    name: "marketReady",
    label: "Pazar şartları tanımlanmış mı?",
    type: "checkbox",
  }),
  createField({
    name: "demandReady",
    label: "Tüm müşteri talepleri karşılanabiliyor mu?",
    type: "checkbox",
  }),
  createField({
    name: "legalReady",
    label: "Yasal gereklilikler karşılanabiliyor mu?",
    type: "checkbox",
  }),
  createField({
    name: "testReady",
    label: "Tüm testler yapılabilir mi?",
    type: "checkbox",
  }),
  createField({
    name: "productionReady",
    label: "Üretim ekipmanları ürünü üretebilir mi?",
    type: "checkbox",
  }),
  createField({
    name: "measurementReady",
    label: "Tüm ölçüler için ölçüm ekipmanı var mı?",
    type: "checkbox",
  }),
  createField({
    name: "rawMaterialCost",
    label: "Planlanan hedef Hammadde maliyeti",
    type: "number",
  }),
  createField({
    name: "productionCost",
    label: "Planlanan hedef Üretim maliyeti",
    type: "number",
  }),
  createField({ name: "process", label: "Süreç", type: "Json" }),
  createField({ name: "material", label: "Malzeme", type: "Json" }),
  createField({
    name: "auxEquipment",
    label: "Yardımcı Ekipman",
    type: "Json",
  }),
  createField({ name: "machine", label: "Makine", type: "Json" }),
  createField({ name: "costs", label: "Maliyetler", type: "Json" }),
  createField({ name: "cost", label: "Maliyet", type: "number" }),
  createField({
    name: "customerBudget",
    label: "Müşteri Adı Bütçesi",
    type: "number",
  }),
  createField({
    name: "priceDifferencePercent",
    label: "Fiyat Farkı Yüzdesi",
    type: "number",
  }),
  createField({ name: "suitable", label: "Uygun", type: "checkbox" }),
  createField({
    name: "costsCovered",
    label: "Maliyetler Karşılandı",
    type: "checkbox",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "date", numeric: false, disablePadding: false, label: "Tarih" },
  {
    id: "attendees",
    numeric: false,
    disablePadding: false,
    label: "Toplantı Katılımcıları",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Ürün Adı",
  },
  {
    id: "customerId",
    numeric: false,
    disablePadding: false,
    label: "Müşteri Adı",
  },
  {
    id: "yearlyProductionCount",
    numeric: false,
    disablePadding: false,
    label: "Yıllık Üretim Adedi",
  },
  {
    id: "startDateGoal",
    numeric: false,
    disablePadding: false,
    label: "Hedef Üretime Başlama Tarihi ",
  },
  {
    id: "productPriceGoal",
    numeric: false,
    disablePadding: false,
    label: "Hedef Ürün Fiyatı",
  },
  {
    id: "marketReady",
    numeric: false,
    disablePadding: false,
    label: "Pazar şartları tanımlanmış mı?",
  },
  {
    id: "demandReady",
    numeric: false,
    disablePadding: false,
    label: "Tüm müşteri talepleri karşılanabiliyor mu?",
  },
  {
    id: "legalReady",
    numeric: false,
    disablePadding: false,
    label: "Yasal gereklilikler karşılanabiliyor mu?",
  },
  {
    id: "testReady",
    numeric: false,
    disablePadding: false,
    label: "Tüm testler yapılabilir mi?",
  },
  {
    id: "productionReady",
    numeric: false,
    disablePadding: false,
    label: "Üretim ekipmanları ürünü üretebilir mi?",
  },
  {
    id: "measurementReady",
    numeric: false,
    disablePadding: false,
    label: "Tüm ölçüler için ölçüm ekipmanı var mı?",
  },
  {
    id: "rawMaterialCost",
    numeric: false,
    disablePadding: false,
    label: "Planlanan hedef Hammadde maliyeti",
  },
  {
    id: "productionCost",
    numeric: false,
    disablePadding: false,
    label: "Planlanan hedef Üretim maliyeti",
  },
  { id: "process", numeric: false, disablePadding: false, label: "Süreç" },
  { id: "material", numeric: false, disablePadding: false, label: "Malzeme" },
  {
    id: "auxEquipment",
    numeric: false,
    disablePadding: false,
    label: "Yardımcı Ekipman",
  },
];

export const title = "Ürün Fizibilite Formu";
