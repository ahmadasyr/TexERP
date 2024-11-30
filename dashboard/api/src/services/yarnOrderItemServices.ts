import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createYarnOrderItem = async (data: {
  yarnOrderId: number;
  yarnTypeId: number;
  kg: number;
  price: number;
  currencyId: number;
  personnelId: number;
}) => {
  return await prisma.yarnOrderItem.create({
    data: {
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
  }
) => {
  return await prisma.yarnOrderItem.update({
    where: { id },
    data: {
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
