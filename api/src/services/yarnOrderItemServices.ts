import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient();

export const createYarnOrderItem = async (data: {
  yarnOrderId: number;
  yarnTypeId: number;
  kg: number;
  price: number;
  currencyId: number;
  personnelId: number;
  lot: string;
}) => {
  return await prisma.yarnOrderItem.create({
    data: {
      lot: data.lot,
      yarnOrder: {
        connect: {
          id: data.yarnOrderId,
        },
      },
      yarnType: {
        connect: {
          id: data.yarnTypeId,
        },
      },
      kg: data.kg,
      price: data.price,
      currency: {
        connect: {
          id: data.currencyId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
    },
  });
};

export const getYarnOrderItems = async () => {
  return await prisma.yarnOrderItem.findMany({
    include: {
      yarnOrder: true,
      yarnType: true,
      currency: true,
      personnel: true,
      yarnOrderShipmentItem: true,
    },
  });
};

export const getYarnOrderItemById = async (id: number) => {
  return await prisma.yarnOrderItem.findUnique({
    where: { id },
    include: {
      yarnOrder: true,
      yarnType: true,
      currency: true,
      personnel: true,
      yarnOrderShipmentItem: true,
    },
  });
};

export const updateYarnOrderItem = async (
  id: number,
  data: {
    yarnOrderId?: number;
    yarnTypeId?: number;
    kg?: number;
    price?: number;
    currencyId?: number;
    personnelId?: number;
    lot?: string;
  }
) => {
  return await prisma.yarnOrderItem.update({
    where: { id },
    data: {
      lot: data.lot,
      yarnOrder: {
        connect: {
          id: data.yarnOrderId,
        },
      },
      yarnType: {
        connect: {
          id: data.yarnTypeId,
        },
      },
      kg: data.kg,
      price: data.price,
      currency: {
        connect: {
          id: data.currencyId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
    },
  });
};

export const deleteYarnOrderItem = async (id: number) => {
  return await prisma.yarnOrderItem.delete({
    where: { id },
  });
};
