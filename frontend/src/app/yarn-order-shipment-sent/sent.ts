import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "yarn-order-shipment-sent";

export interface Data {
  id: number;
  yarnOrderShipmentId: number;
  yarnOrderItemId: number;
  yarnStockEntryId: number;
  sentKg: number;
  sentCount: number;
  personnelId: number;
}

export const formFields = [
  createField({
    name: "yarnOrderShipmentId",
    label: "İrsaliye No",
    type: "relation",
    relation: true,
    table: "yarn-order-shipment",
    value: "id",
    displayValue: "id",
    required: true,
  }),
  createField({
    name: "yarnOrderItemId",
    label: "İplik Sipariş No",
    type: "relation",
    relation: true,
    table: "yarn-order-item",
    value: "id",
    displayValue: "id",
    required: true,
    relationDependancy: {
      field: "yarnOrderShipmentId",
      value: "yarnOrderShipmentId",
    },
  }),
  createField({
    name: "yarnStockEntryId",
    label: "İplik Stok Giriş No",
    type: "relation",
    relation: true,
    table: "yarn",
    value: "id",
    displayValue: "lot",
    required: true,
  }),
  createField({
    name: "sentKg",
    label: "Gönderilen Kg",
    type: "number",
    required: true,
  }),
  createField({
    name: "sentCount",
    label: "Gönderilen Bobin Adet",
    type: "number",
    required: true,
  }),
  createField({
    name: "personnelId",
    label: "Okutulan Kişi",
    type: "relation",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
    required: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "yarnOrderShipment",
    numeric: true,
    disablePadding: false,
    label: "İrsaliye No",
    displayValue: ["id"],
  },
  {
    id: "yarnOrderItem",
    numeric: true,
    disablePadding: false,
    label: "İplik Sipariş No",
    displayValue: ["id"],
  },
  {
    id: "yarnStockEntry",
    numeric: true,
    disablePadding: false,
    label: "İplik Stok Giriş No",
    displayValue: ["id"],
  },
  {
    id: "sentKg",
    numeric: true,
    disablePadding: false,
    label: "Gönderilen Kg",
  },
  {
    id: "sentCount",
    numeric: true,
    disablePadding: false,
    label: "Gönderilen Bobin Adet",
  },
  {
    id: "personnel",
    numeric: true,
    disablePadding: false,
    label: "Okutulan Kişi",
    displayValue: ["firstName", "lastName"],
  },
];

export const title = "Gönderilen İplikler";
