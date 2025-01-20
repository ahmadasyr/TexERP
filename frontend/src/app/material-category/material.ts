import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
import { create } from "domain";
export const tableName = "material-category";

export interface Data {
  id: number;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
  createField({
    name: "parentCategoryId",
    label: "Üst Kategori",
    type: "relation",
    table: "material-category",
    required: false,
    relation: true,
    value: "id",
    displayValue: ["name"],
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  {
    id: "parentCategory",
    numeric: false,
    disablePadding: false,
    label: "Üst Kategori",
    displayValue: ["name"],
  },
];

export const title = "Malzeme Türleri";
