import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "product";

export interface Data {
  id: number;
  name: string;
  fine?: number;
  mayA?: number;
  mayB?: number;
  ham?: number;
  maxGrA?: number;
  maxGrB?: number;
  minGrA?: number;
  minGrB?: number;
}

export const formFields = [
  createField({ name: "name", label: "İsim", type: "text", required: true }),
  createField({ name: "fine", label: "Fine", type: "number" }),
  createField({ name: "mayA", label: "May A", type: "number" }),
  createField({ name: "mayB", label: "May B", type: "number" }),
  createField({ name: "ham", label: "Ham", type: "number" }),
  createField({ name: "maxGrA", label: "A Max Gr", type: "number" }),
  createField({ name: "maxGrB", label: "B Max Gr", type: "number" }),
  createField({ name: "minGrA", label: "A Min Gr", type: "number" }),
  createField({ name: "minGrB", label: "B Min Gr", type: "number" }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "İsim" },
  { id: "fine", numeric: true, disablePadding: false, label: "Fine" },
  { id: "mayA", numeric: true, disablePadding: false, label: "May A" },
  { id: "mayB", numeric: true, disablePadding: false, label: "May B" },
  { id: "ham", numeric: true, disablePadding: false, label: "Ham" },
  { id: "maxGrA", numeric: true, disablePadding: false, label: "Max Gr A" },
  { id: "maxGrB", numeric: true, disablePadding: false, label: "Max Gr B" },
  { id: "minGrA", numeric: true, disablePadding: false, label: "Min Gr A" },
  { id: "minGrB", numeric: true, disablePadding: false, label: "Min Gr B" },
];

export const title = "Ürün";

export const URI = "/product";
