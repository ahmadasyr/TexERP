import { conditions, HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "personnel";

export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  dateOfHire: string;
  email: string;
  phone: string;
}

export const headCells: HeadCell[] = [
  { id: "firstName", numeric: false, disablePadding: false, label: "Ad" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Soyad" },
  { id: "position", numeric: false, disablePadding: false, label: "Pozisyon" },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Departman",
  },
  {
    id: "dateOfHire",
    numeric: false,
    disablePadding: false,
    label: "İşe Giriş Tarihi",
    date: true,
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Telefon" },
];

export const conds: conditions[] = [
  {
    action: ["delete"],
    checks: [
      {
        key: "id",
        type: "equal",
        value: null,
      },
    ],
  },
];

export const title = "Benim Alt Çalışanlarım";
