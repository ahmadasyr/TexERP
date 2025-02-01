import { HeadCell } from "../../../../components/table/utils";

export const readCells: HeadCell[] = [
  {
    id: "index",
    numeric: false,
    disablePadding: true,
    label: "No",
    width: 100,
  },
  {
    id: "barcode",
    numeric: false,
    disablePadding: true,
    label: "Barkod",
    width: 100,
  },
  {
    id: "sentMeter",
    numeric: true,
    disablePadding: false,
    label: "Metre",
    width: 100,
  },
  {
    id: "sentKg",
    numeric: true,
    disablePadding: false,
    label: "Kg",
    width: 100,
  },
  { id: "lot", numeric: false, disablePadding: true, label: "Lot", width: 100 },
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: false, disablePadding: true, label: "No", width: 100 },
  {
    id: "barcode",
    numeric: false,
    disablePadding: true,
    label: "Barkod",
    width: 100,
  },

  {
    id: "meter",
    numeric: true,
    disablePadding: false,
    label: "Metre",
    width: 100,
  },
  { id: "kg", numeric: true, disablePadding: false, label: "Kg", width: 100 },
  {
    id: "lot",
    numeric: false,
    disablePadding: false,
    label: "Lot",
  },
  {
    id: "shelf",
    numeric: false,
    disablePadding: true,
    label: "Raf",
    width: 100,
  },
];

export const tableName = "order-shipment/confirmation";
