import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllYarnStockEntries = async () => {
  return await prisma.yarnStockEntry.findMany({
    include: {
      yarnType: true,
      yarnOrder: true,
      account: true,
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};

export const getYarnStockEntryById = async (id: number) => {
  return await prisma.yarnStockEntry.findUnique({
    where: { id },
    include: {
      yarnType: true,
      yarnOrder: true,
      account: true,
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};

export const createYarnStockEntry = async (data: {
  yarnTypeId: number;
  netKg: number;
  count: number;
  personnelId: number;
  yarnOrderId?: number;
  accountId?: number;
  lot: string;
  waybillNo: string;
}) => {
  return await prisma.yarnStockEntry.create({
    data: {
      yarnType: { connect: { id: data.yarnTypeId } },
      netKg: data.netKg,
      count: data.count,
      personnel: { connect: { id: data.personnelId } },
      yarnOrder: data.yarnOrderId
        ? { connect: { id: data.yarnOrderId } }
        : undefined,
      account: data.accountId ? { connect: { id: data.accountId } } : undefined,
      lot: data.lot,
      waybillNo: data.waybillNo,
      entryKg: data.netKg,
      entryCount: data.count,
    },
  });
};

export const updateYarnStockEntry = async (
  id: number,
  data: {
    netKg?: number;
    count?: number;
    yarnOrderId?: number;
    accountId?: number;
    lot: string;
    waybillNo: string;
  }
) => {
  return await prisma.yarnStockEntry.update({
    where: { id },
    data: {
      waybillNo: data.waybillNo,
      lot: data.lot,
      netKg: data.netKg,
      count: data.count,
      yarnOrder: data.yarnOrderId
        ? { connect: { id: data.yarnOrderId } }
        : undefined,
      account: data.accountId ? { connect: { id: data.accountId } } : undefined,
    },
  });
};

export const deleteYarnStockEntry = async (id: number) => {
  return await prisma.yarnStockEntry.delete({
    where: { id },
  });
};

export const getStockEntriesByYarnTypeId = async (yarnTypeId: number) => {
  return await prisma.yarnStockEntry.findMany({
    where: { yarnTypeId },
  });
};

export const submitMultipleYarnStockEntriesByYarnTypeId = async (
  data: {
    id: number;
    yarnTypeId: number;
    netKg: number;
    count: number;
    personnelId: number;
    yarnOrderId?: number;
    accountId?: number;
    lot: string;
    waybillNo: string;
  }[]
) => {
  return await prisma.yarnType.update({
    where: { id: data[0].yarnTypeId },
    data: {
      yarnStock: {
        upsert: data.map((entry) => {
          return {
            where: { id: entry.id },
            update: {
              netKg: entry.netKg,
              count: entry.count,
              personnel: { connect: { id: entry.personnelId } },
              yarnOrder: entry.yarnOrderId
                ? { connect: { id: entry.yarnOrderId } }
                : undefined,
              account: entry.accountId
                ? { connect: { id: entry.accountId } }
                : undefined,
              lot: entry.lot,
              waybillNo: entry.waybillNo,
            },
            create: {
              yarnType: { connect: { id: entry.yarnTypeId } },
              netKg: entry.netKg,
              count: entry.count,
              personnel: { connect: { id: entry.personnelId } },
              yarnOrder: entry.yarnOrderId
                ? { connect: { id: entry.yarnOrderId } }
                : undefined,
              account: entry.accountId
                ? { connect: { id: entry.accountId } }
                : undefined,
              lot: entry.lot,
              waybillNo: entry.waybillNo,
              entryKg: entry.netKg,
              entryCount: entry.count,
            },
          };
        }),
      },
    },
  });
};
