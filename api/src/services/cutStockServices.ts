// model cutStock {
//   id                Int            @id @default(autoincrement())
//   createdAt         DateTime       @default(now())
//   productId         Int
//   lot               String
//   productionOrderId Int
//   meter             Float
//   kg                Float
//   status            cutStockStatus
//   exitDate          DateTime?
//   shelf             String?
//   counted           Boolean?
//   countDate         DateTime?

//   // Relations
//   product                product                  @relation(fields: [productId], references: [id])
//   productionOrder        productionOrder          @relation(fields: [productionOrderId], references: [id])
//   rawQualityControlStock rawQualityControlStock[]
// }
import { cutStockStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCutStock = async (data: {
  productId: number;
  lot: string;
  productionOrderId: number;
  meter: number;
  kg: number;
  status: cutStockStatus;
  exitDate?: Date;
  shelf?: string;
  counted?: boolean;
  countDate?: Date;
  personnelId: number;
}) => {
  return prisma.cutStock.create({
    data: {
      lot: data.lot,
      meter: data.meter,
      kg: data.kg,
      status: data.status,
      exitDate: data.exitDate,
      shelf: data.shelf,
      counted: data.counted,
      countDate: data.countDate,
      product: { connect: { id: data.productId } },
      productionOrder: { connect: { id: data.productionOrderId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const getCutStock = async (id: number) => {
  return prisma.cutStock.findUnique({
    where: { id },
    include: { product: true, productionOrder: true },
  });
};

export const getCutStocks = async () => {
  return prisma.cutStock.findMany({
    include: { product: true, productionOrder: true },
  });
};

export const updateCutStock = async (
  id: number,
  data: {
    lot?: string;
    meter?: number;
    kg?: number;
    status?: cutStockStatus;
    exitDate?: Date;
    shelf?: string;
    counted?: boolean;
    countDate?: Date;
  }
) => {
  return prisma.cutStock.update({
    where: { id },
    data: {
      lot: data.lot,
      meter: data.meter,
      kg: data.kg,
      status: data.status,
      exitDate: data.exitDate,
      shelf: data.shelf,
      counted: data.counted,
      countDate: data.countDate,
    },
  });
};

export const deleteCutStock = async (id: number) => {
  return prisma.cutStock.delete({ where: { id } });
};
