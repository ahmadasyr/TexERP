import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subtractStock = async (data: {
  yarnStockEntryId: number;
  sentKg: number;
  sentCount: number;
}) => {
  const stock: any = await prisma.yarnStockEntry.findUnique({
    where: { id: data.yarnStockEntryId },
  });

  if (stock.entryKg < data.sentKg || stock.entryCount < data.sentCount) {
    throw new Error("Insufficient stock to fulfill the order.");
  }

  const updatedStock = await prisma.yarnStockEntry.update({
    where: { id: data.yarnStockEntryId },
    data: {
      entryKg: stock.entryKg - data.sentKg,
      entryCount: stock.entryCount - data.sentCount,
    },
  });

  return updatedStock;
};

export const createYarnOrderShipmentSent = async (data: {
  yarnOrderShipmentId: number;
  yarnOrderItemId: number;
  yarnStockEntryId: number;
  sentKg: number;
  sentCount: number;
  personnelId: number;
}) => {
  subtractStock({
    yarnStockEntryId: data.yarnStockEntryId,
    sentKg: data.sentKg,
    sentCount: data.sentCount,
  });

  return await prisma.yarnOrderShipmentSent.create({
    data: {
      sentKg: data.sentKg,
      sentCount: data.sentCount,
      yarnOrderShipment: { connect: { id: data.yarnOrderShipmentId } },
      yarnOrderItem: { connect: { id: data.yarnOrderItemId } },
      yarnStockEntry: { connect: { id: data.yarnStockEntryId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const getYarnOrderShipmentSent = async (id: number) => {
  return await prisma.yarnOrderShipmentSent.findUnique({
    where: { id },
  });
};

export const getAllYarnOrderShipmentSent = async () => {
  return await prisma.yarnOrderShipmentSent.findMany({
    include: {
      yarnOrderShipment: true,
      yarnOrderItem: true,
      yarnStockEntry: true,
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

export const updateYarnOrderShipmentSent = async (data: {
  id: number;
  yarnOrderShipmentId: number;
  yarnOrderItemId: number;
  yarnStockEntryId: number;
  sentKg: number;
  sentCount: number;
  personnelId: number;
}) => {
  return await prisma.yarnOrderShipmentSent.update({
    where: { id: data.id },
    data: {
      sentKg: data.sentKg,
      sentCount: data.sentCount,
      yarnOrderShipment: { connect: { id: data.yarnOrderShipmentId } },
      yarnOrderItem: { connect: { id: data.yarnOrderItemId } },
      yarnStockEntry: { connect: { id: data.yarnStockEntryId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const deleteYarnOrderShipmentSent = async (id: number) => {
  return await prisma.yarnOrderShipmentSent.delete({
    where: { id },
  });
};
