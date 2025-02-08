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
    id: "lot",
    numeric: false,
    disablePadding: false,
    label: "Lot",
    width: 120,
  },
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
    id: "itemType",
    numeric: false,
    disablePadding: false,
    label: "Kumaş Tipi",
    actionConditions: [
      {
        value: "RAW_QUALITY",
        label: "Ham Kumaş",
        color: "primary",
        action: null,
      },
      {
        value: "DYE_PRE_QUALITY",
        label: "Kalitesiz Boyalı Kumaş",
        color: "secondary",
        action: null,
      },
      {
        value: "DYE_QUALITY",
        label: "Kalite Boyalı Kumaş",
        color: "info",
        action: null,
      },
      {
        value: "LAMINATED_QUALITY",
        label: "Lamineli Kumaş",
        color: "warning",
        action: null,
      },
    ],
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
