import { PrismaClient, unit } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (data: {
  accountId: number;
  type: string;
  description: string;
  personnelId: number;
  orderItem: {
    productId: number;
    dyeColorId: number;
    itemTypeId: number;
    laminationColorId: number;
    lot: string;
    quantity: number;
    unit: unit;
    description: string;
    personnelId: number;
  }[];
}) => {
  return await prisma.order.create({
    data: {
      type: data.type,
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
      orderItem: {
        createMany: {
          data: data.orderItem.map((item) => ({
            productId: item.productId,
            dyeColorId: item.dyeColorId,
            itemTypeId: item.itemTypeId,
            laminationColorId: item.laminationColorId,
            lot: item.lot,
            quantity: item.quantity,
            unit: item.unit,
            description: item.description,
            personnelId: item.personnelId,
          })),
        },
      },
    },
  });
};

export const getOrder = async (id: number) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      account: true,
      personnel: true,
      orderItem: true,
    },
  });
};

export const getOrders = async () => {
  return await prisma.order.findMany({
    include: {
      account: true,
      personnel: true,
    },
  });
};

export const updateOrder = async (
  id: number,
  data: {
    accountId: number;
    type: string;
    description: string;
    personnelId: number;
    closed: boolean;
    orderItem: {
      id: number;
      productId: number;
      dyeColorId: number;
      itemTypeId: number;
      laminationColorId: number;
      lot: string;
      quantity: number;
      unit: unit;
      description: string;
      personnelId: number;
    }[];
  }
) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data: {
      type: data.type,
      description: data.description,
      closed: data.closed,
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
      orderItem: {
        deleteMany: {
          id: {
            notIn: data.orderItem.map((item) => item.id),
          },
        },
        upsert: data.orderItem.map((item) => {
          return {
            where: { id: item.id },
            update: {
              productId: item.productId,
              dyeColorId: item.dyeColorId,
              itemTypeId: item.itemTypeId,
              laminationColorId: item.laminationColorId,
              lot: item.lot,
              quantity: item.quantity,
              unit: item.unit,
              description: item.description,
              personnelId: item.personnelId,
            },
            create: {
              productId: item.productId,
              dyeColorId: item.dyeColorId,
              itemTypeId: item.itemTypeId,
              laminationColorId: item.laminationColorId,
              lot: item.lot,
              quantity: item.quantity,
              unit: item.unit,
              description: item.description,
              personnelId: item.personnelId,
            },
          };
        }),
      },
    },
  });
};

export const deleteOrder = async (id: number) => {
  await prisma.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });

  return await prisma.order.delete({
    where: {
      id,
    },
  });
};
