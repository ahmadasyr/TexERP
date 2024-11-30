import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createYarnOrderShipmentSent = async (data: {
  yarnOrderShipmentId: number;
  yarnOrderItemId: number;
  yarnStockEntryId: number;
  sentKg: number;
  sentCount: number;
  personnelId: number;
}) => {
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
  return await prisma.yarnOrderShipmentSent.findMany();
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
