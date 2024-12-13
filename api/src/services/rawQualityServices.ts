import { cutStockStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllRawQualityControlStocks = async () => {
  return await prisma.rawQualityControlStock.findMany();
};

export const getRawQualityControlStockById = async (id: number) => {
  return await prisma.rawQualityControlStock.findUnique({
    where: { id },
  });
};

export const createRawQualityControlStock = async (data: {
  cutStockId: number;
  productId: number;
  lot: string;
  yon: boolean;
  meter: number;
  kg: number;
  shelf?: string;
  status: cutStockStatus;
  counted?: boolean;
  countDate?: Date;
  personnelId: number;
}) => {
  return await prisma.rawQualityControlStock.create({
    data: {
      cutStock: { connect: { id: data.cutStockId } },
      product: { connect: { id: data.productId } },
      lot: data.lot,
      yon: data.yon,
      meter: data.meter,
      kg: data.kg,
      shelf: data.shelf,
      status: data.status,
      counted: data.counted,
      countDate: data.countDate,
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const updateRawQualityControlStock = async (
  id: number,
  data: Partial<{
    cutStockId: number;
    productId: number;
    lot: string;
    yon: boolean;
    meter: number;
    kg: number;
    shelf?: string;
    status: cutStockStatus;
    counted?: boolean;
    countDate?: Date;
  }>
) => {
  return await prisma.rawQualityControlStock.update({
    where: { id },
    data: {
      cutStock: data.cutStockId
        ? { connect: { id: data.cutStockId } }
        : undefined,
      product: data.productId ? { connect: { id: data.productId } } : undefined,
      lot: data.lot,
      yon: data.yon,
      meter: data.meter,
      kg: data.kg,
      shelf: data.shelf,
      status: data.status,
      counted: data.counted,
      countDate: data.countDate,
    },
  });
};

export const deleteRawQualityControlStock = async (id: number) => {
  return await prisma.rawQualityControlStock.delete({
    where: { id },
  });
};
