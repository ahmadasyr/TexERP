import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getYarnStock = async () => {
  return await prisma.yarnStockEntry.findMany({
    include: {
      yarnType: true,
      warehouse: true,
      personnel: true,
    },
  });
};

export const createYarnStock = async (data: {
  yarnTypeId: number;
  lot: string;
  entryKg: number;
  entryCount: number;
  netKg: number;
  count: number;
  waybillNo?: string;
  personnelId: number;
  yarnOrderId?: number;
  warehouseId?: number;
}) => {
  return await prisma.yarnStockEntry.create({
    data: {
      lot: data.lot,
      entryKg: data.entryKg,
      entryCount: data.entryCount,
      netKg: data.entryKg,
      count: data.entryCount,
      waybillNo: data.waybillNo,
      yarnType: { connect: { id: data.yarnTypeId } },
      personnel: { connect: { id: data.personnelId } },
      warehouse: data.warehouseId
        ? { connect: { id: data.warehouseId } }
        : undefined,
    },
  });
};

export const updateYarnStock = async (
  id: number,
  data: {
    yarnTypeId: number;
    lot: string;
    entryKg: number;
    entryCount: number;
    netKg: number;
    count: number;
    waybillNo?: string;
    personnelId: number;
    yarnOrderId?: number;
    warehouseId?: number;
  }
) => {
  return await prisma.yarnStockEntry.update({
    where: { id },
    data: {
      lot: data.lot,
      entryKg: data.entryKg,
      entryCount: data.entryCount,
      netKg: data.netKg,
      count: data.count,
      waybillNo: data.waybillNo,
      yarnType: { connect: { id: data.yarnTypeId } },
      personnel: { connect: { id: data.personnelId } },
      warehouse: data.warehouseId
        ? { connect: { id: data.warehouseId } }
        : undefined,
    },
  });
};

export const getYarnStockById = async (id: number) => {
  return await prisma.yarnStockEntry.findUnique({
    where: { id },
    include: {
      yarnType: true,
      warehouse: true,
      personnel: true,
    },
  });
};

export const deleteYarnStock = async (id: number) => {
  return await prisma.yarnStockEntry.delete({ where: { id } });
};
