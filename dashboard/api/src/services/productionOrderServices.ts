import { machineStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProductionOrders = async () => {
  return await prisma.productionOrder.findMany({
    include: {
      machine: true,
      product: true,
      personnel: true,
      wraps: true,
      productionOrderWrap: true,
      cutStock: true,
    },
  });
};

export const getProductionOrderById = async (id: number) => {
  return await prisma.productionOrder.findUnique({
    where: { id },
    include: {
      machine: true,
      product: true,
      personnel: true,
      wraps: true,
      productionOrderWrap: true,
      cutStock: true,
    },
  });
};

export const createProductionOrder = async (data: {
  startDate?: Date;
  machineId: number;
  status: machineStatus;
  productId: number;
  lot: string;
  meter: number;
  personnelId: number;
  note?: string;
}) => {
  return await prisma.productionOrder.create({
    data: {
      startDate: data.startDate,
      machine: { connect: { id: data.machineId } },
      status: data.status,
      product: { connect: { id: data.productId } },
      lot: data.lot,
      meter: data.meter,
      personnel: { connect: { id: data.personnelId } },
      note: data.note,
    },
  });
};

export const updateProductionOrder = async (
  id: number,
  data: Partial<{
    startDate?: Date;
    machineId: number;
    status: machineStatus;
    productId: number;
    lot: string;
    meter: number;
    personnelId: number;
    note?: string;
  }>
) => {
  return await prisma.productionOrder.update({
    where: { id },
    data: {
      startDate: data.startDate,
      machine: { connect: { id: data.machineId } },
      status: data.status,
      product: { connect: { id: data.productId } },
      lot: data.lot,
      meter: data.meter,
      personnel: { connect: { id: data.personnelId } },
      note: data.note,
    },
  });
};

export const deleteProductionOrder = async (id: number) => {
  return await prisma.productionOrder.delete({
    where: { id },
  });
};
