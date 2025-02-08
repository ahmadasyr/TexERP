import { HeadCell } from "../../../components/table/utils";

export const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
    width: 120,
  },
  {
    id: "lot",
    numeric: false,
    disablePadding: false,
    label: "Lot",
    width: 120,
  },
  {
    id: "yon",
    numeric: false,
    disablePadding: false,
    label: "Yon",
    width: 120,
    boolean: true,
    actionConditions: [
      {
        value: true,
        label: "B",
        color: "primary",
        action: null,
      },
      {
        value: false,
        label: "A",
        color: "secondary",
        action: null,
      },
      {
        value: null,
        label: "Yok",
        color: "info",
        action: null,
      },
    ],
  },
  {
    id: "dyeColorName",
    numeric: false,
    disablePadding: false,
    label: "Renk",
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
  {
    id: "kazanNo",
    numeric: false,
    disablePadding: false,
    label: "Kazan No",
    width: 120,
  },
];

export const tableName = "Sevk Emri Ürünleri";
