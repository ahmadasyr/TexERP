import { PrismaClient, wrapStockStatus } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const getWrapStockById = async (id: number) => {
  return await prisma.wrapStock.findUnique({
    where: { id },
    include: {
      wrapOrder: true,
      productionOrder: true,
      productionOrderWrap: true,
    },
  });
};

export const createWrapStock = async (data: {
  wrapOrderId: number;
  meter: number;
  exitDate?: Date;
  productionOrderId?: number;
  loopCount: number;
  status: wrapStockStatus;
  personnelId: number;
}) => {
  return await prisma.wrapStock.create({
    data: {
      meter: data.meter,
      exitDate: data.exitDate,
      loopCount: data.loopCount,
      status: data.status,
      productionOrder: { connect: { id: data.productionOrderId } },
      wrapOrder: { connect: { id: data.wrapOrderId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const updateWrapStock = async (
  id: number,
  data: Partial<{
    wrapOrderId: number;
    meter: number;
    exitDate?: Date;
    productionOrderId?: number;
    loopCount: number;
    status: wrapStockStatus;
  }>
) => {
  return await prisma.wrapStock.update({
    where: { id },
    data: {
      meter: data.meter,
      exitDate: data.exitDate,
      loopCount: data.loopCount,
      status: data.status,
      productionOrder: { connect: { id: data.productionOrderId } },
      wrapOrder: { connect: { id: data.wrapOrderId } },
    },
  });
};

export const deleteWrapStock = async (id: number) => {
  return await prisma.wrapStock.delete({
    where: { id },
  });
};
