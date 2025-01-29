import { HeadCell } from "../../../components/table/utils";

export const headCells: HeadCell[] = [
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Ürün",
    width: 120,
  },
  {
    id: "meter",
    numeric: true,
    disablePadding: false,
    label: "Metre",
    width: 120,
  },
  { id: "kg", numeric: true, disablePadding: false, label: "Kg", width: 120 },

  {
    id: "dyeColorName",
    numeric: false,
    disablePadding: false,
    label: "Renk",
    width: 120,
  },
  {
    id: "laminationColorName",
    numeric: false,
    disablePadding: false,
    label: "Lamine Rengi",
    width: 120,
  },
  {
    id: "outsourceTypeNames",
    numeric: false,
    disablePadding: false,
    label: "Özellikler",
    width: 250,
  },
];

export const tableName = "Sevk Emri Ürünleri";
