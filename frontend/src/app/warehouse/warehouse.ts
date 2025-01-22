import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "warehouse";

export interface Data {
  id: number;
  name: string;
  address: string;
  personnelId: number;
  parentWarehouseId?: number;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text" }),
  createField({ name: "address", label: "adres", type: "text" }),
  createField({
    name: "personnelId",
    label: "Oluşturan Personel",
    type: "relation",
    relation: true,
    value: "id",
    displayValue: ["firstName", "lastName"],
    disabled: true,
    table: "personnel",
  }),
  createField({
    name: "parentWarehouseId",
    label: "Üst Depo",
    type: "relation",
    relation: true,
    value: "id",
    displayValue: ["name"],
    table: "warehouse",
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  { id: "address", numeric: false, disablePadding: false, label: "Şehir" },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Oluşturan Personel",
    displayValue: ["firstName", "lastName"],
  },
  {
    id: "parentWarehouse",
    numeric: false,
    disablePadding: false,
    label: "Üst Depo",
    displayValue: ["name"],
  },
];

export const title = "Depo";
