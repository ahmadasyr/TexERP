import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "outsource-shipment";

// model outsourceShipment {
//   id                Int       @id @default(autoincrement())
//   createdAt         DateTime  @default(now())
//   personnelId       Int
//   sentDate          DateTime?
//   outsourceOrderId        Int
//   closed            Boolean   @default(false)
//   shippingCompanyId Int?
//   shippingCarrierId Int?
//   shippingCarId     Int?

//   // Relations
//   outsourceOrder        outsourceOrder          @relation(fields: [outsourceOrderId], references: [id])
//   personnel       personnel         @relation(fields: [personnelId], references: [id])
//   outsourceShipmentItem outsourceShipmentItem[]
//   shippingCompany shippingCompany?  @relation(fields: [shippingCompanyId], references: [id])
//   shippingCarrier shippingCarrier?  @relation(fields: [shippingCarrierId], references: [id])
//   shippingCar     shippingCar?      @relation(fields: [shippingCarId], references: [id])
// }

export interface Data {
  id: number;
  outsourceOrderId: number;
  createdAt: Date;
  sentDate?: Date;
  closed: boolean;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  personnelId: number;
  outsourceOrderItems: any[];
}

export const formFields = [
  createField({
    name: "outsourceOrderId",
    label: "Fason Sipariş No",
    type: "relation",
    required: true,
    table: "outsource-order",
    displayValue: ["id", "description"],
    relation: true,
    value: "id",
    creatable: false,
    disabled: true,
  }),
  createField({
    name: "createdAt",
    label: "Oluşturulma Tarihi",
    type: "datetime-local",
    required: true,
    disabled: true,
  }),
  createField({
    name: "sentDate",
    label: "Gönderim Tarihi",
    type: "datetime-local",
  }),
  createField({
    name: "closed",
    label: "Kapalı",
    type: "boolean",
    required: true,
  }),
  createField({
    name: "shippingCompanyId",
    label: "Nakliye Şirketi ID",
    type: "relation",
    table: "shipping-company",
    displayValue: ["name"],
    value: "id",
    relation: true,
  }),
  createField({
    name: "shippingCarrierId",
    label: "Nakliye Taşıyıcı ID",
    type: "relation",
    table: "shipping-carrier",
    displayValue: ["name"],
    value: "id",
    relation: true,
    relationDependancy: {
      field: "shippingCompanyId",
      value: "shippingCompanyId",
    },
  }),
  createField({
    name: "shippingCarId",
    label: "Nakliye Araç ID",
    type: "relation",
    table: "shipping-car",
    displayValue: ["plate"],
    value: "id",
    relation: true,
    relationDependancy: {
      field: "shippingCompanyId",
      value: "shippingCompanyId",
    },
  }),
  createField({
    name: "personnelId",
    label: "Personel ID",
    type: "relation",
    required: true,
    relation: true,
    table: "personnel",
    displayValue: ["firstName", "lastName"],
    disabled: true,
    value: "id",
    creatable: false,
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "outsourceOrderId",
    numeric: true,
    disablePadding: false,
    label: "Satış Sipariş No",
    clickable: true,
    uri: "/outsource-order/view/?id=",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Oluşturulma Tarihi",
    datetime: true,
  },
  {
    id: "sentDate",
    numeric: false,
    disablePadding: false,
    label: "Gönderim",
    datetime: true,
  },
  {
    id: "closed",
    numeric: false,
    disablePadding: false,
    label: "Kapalı",
    boolean: true,
  },
  {
    id: "shippingCompany",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Şirketi",
    displayValue: ["name"],
  },
  {
    id: "shippingCarrier",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Taşıyıcı",
    displayValue: ["name"],
  },
  {
    id: "shippingCar",
    numeric: false,
    disablePadding: false,
    label: "Nakliye Araç",
    displayValue: ["plate"],
  },
  {
    id: "personnel",
    numeric: false,
    disablePadding: false,
    label: "Oluşturan kişi",
    displayValue: ["firstName", "lastName"],
  },
];

export const title = "Fason Sevkiyatlar";
