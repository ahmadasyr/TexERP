//   id                       Int       @id @default(autoincrement())
//   createdAt                DateTime  @default(now())
//   reason                   String // Tedarikçi, Müşteri, İç Tetkik, Diğer
//   fromPersonnelId          Int
//   toPersonnelId            Int
//   followedPersonnelId    Int?
//   date                     DateTime
//   nonconformityDescription String
//   plannedCorrectiveActions String?
//   dueDate                  DateTime?
//   resultsAndComments       String?
//   closureDate              DateTime?

import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "dof";

export interface Data {
  id: number;
  reason: string;
  fromPersonnelId: number;
  toPersonnelId: number;
  followedPersonnelId: number;
  date: Date;
  nonconformityDescription: string;
  plannedCorrectiveActions: string;
  dueDate: Date;
  resultsAndComments: string;
  closureDate: Date;
}

export const formFields = [
  createField({
    name: "reason",
    label: "DÖFİ nedeni",
    type: "select",
    required: true,
    options: ["Tedarikçi", "Müşteri", "İç Tetkik", "Diğer"],
  }),
  createField({
    name: "fromPersonnelId",
    label: "Kimden",
    type: "relation",
    required: true,
    relation: true,
    table: "personnel",
    value: "id",
    displayValue: ["firstName", "lastName"],
  }),
  createField({
    name: "toPersonnelId",
    label: "Kime",
    type: "relation",
    required: true,
    relation: true,
    table: "personnel",

    value: "id",
    displayValue: ["firstName", "lastName"],
  }),
  createField({
    name: "followedPersonnelId",
    label: "Takip eden",
    type: "relation",
    required: false,
    relation: true,
    table: "personnel",

    value: "id",
    displayValue: ["firstName", "lastName"],
  }),
  createField({
    name: "date",
    label: "Tarih",
    type: "date",
    required: true,
  }),
  createField({
    name: "nonconformityDescription",
    label: "Uygunsuzluk açıklaması",
    type: "text",
    required: true,
  }),
  createField({
    name: "plannedCorrectiveActions",
    label: "Planlanan düzeltici faaliyetler",
    type: "text",
    required: false,
  }),
  createField({
    name: "dueDate",
    label: "Termin tarihi",
    type: "date",
    required: false,
  }),
  createField({
    name: "resultsAndComments",
    label: "Sonuçlar ve Açıklamalar",
    type: "text",
    required: false,
  }),
  createField({
    name: "closureDate",
    label: "Kapanış tarihi",
    type: "date",
    required: false,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "reason", numeric: false, disablePadding: false, label: "DÖFİ Nedeni" },
  {
    id: "fromPersonnel",
    numeric: false,
    disablePadding: false,
    label: "Kimden",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "toPersonnel",
    numeric: false,
    disablePadding: false,
    label: "Kime",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "followedPersonnel",
    numeric: false,
    disablePadding: false,
    label: "Takip eden",
    displayValue: ["firstName", "lastName"],
  },
  { id: "date", numeric: false, disablePadding: false, label: "Tarih" },
  {
    id: "nonconformityDescription",
    numeric: false,
    disablePadding: false,
    label: "Uygunsuzluk Açıklaması",
  },
  {
    id: "plannedCorrectiveActions",
    numeric: false,
    disablePadding: false,
    label: "Planlanan Düzeltici Faaliyetler",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "Termin Tarihi",
  },
  {
    id: "resultsAndComments",
    numeric: false,
    disablePadding: false,
    label: "Sonuçlar ve Açıklamalar",
  },
  {
    id: "closureDate",
    numeric: false,
    disablePadding: false,
    label: "Kapanış Tarihi",
  },
];
export const title = "DÖFİ Formu  ";
