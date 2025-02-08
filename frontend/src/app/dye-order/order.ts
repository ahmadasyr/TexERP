import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { dyeItemTypes } from "@/contexts/itemTypes";
export const tableName = "dye-order";

export interface Data {
  id: number;
  createdAt: string;
  supplierId: number;
  productId: number;
  stockStatus: string;
  personnelId: number;
  description: string;
  closed: boolean;
}

export const formFields = [
  createField({
    name: "supplierId",
    label: "Tedarikçi",
    type: "relation",
    relation: true,
    table: "supplier",
    value: "id",
    displayValue: ["name"],
    required: true,
    creatable: false,
  }),
  createField({
    name: "productId",
    label: "Ürün",
    type: "relation",
    relation: true,
    table: "product",
    value: "id",
    displayValue: ["name"],
    required: true,
    creatable: false,
  }),
  createField({
    name: "stockStatus",
    label: "Kumaş Tipi",
    type: "select",
    options: dyeItemTypes,
    required: true,
  }),
  createField({
    name: "description",
    label: "Açıklama",
    type: "text",
  }),
  createField({
    name: "createdAt",
    label: "Tarih",
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
    id: "closed",
    numeric: false,
    disablePadding: false,
    label: "Kapalı",
    boolean: true,
  },
  {
    id: "closed",
    numeric: false,
    disablePadding: false,
    label: "Durum",
    boolean: true,
    actionConditions: [
      {
        value: "Evet",
        label: "Aç",
        color: "success",
        action: "api/dye-order/open",
      },
      {
        value: "Hayır",
        label: "Kapat",
        color: "error",
        action: "api/dye-order/close",
      },
    ],
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    date: true,
  },
  {
    id: "stockStatus",
    numeric: false,
    disablePadding: false,
    label: "Kumaş Tipi",
    actionConditions: [
      {
        value: "RAW_QUALITY",
        label: "Ham Kumaş",
        color: "primary",
      },
      {
        value: "DYE_PRE_QUALITY",
        label: "Kalitesiz Boyalı Kumaş",
        color: "secondary",
      },
      {
        value: "DYE_QUALITY",
        label: "Kalite Boyalı Kumaş",
        color: "info",
      },
      {
        value: "LAMINATED_QUALITY",
        label: "Lamineli Kumaş",
        color: "warning",
      },
    ],
  },
  {
    id: "supplier",
    numeric: true,
    disablePadding: false,
    label: "Boyahane",
    displayValue: ["name"],
    clickable: true,
    uri: "/supplier/view/?id=",
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Oluşturan kişi",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Açıklama",
  },
];

export const title = "Boyahane Siparişi";
