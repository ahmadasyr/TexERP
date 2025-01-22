import {
  conditions as tableConditions,
  HeadCell,
} from "../../../components/table/utils";
import { createField } from "../../../components/form/utils";
import { getPersonnelInfo } from "@/contexts/auth";
export const tableName = "purchase-request";

export interface Data {
  id: number;
  createdAt: string;
  department: string;
  personnelId: number;
  approvalFromSupervisor: boolean;
  approvalFromSupervisorDate: string;

  approvalFromPurchasing: boolean;
  approvalFromPurchasingDate: string;
  personnel: {
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
    name: "department",
    label: "Departman",
    type: "select",
    required: true,
    disabled: true,
    options: [
      { value: "yon", label: "Yönetim" },
      { value: "iys", label: "İYS" },
      { value: "muh", label: "Muhasebe" },
      { value: "ika", label: "İnsan Kaynakları" },
      { value: "kal", label: "Kalite" },
      { value: "pln", label: "Planlama" },
      { value: "stn", label: "Satın Alma" },
      { value: "sts", label: "Satış" },
      { value: "urt", label: "Üretim" },
      { value: "sev", label: "Sevkiyat" },
      { value: "dep", label: "Depo" },
      { value: "coz", label: "Çözgü" },
      { value: "orm", label: "Örme" },
      { value: "dok", label: "Dokuma" },
      // { value: "kalf", label: "Kalite F" },
      { value: "kes", label: "Kesim" },
    ],
  }),
  createField({
    name: "personnelId",
    label: "Personel",
    type: "relation",
    required: true,
    disabled: true,
    table: "personnel",
    relation: true,
    value: "id",
    displayValue: ["firstName", "lastName"],
    creatable: false,
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
    id: "approvalFromSupervisor",
    numeric: false,
    disablePadding: false,
    label: "ONAY",
    boolean: true,
    actionConditions: [
      {
        value: "Evet",
        label: "Reddet",
        color: "error",
        action: "/api/purchase-request/supervisor/false",
      },
      {
        value: "Hayır",
        label: "Onayla",
        color: "success",
        action: "/api/purchase-request/supervisor/true",
      },
      {
        value: null,
        label: ["Onayla", "Reddet"],
        color: ["success", "error"],
        action: [
          "/api/purchase-request/supervisor/true",
          "/api/purchase-request/supervisor/false",
        ],
      },
    ],
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Departman",
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "approvalFromSupervisor",
    numeric: false,
    disablePadding: false,
    label: "Bölüm Müdüründen Onay",
    boolean: true,
  },
  {
    id: "approvalFromSupervisorDate",
    numeric: false,
    disablePadding: false,
    label: "Bölüm Müdüründen Onay Tarihi",
    date: true,
  },
  {
    id: "approvalFromPurchasing",
    numeric: false,
    disablePadding: false,
    label: "Satın Alma Birimi Tarafından Onay",
    boolean: true,
  },
  {
    id: "approvalFromPurchasingDate",
    numeric: false,
    disablePadding: false,
    label: "Satın Alma Birimi Tarafından Onay Tarihi",
    date: true,
  },
];

export const title = " Satın Alma Talebi";

export const conditions: tableConditions[] = [
  {
    action: ["edit"],
    checks: [
      {
        key: "approvalFromPurchasing",
        type: "equal",
        value: null,
      },
    ],
  },
];
