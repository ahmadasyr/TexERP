import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { getPersonnelInfo } from "@/contexts/auth";
export const tableName = "purchase-order";

export interface Data {
  id: number;
  createdAt: string;
  personnelId: number;
  supplierId: number;
  purchaseRequestId: number;
  purchaseType: string;
  vade?: number;
  shippingType?: string;
  deadline: Date;
  requiresApproval: boolean;
  approved: boolean;
  approvedDate?: Date;
  status: string;
  personnel: {
    firstName: string;
    lastName: string;
  };
  supplier: {
    name: string;
  };
}

export const formFields = [
  createField({
    name: "createdAt",
    label: "Tarih",
    type: "date",
    required: true,
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
    disabled: true,
    creatable: false,
  }),
  createField({
    name: "supplierId",
    label: "Tedarikçi",
    type: "relation",
    table: "supplier",
    required: true,
    value: "id",
    displayValue: ["name"],
    relation: true,
  }),

  createField({
    name: "purchaseType",
    label: "Ödeme Şekli",
    type: "select",
    options: ["Peşin", "Vadeli"],
    required: true,
  }),
  createField({
    name: "vade",
    label: "Vade",
    type: "number",
  }),
  createField({
    name: "shippingType",
    label: "Lojistik Tipi",
    type: "select",
    options: [
      "Karayolu Taşımacılığı",
      "Denizyolu Taşımacılığı",
      "Havayolu Taşımacılığı",
      "Demiryolu Taşımacılığı",
      "Intermodal Taşımacılık",
      "Multimodal Taşımacılık",
      "Proje Taşımacılığı",
      "Parsiyel Taşımacılık",
      "Soğuk Zincir Taşımacılığı",
      "Tehlikeli Madde Taşımacılığı (ADR)",
      "Kargo Taşımacılığı",
      "Dağıtım Lojistiği",
    ],
  }),
  createField({
    name: "deadline",
    label: "İstenen Termin",
    type: "date",
    required: true,
  }),
  createField({
    name: "requiresApproval",
    label: "Üst Yönetim Onayı Gerekli",
    type: "checkbox",
  }),
  createField({
    name: "status",
    label: "Durum",
    type: "select",
    disabled: true,
    options: [
      {
        value: "Pending",
        label: "Beklemede",
      },
      {
        value: "Approved",
        label: "Onaylandı",
      },
      {
        value: "Rejected",
        label: "Reddedildi",
      },
      {
        value: "Cancelled",
        label: "İptal Edildi",
      },
      {
        value: "Completed",
        label: "Tamamlandı",
      },
      {
        value: "Returned",
        label: "İade Edildi",
      },
    ],
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
    id: "supplier",
    numeric: false,
    disablePadding: false,
    label: "Tedarikçi",
    displayValue: ["name"],
  },
  {
    id: "purchaseRequest",
    numeric: false,
    disablePadding: false,
    label: "Satın Alma Talebi",
    displayValue: ["id"],
  },
  {
    id: "purchaseType",
    numeric: false,
    disablePadding: false,
    label: "Satın Alma Türü",
  },
  {
    id: "vade",
    numeric: false,
    disablePadding: false,
    label: "Vade",
  },
  {
    id: "shippingType",
    numeric: false,
    disablePadding: false,
    label: "Kargo Türü",
  },
  {
    id: "deadline",
    numeric: false,
    disablePadding: false,
    label: "Son Tarih",
    date: true,
  },
];

export const title = " Satın Alma Siparişi";
