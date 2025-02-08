import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "report-issue";

export interface Data {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const formFields = [
  createField({ name: "title", label: "Konu", type: "text", required: true }),
  createField({
    name: "description",
    label: "Açıklama",
    type: "text",
    required: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "title", numeric: false, disablePadding: false, label: "Konu" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Açıklama",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Durum",
    actionConditions: [
      { value: "Open", color: "error", action: null, label: "Açık" },
      { value: "InProgress", color: "warning", action: null, label: "İşlemde" },
      { value: "Closed", color: "success", action: null, label: "Kapalı" },
    ],
  },
  {
    id: "response",
    numeric: false,
    disablePadding: false,
    label: "Cevap",
    width: 400,
  },
  {
    id: "closedDate",
    numeric: false,
    disablePadding: false,
    label: "Kapanış Tarih",
    date: true,
  },
];

export const title = "Sorun Bildir";
