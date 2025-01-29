import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "order-shipment";

export interface Data {
  id: number;
  orderId: number;
  createdAt: Date;
  sentDate?: Date;
  closed: boolean;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  personnelId: number;
}

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No", width: 100 },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Müşteri",
    width: 100,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Tarih",
    datetime: true,
    width: 100,
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Oluşturan",
    displayValue: ["firstName", "lastName"],
    width: 100,
  },
];

export const title = "Sevk Emirleri";
