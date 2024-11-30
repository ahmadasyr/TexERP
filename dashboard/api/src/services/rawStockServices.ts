import { PrismaClient, stockStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createRawStock = async (data: {
  barcode: string;
  productId: number;
  yon: boolean;
  lot: string;
  rawQualityControlStockId: number;
  status: stockStatus;
  counted?: boolean;
  countDate?: Date;
  meter: number;
  kg: number;
  quality: number;
  qualityNote?: string;
  shelf?: string;
  personnelId: number;
}) => {
  return await prisma.rawStock.create({
    data: {
      barcode: data.barcode,
      product: { connect: { id: data.productId } },
      yon: data.yon,
      lot: data.lot,
      rawQualityControlStock: {
        connect: { id: data.rawQualityControlStockId },
      },
      status: data.status,
      counted: data.counted,
      countDate: data.countDate,
      meter: data.meter,
      kg: data.kg,
      quality: data.quality,
      qualityNote: data.qualityNote,
      shelf: data.shelf,
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const getRawStockById = async (id: number) => {
  return await prisma.rawStock.findUnique({
    where: { id },
  });
};

export const getAllRawStocks = async () => {
  return await prisma.rawStock.findMany();
};

export const updateRawStock = async (
  id: number,
  data: {
    barcode: string;
    productId: number;
    yon: boolean;
    lot: string;
    rawQualityControlStockId: number;
    status: stockStatus;
    counted?: boolean;
    countDate?: Date;
    meter: number;
    kg: number;
    quality: number;
    qualityNote?: string;
    shelf?: string;
  }
) => {
  return await prisma.rawStock.update({
    where: { id },
    data: {
      barcode: data.barcode,
      product: { connect: { id: data.productId } },
      yon: data.yon,
      lot: data.lot,
      rawQualityControlStock: {
        connect: { id: data.rawQualityControlStockId },
      },
      status: data.status,
      counted: data.counted,
      countDate: data.countDate,
      meter: data.meter,
      kg: data.kg,
      quality: data.quality,
      qualityNote: data.qualityNote,
      shelf: data.shelf,
    },
  });
};

export const deleteRawStock = async (id: number) => {
  return await prisma.rawStock.delete({
    where: { id },
  });
};
