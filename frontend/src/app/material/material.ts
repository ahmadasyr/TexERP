import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "material";

export interface Data {
  id: number;
  name: string;
  unit: string;
  categoryId: number;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
  createField({
    name: "unit",
    label: "Birim",
    type: "select",
    required: true,
    options: [
      { value: "kg", label: "KG" },
      { value: "metre", label: "Metre" },
      { value: "adet", label: "Adet" },
      { value: "litre", label: "Litre" },
      { value: "paket", label: "Paket" },
      { value: "kutu", label: "Kutu" },
      { value: "ton", label: "Ton" },
      { value: "koli", label: "Koli" },
    ],
  }),
  createField({
    name: "categoryId",
    label: "Malzeme Türü",
    type: "relation",
    table: "material-category",
    required: true,
    value: "id",
    displayValue: ["name"],
    relation: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  { id: "unit", numeric: false, disablePadding: false, label: "Birim" },
  {
    id: "materialCategory",
    numeric: false,
    disablePadding: false,
    label: "Malzeme Türü",
    displayValue: ["name"],
  },
];

export const title = "Malzemeler";
