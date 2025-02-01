// // model stock {
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

import { PrismaClient, stockStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const getStocks = async () => {
  return prisma.stock.findMany();
};

export const getStock = async (id: number) => {
  return prisma.stock.findUnique({
    where: {
      id,
    },
  });
};

export const getStocksByStatus = async (status: stockStatus) => {
  const stock = prisma.stock.findMany({
    where: {
      status,
    },
    include: {
      product: { select: { id: true, name: true } },
      personnel: { select: { id: true, firstName: true, lastName: true } },
      dyeColor: { select: { id: true, name: true } },
      dyeType: { select: { id: true, name: true } },
      laminationColor: { select: { id: true, name: true } },
      productionOrder: { select: { id: true, lot: true } },
      stockSpecifications: {
        select: {
          id: true,
          outsource: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
  return (await stock).map((s: any) => {
    return {
      ...s,
      dyeColor: s.dyeColor?.name ?? null,
      dyeType: s.dyeType?.name ?? null,
      laminationColor: s.laminationColor?.name ?? null,
      specs: s.stockSpecifications
        .map((spec: any) => spec.outsource?.name ?? null)
        .filter((name: string | null) => name !== null)
        .join(", "),
    };
  });
};

export const createStock = async (data: {
  productId: number;
  lot: string;
  meter: number;
  kg: number;
  yon: boolean;
  status: stockStatus;
  quality: number;
  qualityNote: string;
  dyeColorId: number;
  dyeTypeId: number;
  laminationColorId: number;
  productionOrderId: number;
  counted: boolean;
  countDate: Date;
  shelf: string;
  barcode: string;
  sold: boolean;
  kazanNo: string;
  note: string;
  personnelId: number;
}) => {
  return prisma.stock.create({
    data: {
      product: { connect: { id: data.productId } },
      lot: data.lot,
      meter: data.meter,
      kg: data.kg,
      yon: data.yon,
      status: data.status,
      quality: data.quality,
      qualityNote: data.qualityNote,
      dyeColor: { connect: { id: data.dyeColorId } },
      dyeType: { connect: { id: data.dyeTypeId } },
      laminationColor: { connect: { id: data.laminationColorId } },
      productionOrder: { connect: { id: data.productionOrderId } },
      counted: data.counted,
      countDate: data.countDate,
      shelf: data.shelf,
      barcode: data.barcode,
      sold: data.sold,
      kazanNo: data.kazanNo,
      note: data.note,
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const updateStock = async (
  id: number,
  data: {
    productId: number;
    lot: string;
    meter: number;
    kg: number;
    yon: boolean;
    status: stockStatus;
    quality: number;
    qualityNote: string;
    dyeColorId: number;
    dyeTypeId: number;
    laminationColorId: number;
    productionOrderId: number;
    counted: boolean;
    countDate: Date;
    shelf: string;
    barcode: string;
    sold: boolean;
    kazanNo: string;
    note: string;
    personnelId: number;
  }
) => {
  return prisma.stock.update({
    where: {
      id,
    },
    data: {
      product: { connect: { id: data.productId } },
      lot: data.lot,
      meter: data.meter,
      kg: data.kg,
      yon: data.yon,
      status: data.status,
      quality: data.quality,
      qualityNote: data.qualityNote,
      dyeColor: { connect: { id: data.dyeColorId } },
      dyeType: { connect: { id: data.dyeTypeId } },
      laminationColor: { connect: { id: data.laminationColorId } },
      productionOrder: { connect: { id: data.productionOrderId } },
      counted: data.counted,
      countDate: data.countDate,
      shelf: data.shelf,
      barcode: data.barcode,
      sold: data.sold,
      kazanNo: data.kazanNo,
      note: data.note,
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const deleteStock = async (id: number) => {
  return prisma.stock.delete({
    where: {
      id,
    },
  });
};

export const getStocksByIds = async (ids: number[]) => {
  const stock = await prisma.stock.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      product: { select: { id: true, name: true } },
      personnel: { select: { id: true, firstName: true, lastName: true } },
      dyeColor: { select: { id: true, name: true } },
      dyeType: { select: { id: true, name: true } },
      laminationColor: { select: { id: true, name: true } },
      productionOrder: {
        select: {
          id: true,
          lot: true,
          machine: {
            select: { id: true, name: true },
          },
        },
      },
      stockSpecifications: {
        select: {
          id: true,
          outsource: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
  return stock.map((s: any) => {
    return {
      ...s,
      machine: s.productionOrder?.machine?.name ?? null,
      product: s.product.name,
      productionOrder: s.productionOrder?.id ?? null,
      dyeColor: s.dyeColor?.name ?? null,
      dyeType: s.dyeType?.name ?? null,
      laminationColor: s.laminationColor?.name ?? null,
      specs: s.stockSpecifications
        .map((spec: any) => spec.outsource?.name ?? null)
        .filter((name: string | null) => name !== null)
        .join(", "),
    };
  });
};
