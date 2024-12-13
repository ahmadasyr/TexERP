import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createYarnOrderShipmentItem = async (data: {
  personnelId: number;
  yarnOrderShipmentId: number;
  yarnOrderItemId: number;
  sentKg: number;
  sentCount: number;
  lot: string;
}) => {
  return await prisma.yarnOrderShipmentItem.create({
    data: {
      personnel: { connect: { id: data.personnelId } },
      yarnOrderShipment: { connect: { id: data.yarnOrderShipmentId } },
      yarnOrderItem: { connect: { id: data.yarnOrderItemId } },
      sentKg: data.sentKg,
      sentCount: data.sentCount,
    },
  });
};

export const getYarnOrderShipmentItemById = async (id: number) => {
  return await prisma.yarnOrderShipmentItem.findUnique({
    where: { id },
  });
};

export const updateYarnOrderShipmentItem = async (
  id: number,
  data: {
    personnelId?: number;
    yarnOrderShipmentId?: number;
    yarnOrderItemId?: number;
    sentKg?: number;
    sentCount?: number;
    lot: string;
  }
) => {
  return await prisma.yarnOrderShipmentItem.update({
    where: { id },
    data: {
      personnel: data.personnelId
        ? { connect: { id: data.personnelId } }
        : undefined,
      yarnOrderShipment: data.yarnOrderShipmentId
        ? { connect: { id: data.yarnOrderShipmentId } }
        : undefined,
      yarnOrderItem: data.yarnOrderItemId
        ? { connect: { id: data.yarnOrderItemId } }
        : undefined,
      sentKg: data.sentKg,
      sentCount: data.sentCount,
    },
  });
};

export const deleteYarnOrderShipmentItem = async (id: number) => {
  return await prisma.yarnOrderShipmentItem.delete({
    where: { id },
  });
};
