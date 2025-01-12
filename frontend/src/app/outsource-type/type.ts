import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "outsource-type";

export interface Data {
  id: number;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
  createField({
    name: "parentOutsourceTypeId",
    label: "Üst İşlem",
    type: "relation",
    table: "outsource-type",
    displayValue: "name",
    value: "id",
    relation: true,
    creatable: false,
  }),
  createField({
    name: "outsourceGroupId",
    label: "İşlem Türü",
    type: "relation",
    table: "outsource-group",
    displayValue: "name",
    value: "id",
    required: true,
    relation: true,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  {
    id: "parentOutsourceType",
    numeric: false,
    disablePadding: false,
    label: "Üst İşlem ",
    displayValue: ["name"],
  },
  {
    id: "outsourceGroup",
    numeric: false,
    disablePadding: false,
    label: "İşlem Türü",
    displayValue: ["name"],
  },
];

export const title = "Fason İşlemleri";
