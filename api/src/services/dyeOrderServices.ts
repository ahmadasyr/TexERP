import { PrismaClient, stockStatus, unit } from "@prisma/client";

const prisma = new PrismaClient();

export const createDyeOrder = async (data: {
  supplierId: number;
  productId: number;
  stockStatus: stockStatus;
  personnelId: number;
  dyeOrderItem: {
    dyeColorId: number;
    dyeTypeId: number;
    lot: string;
    yon?: boolean;
    unit: unit;
    quantity: number;
    kazanNo: string;
    note?: string;
    personnelId: number;
  }[];
}) => {
  const dyeOrder = await prisma.dyeOrder.create({
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      product: {
        connect: {
          id: data.productId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      dyeOrderItem: {
        create: data.dyeOrderItem.map((item) => ({
          dyeColor: {
            connect: {
              id: item.dyeColorId,
            },
          },
          dyeType: {
            connect: {
              id: item.dyeTypeId,
            },
          },
          lot: item.lot,
          yon: item.yon,
          unit: item.unit,
          quantity: item.quantity,
          kazanNo: item.kazanNo,
          note: item.note,
          personnel: {
            connect: {
              id: item.personnelId,
            },
          },
        })),
      },
    },
  });
  return dyeOrder;
};

export const fetchHighestKazanNo = async () => {
  const dyeOrderItem = await prisma.dyeOrderItem.findFirst({
    orderBy: {
      kazanNo: "desc",
    },
  });

  return dyeOrderItem ? dyeOrderItem.kazanNo : null;
};

export const updateDyeOrder = async (
  id: number,
  data: {
    supplierId: number;
    productId: number;
    stockStatus: stockStatus;
    personnelId: number;
    dyeOrderItem: {
      id?: number;
      dyeColorId: number;
      dyeTypeId: number;
      lot: string;
      yon?: boolean;
      unit: unit;
      quantity: number;
      kazanNo: string;
      note?: string;
      personnelId: number;
    }[];
  }
) => {
  const dyeOrder = await prisma.dyeOrder.update({
    where: {
      id,
    },
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      product: {
        connect: {
          id: data.productId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      dyeOrderItem: {
        deleteMany: {
          id: {
            notIn: data.dyeOrderItem
              .map((item) => item.id)
              .filter((id): id is number => id !== undefined),
          },
        },
        upsert: data.dyeOrderItem.map((item) => ({
          where: {
            id: item.id,
          },
          update: {
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            dyeType: {
              connect: {
                id: item.dyeTypeId,
              },
            },
            lot: item.lot,
            yon: item.yon,
            unit: item.unit,
            quantity: item.quantity,
            kazanNo: item.kazanNo,
            note: item.note,
            personnel: {
              connect: {
                id: item.personnelId,
              },
            },
          },
          create: {
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            dyeType: {
              connect: {
                id: item.dyeTypeId,
              },
            },
            lot: item.lot,
            yon: item.yon,
            unit: item.unit,
            quantity: item.quantity,
            kazanNo: item.kazanNo,
            note: item.note,
            personnel: {
              connect: {
                id: item.personnelId,
              },
            },
          },
        })),
      },
    },
  });
  return dyeOrder;
};

export const deleteDyeOrder = async (id: number) => {
  const dyeOrder = await prisma.dyeOrder.delete({
    where: {
      id,
    },
  });
  return dyeOrder;
};

export const fetchDyeOrder = async (id: number) => {
  const dyeOrder = await prisma.dyeOrder.findUnique({
    where: {
      id,
    },
    include: {
      supplier: true,
      product: true,
      personnel: true,
      dyeOrderItem: {
        include: {
          dyeColor: true,
          dyeType: true,
          personnel: true,
          dyeShipmentItem: true,
          dyeConfirmation: true,
        },
      },
    },
  });
  return {
    ...dyeOrder,
    dyeOrderItem:
      dyeOrder?.dyeOrderItem &&
      dyeOrder.dyeOrderItem.map((item) => ({
        ...item,
        sentKg: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.kg,
          0
        ),
        sentMeter: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.meter,
          0
        ),
        sentCount: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.count,
          0
        ),
        remainingKg:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.kg,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.kg,
            0
          ),
        remainingMeter:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.meter,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.meter,
            0
          ),
        remainingCount:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.count,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.count,
            0
          ),
      })),
  };
};

export const fetchDyeOrders = async () => {
  const dyeOrders = await prisma.dyeOrder.findMany({
    include: {
      supplier: true,
      product: true,
      personnel: true,
      dyeOrderItem: {
        include: {
          dyeColor: true,
          dyeType: true,
          personnel: true,
        },
      },
    },
  });
  return dyeOrders;
};

export const changeDyeOrderStatus = async (id: number, closed: boolean) => {
  const dyeOrder = await prisma.dyeOrder.update({
    where: {
      id,
    },
    data: {
      closed,
    },
  });
  return dyeOrder;
};
export const getOrderByShipment = async (id: number) => {
  const order = await prisma.dyeOrder.findFirst({
    where: {
      dyeShipment: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      product: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
    },
  });
  return order;
};
