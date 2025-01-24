import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { getPersonnelInfo } from "@/contexts/auth";
export const tableName = "purchase-delivery";

// //   id                Int      @id @default(autoincrement())
//   createdAt         DateTime @default(now())
//   purchaseOrderId   Int
//   date              DateTime
//   personnelId       Int
//   deliveryNo        String?
//   freightType       String?
//   deliveryType      String?
//   CarId             Int?
//   shippingCarrierId Int?
//   shippingCompanyId Int?
//   km                Int?
//   kmPrice           Float?
//   cost              Float?
//   description       String?
export interface Data {
  id: number;
  createdAt: string;
  purchaseOrderId: number;
  date: string;
  personnelId: number;
  deliveryNo: string;
  freightType: string;
  deliveryType: string;
  shippingCarId: number;
  shippingCarrierId: number;
  shippingCompanyId: number;
  km: number;
  kmPrice: number;
  cost: number;
  description: string;
  personnel: {
    firstName: string;
    lastName: string;
  };
  shippingCarrier: {
    name: string;
  };
  shippingCar: {
    plate: string;
  };
  shippingCompany: {
    name: string;
  };
}

export const formFields = [
  createField({
    name: "createdAt",
    label: "Tarih",
    type: "date",

    disabled: true,
  }),
  createField({
    name: "personnelId",
    label: "Personel",
    type: "relation",
    table: "personnel",
    required: true,
    relation: true,
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
  }),
  createField({
    name: "purchaseOrderId",
    label: "Satın Alma Talebi",
    type: "relation",
    table: "purchase-request",
    required: true,
    relation: true,
    value: "id",
    displayValue: ["id"],
    disabled: true,
    creatable: false,
  }),
  createField({
    name: "date",
    label: "Tarih",
    type: "date",
    required: true,
  }),
  createField({
    name: "deliveryNo",
    label: "İrsaliye No",
    type: "text",
  }),
  createField({
    name: "freightType",
    label: "Navlun Türü",
    type: "select",

    options: ["Standart", "Aşırı Navlun"],
  }),
  createField({
    name: "deliveryType",
    label: "Gönderi Tipi",
    type: "select",
    options: ["Firma Aracı", "Tır", "Kamyon", "Gemi", "Uçak", "Kurye", "Diğer"],
  }),
  createField({
    name: "shippingCompanyId",
    label: "Nakliye Şirketi ",
    type: "relation",
    table: "shipping-company",
    displayValue: ["name"],
    value: "id",
    relation: true,
  }),
  createField({
    name: "shippingCarrierId",
    label: "Nakliye Taşıyıcı ",
    type: "relation",
    table: "shipping-carrier",
    displayValue: ["name"],
    value: "id",
    relation: true,
    relationDependancy: {
      field: "shippingCompanyId",
      value: "shippingCompanyId",
    },
  }),
  createField({
    name: "shippingCarId",
    label: "Nakliye Araç ",
    type: "relation",
    table: "shipping-car",
    displayValue: ["plate"],
    value: "id",
    relation: true,
    relationDependancy: {
      field: "shippingCompanyId",
      value: "shippingCompanyId",
    },
  }),
  createField({
    name: "km",
    label: "KM",
    type: "number",
  }),
  createField({
    name: "kmPrice",
    label: "KM Maliyeti",
    type: "number",
  }),
  createField({
    name: "cost",
    label: "Harcanan İşçilik Ücreti",
    type: "number",
  }),
  createField({
    name: "description",
    label: "Açıklama",
    type: "text",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    date: true,
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "purchaseOrderId",
    numeric: false,
    disablePadding: false,
    label: "Satın Alma Talebi",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    date: true,
  },
  {
    id: "deliveryNo",
    numeric: false,
    disablePadding: false,
    label: "Teslimat No",
  },
  {
    id: "freightType",
    numeric: false,
    disablePadding: false,
    label: "Kargo Türü",
  },
  {
    id: "deliveryType",
    numeric: false,
    disablePadding: false,
    label: "Teslimat Türü",
  },
  {
    id: "shippingCompanyId",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Şirketi",
    displayValue: ["name"],
  },
  {
    id: "shippingCarrierId",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Taşıyıcı",
    displayValue: ["name"],
  },
  {
    id: "shippingCarId",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Araç",
    displayValue: ["plate"],
  },
  {
    id: "km",
    numeric: true,
    disablePadding: false,
    label: "Km",
  },
  {
    id: "kmPrice",
    numeric: true,
    disablePadding: false,
    label: "Km Fiyatı",
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: false,
    label: "Maliyet",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Açıklama",
  },
];

export const title = " Satın Alma Navlun";
