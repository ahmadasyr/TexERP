import { HeadCell } from "../../../components/table/utils";

export const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "No",
    width: 120,
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Ürün",
    width: 120,
  },
  {
    id: "dyeColorName",
    numeric: false,
    disablePadding: false,
    label: "Boya Rengi",
    width: 120,
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Birim",
    width: 120,
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Miktar",
    width: 120,
  },
];

export const tableName = "Sevk Emri Ürünleri";
