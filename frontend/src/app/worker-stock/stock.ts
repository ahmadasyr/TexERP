import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "material";
// model stock {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())

//   // product data
//   productId         Int
//   lot               String
//   meter             Float
//   kg                Float
//   yon               Boolean?
//   status            stockStatus
//   quality           Int?
//   qualityNote       String?
//   dyeColorId        Int?
//   dyeTypeId         Int?
//   laminationColorId Int?
//   productionOrderId Int?

//   // warehouse data
//   counted   Boolean?
//   countDate DateTime?
//   shelf     String?
//   barcode   String?   @unique
//   sold      Boolean?  @default(false)
//   kazanNo   String?

//   // general data
//   note        String?
//   personnelId Int

//   // Relations
//   product                   product                     @relation(fields: [productId], references: [id])
//   personnel                 personnel                   @relation(fields: [personnelId], references: [id])
//   dyeColor                  dyeColor?                   @relation(fields: [dyeColorId], references: [id])
//   dyeType                   dyeType?                    @relation(fields: [dyeTypeId], references: [id])
//   laminationColor           laminationColor?            @relation(fields: [laminationColorId], references: [id])
//   productionOrder           productionOrder?            @relation(fields: [productionOrderId], references: [id])
//   orderShipmentConfirmation orderShipmentConfirmation[]
//   stockSpecifications       stockSpecifications[]
// }
export interface Data {
  id: number;
}

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "No" },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Ürün",
  },
  {
    id: "dyeColor",
    numeric: false,
    disablePadding: false,
    label: "Boya Rengi",
  },
  {
    id: "laminationColor",
    numeric: false,
    disablePadding: false,
    label: "Laminasyon Rengi",
  },
  {
    id: "specs",
    numeric: false,
    disablePadding: false,
    label: "Ürün Özellikleri",
    width: 400,
  },
  {
    id: "lot",
    numeric: false,
    disablePadding: false,
    label: "Lot",
  },
  {
    id: "meter",
    numeric: true,
    disablePadding: false,
    label: "Metre",
  },
  {
    id: "kg",
    numeric: true,
    disablePadding: false,
    label: "Kg",
  },
  {
    id: "yon",
    numeric: false,
    disablePadding: false,
    label: "Yon",
  },
  {
    id: "qualityNote",
    numeric: false,
    disablePadding: false,
    label: "Kalite Notu",
  },

  {
    id: "dyeType",
    numeric: false,
    disablePadding: false,
    label: "Boya Tipi",
  },
  {
    id: "shelf",
    numeric: false,
    disablePadding: false,
    label: "Raf",
  },
  {
    id: "barcode",
    numeric: false,
    disablePadding: false,
    label: "Barkod",
  },
];

export const title = "Malzemeler";
