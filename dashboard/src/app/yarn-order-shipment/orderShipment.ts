import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "yarn-order-shipment";

export interface Data {
  id: number;
  yarnOrderId: number;
  createdAt: Date;
  sentDate?: Date;
  closed: boolean;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  personnelId: number;
}

export const formFields = [
  createField({
    name: "yarnOrderId",
    label: "İplik Sipariş",
    type: "relation",
    required: true,
    table: "yarn-order",
    displayValue: ["id", "description"],
    relation: true,
    value: "id",
    creatable: false,
    disabled: true,
  }),
  createField({
    name: "createdAt",
    label: "Oluşturulma Tarihi",
    type: "datetime-local",
    required: true,
    disabled: true,
  }),
  createField({
    name: "sentDate",
    label: "Gönderim Tarihi",
    type: "datetime-local",
  }),
  createField({
    name: "closed",
    label: "Kapalı",
    type: "boolean",
    required: true,
  }),
  createField({
    name: "shippingCompanyId",
    label: "Nakliye Şirketi ID",
    type: "relation",
    table: "shipping-company",
    displayValue: ["name"],
    value: "id",
    relation: true,
  }),
  createField({
    name: "shippingCarrierId",
    label: "Nakliye Taşıyıcı ID",
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
    label: "Nakliye Araç ID",
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
    name: "personnelId",
    label: "Personel ID",
    type: "relation",
    required: true,
    relation: true,
    table: "personnel",
    displayValue: ["firstName", "lastName"],
    disabled: true,
    value: "id",
    creatable: false,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "yarnOrderId",
    numeric: true,
    disablePadding: false,
    label: "İplik Sipariş ID",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Oluşturulma Tarihi",
    date: true,
  },
  {
    id: "sentDate",
    numeric: false,
    disablePadding: false,
    label: "Gönderim Tarihi",
    datetime: true,
  },
  {
    id: "closed",
    numeric: false,
    disablePadding: false,
    label: "Kapalı",
  },
  {
    id: "shippingCompany",
    numeric: true,
    disablePadding: false,
    label: "Nakliye Şirketi ID",
    displayValue: ["name"],
  },
  {
    id: "shippingCarrier",
    numeric: true,
    disablePadding: false,
    label: "Nakliye Taşıyıcı ID",
    displayValue: ["name"],
  },
  {
    id: "shippingCar",
    numeric: true,
    disablePadding: false,
    label: "Nakliye Araç ID",
    displayValue: ["plate"],
  },
  {
    id: "personnel",
    numeric: true,
    disablePadding: false,
    label: "Personel ID",
    displayValue: ["firstName", "lastName"],
  },
];

export const title = "İplik Sevkiyat Emri";
