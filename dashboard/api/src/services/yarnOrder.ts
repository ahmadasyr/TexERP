import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createYarnOrder = async (data: {
  accountId: number;
  sale: boolean;
  description: string;
  personnelId: number;
  yarnOrderItem: {
    id: number;
    yarnTypeId: number;
    kg: number;
    price: number;
    currencyId: number;
    personnelId: number;
  }[];
}) => {
  return await prisma.yarnOrder.create({
    data: {
      sale: data.sale,
      description: data.description,
      account: {
        connect: {
          id: data.accountId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      yarnOrderItem: {
        createMany: {
          data: data.yarnOrderItem.map((item) => ({
            id: item.id,
            yarnTypeId: item.yarnTypeId,
            kg: item.kg,
            price: item.price,
            currencyId: item.currencyId,
            personnelId: item.personnelId,
          })),
        },
      },
    },
  });
};

export const getYarnOrderById = async (id: number) => {
  return await prisma.yarnOrder.findUnique({
    where: { id },
    include: {
      yarnOrderItem: true,
      yarnOrderShipment: true,
    },
  });
};

export const getOngoingYarnOrders = async () => {
  return await prisma.yarnOrder.findMany({
    where: {
      closed: false,
    },
    include: {
      yarnOrderItem: true,
      yarnOrderShipment: true,
      account: true,
    },
  });
};

export const updateYarnOrder = async (
  id: number,
  data: {
    accountId: number;
    sale: boolean;
    description: string;
    personnelId: number;
    yarnOrderItem: {
      id: number;
      yarnTypeId: number;
      kg: number;
      price: number;
      currencyId: number;
      personnelId: number;
    }[];
  }
) => {
  return await prisma.yarnOrder.update({
    where: { id },
    data: {
      sale: data.sale,
      description: data.description,
      account: {
        connect: {
          id: data.accountId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      yarnOrderItem: {
        deleteMany: {
          id: {
            notIn: data.yarnOrderItem.map((item) => item.id),
          },
        },
        upsert: data.yarnOrderItem.map((item) => {
          return {
            where: { id: item.id },
            update: item,
            create: item,
          };
        }),
      },
    },
  });
};

export const deleteYarnOrder = async (id: number) => {
  const items = await prisma.yarnOrderItem.deleteMany({
    where: { yarnOrderId: id },
  });
  return await prisma.yarnOrder.delete({
    where: { id },
  });
};

export const getAllYarnOrders = async () => {
  return await prisma.yarnOrder.findMany({
    include: {
      yarnOrderItem: true,
      yarnOrderShipment: true,
      personnel: true,
      account: true,
    },
  });
};

export const closeYarnOrder = async (id: number) => {
  const order = await prisma.yarnOrder.findUnique({
    where: { id },
  });

  if (!order) {
    throw new Error(`Yarn order with id ${id} not found`);
  }

  return await prisma.yarnOrder.update({
    where: { id },
    data: {
      closed: order.closed ? false : true,
    },
  });
};

export const getYarnOrdersBySale = async (sale: boolean) => {
  return await prisma.yarnOrder.findMany({
    where: {
      sale,
    },
    include: {
      yarnOrderItem: true,
      yarnOrderShipment: true,
      personnel: true,
      account: true,
    },
  });
};
