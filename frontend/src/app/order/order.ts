import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "order";

export interface Data {
  id: number;
  createdAt: string;
  type: string;
  accountId: number;
  description: string;
  personnelId: number;
  closed: boolean;
  customerId?: number;
  productId?: number;
}

export const formFields = [
  createField({
    name: "customerId",
    label: "Müşteri/Şirket",
    type: "relation",
    relation: true,
    table: "customer",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "personnelId",
    label: "Personnel",
    type: "relation",
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: "name",
    required: true,
  }),
  createField({
    name: "type",
    label: "Type",
    type: "select",
    options: [
      "Boyalı Kumaş Satışı",
      "Ham Kumaş Satışı",
      "Lamineli Kumaş Satışı",
      "Örtü Satışı",
      "Ön Fikseli Kumaş Satışı",
    ],
    required: true,
  }),
  createField({
    name: "description",
    label: "Açıklama",
    type: "text",
  }),
  createField({
    name: "createdAt",
    label: "Sipariş Tarihi",
    type: "date",
    required: true,
  }),
  createField({
    name: "closed",
    label: "Kapalı",
    type: "checkbox",
    required: true,
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
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "customer",
    numeric: true,
    disablePadding: false,
    label: "Müşteri/Şirket",
    displayValue: ["name"],
    clickable: true,
    uri: "/customer/view/?id=",
  },
  {
    id: "personnel",
    numeric: true,
    disablePadding: false,
    label: "Oluşturan Kişi",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Açıklama",
  },
  {
    id: "closed",
    numeric: false,
    disablePadding: false,
    label: "Kapalı",
    boolean: true,
  },
];

export const title = "Satış Siparişleri";
