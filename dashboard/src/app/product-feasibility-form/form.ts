import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "product-feasibility-form";

export interface Data {
  id: number;
  date: Date;
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
  createField({ name: "id", label: "ID", type: "number" }),
  createField({ name: "date", label: "Tarih", type: "date" }),
  createField({ name: "productName", label: "Ürün Adı", type: "text" }),
  createField({
    name: "customerId",
    label: "Müşteri ID",
    type: "number",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
  }),
  createField({
    name: "yearlyProductionCount",
    label: "Yıllık Üretim Sayısı",
    type: "number",
  }),
  createField({
    name: "startDateGoal",
    label: "Başlangıç Tarihi Hedefi",
    type: "date",
  }),
  createField({
    name: "productPriceGoal",
    label: "Ürün Fiyatı Hedefi",
    type: "number",
  }),
  createField({ name: "marketReady", label: "Pazara Hazır", type: "checkbox" }),
  createField({ name: "demandReady", label: "Talep Hazır", type: "checkbox" }),
  createField({ name: "legalReady", label: "Yasal Hazır", type: "checkbox" }),
  createField({ name: "testReady", label: "Test Hazır", type: "checkbox" }),
  createField({
    name: "productionReady",
    label: "Üretime Hazır",
    type: "checkbox",
  }),
  createField({
    name: "measurementReady",
    label: "Ölçüm Hazır",
    type: "checkbox",
  }),
  createField({
    name: "rawMaterialCost",
    label: "Hammadde Maliyeti",
    type: "number",
  }),
  createField({
    name: "productionCost",
    label: "Üretim Maliyeti",
    type: "number",
  }),
  createField({ name: "process", label: "Süreç", type: "text" }),
  createField({ name: "material", label: "Malzeme", type: "text" }),
  createField({
    name: "auxEquipment",
    label: "Yardımcı Ekipman",
    type: "text",
  }),
  createField({ name: "machine", label: "Makine", type: "text" }),
  createField({ name: "costs", label: "Maliyetler", type: "text" }),
  createField({ name: "cost", label: "Maliyet", type: "number" }),
  createField({
    name: "customerBudget",
    label: "Müşteri Bütçesi",
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
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "date", numeric: false, disablePadding: false, label: "Tarih" },
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
    label: "Müşteri ID",
  },
  {
    id: "yearlyProductionCount",
    numeric: false,
    disablePadding: false,
    label: "Yıllık Üretim Sayısı",
  },
  {
    id: "startDateGoal",
    numeric: false,
    disablePadding: false,
    label: "Başlangıç Tarihi Hedefi",
  },
  {
    id: "productPriceGoal",
    numeric: false,
    disablePadding: false,
    label: "Ürün Fiyatı Hedefi",
  },
  {
    id: "marketReady",
    numeric: false,
    disablePadding: false,
    label: "Pazara Hazır",
  },
  {
    id: "demandReady",
    numeric: false,
    disablePadding: false,
    label: "Talep Hazır",
  },
  {
    id: "legalReady",
    numeric: false,
    disablePadding: false,
    label: "Yasal Hazır",
  },
  {
    id: "testReady",
    numeric: false,
    disablePadding: false,
    label: "Test Hazır",
  },
  {
    id: "productionReady",
    numeric: false,
    disablePadding: false,
    label: "Üretime Hazır",
  },
  {
    id: "measurementReady",
    numeric: false,
    disablePadding: false,
    label: "Ölçüm Hazır",
  },
  {
    id: "rawMaterialCost",
    numeric: false,
    disablePadding: false,
    label: "Hammadde Maliyeti",
  },
  {
    id: "productionCost",
    numeric: false,
    disablePadding: false,
    label: "Üretim Maliyeti",
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

export const title = "Müşteri Siparişleri";
