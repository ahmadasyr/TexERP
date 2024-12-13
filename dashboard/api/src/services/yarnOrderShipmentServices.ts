import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createYarnOrderShipment = async (data: {
  yarnOrderId: number;
  createdAt?: Date;
  sentDate?: Date;
  closed?: boolean;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  personnelId: number;
}) => {
  return await prisma.yarnOrderShipment.create({
    data: {
      yarnOrder: {
        connect: {
          id: data.yarnOrderId,
        },
      },
      createdAt: data.createdAt,
      sentDate: data.sentDate || null,
      closed: data.closed,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
    },
  });
};

export const getYarnOrderShipmentById = async (id: number) => {
  return await prisma.yarnOrderShipment.findUnique({
    where: { id },
    include: {
      yarnOrder: {
        include: {
          account: true,
          yarnOrderItem: {
            include: {
              yarnType: true,
            },
          },
        },
      },
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: true,
      yarnOrderShipmentSent: {
        include: {
          yarnStockEntry: true,
        },
      },
    },
  });
};

export const updateYarnOrderShipment = async (
  id: number,
  data: {
    yarnOrderId?: number;
    createdAt?: Date;
    sentDate?: Date;
    closed?: boolean;
    shippingCompanyId?: number;
    shippingCarrierId?: number;
    shippingCarId?: number;
    personnelId?: number;
    yarnOrderShipmentItem: any[];
  }
) => {
  // Fetch existing items
  const existingItems = await prisma.yarnOrderShipmentItem.findMany({
    where: { yarnOrderShipmentId: id },
  });

  // Determine items to delete
  const itemsToDelete = existingItems.filter(
    (existingItem) =>
      !data.yarnOrderShipmentItem.some((item) => item.id === existingItem.id)
  );

  // Delete items that are not in the update data
  await prisma.yarnOrderShipmentItem.deleteMany({
    where: {
      id: { in: itemsToDelete.map((item) => item.id) },
    },
  });

  return await prisma.yarnOrderShipment.update({
    where: { id },
    data: {
      yarnOrder: data.yarnOrderId
        ? { connect: { id: data.yarnOrderId } }
        : undefined,
      createdAt: data.createdAt || undefined,
      sentDate: data.sentDate ? new Date(data.sentDate) : undefined,
      closed: data.closed || undefined,
      personnel: data.personnelId
        ? { connect: { id: data.personnelId } }
        : undefined,
      shippingCompany: data.shippingCompanyId
        ? { connect: { id: data.shippingCompanyId } }
        : undefined,
      shippingCarrier: data.shippingCarrierId
        ? { connect: { id: data.shippingCarrierId } }
        : undefined,
      shippingCar: data.shippingCarId
        ? { connect: { id: data.shippingCarId } }
        : undefined,
      yarnOrderShipmentItem: {
        upsert: data.yarnOrderShipmentItem.map((item) => ({
          where: { id: item.id || 0 },
          create: {
            personnelId: item.personnelId,
            yarnOrderItemId: item.yarnOrderItemId,
            sentKg: item.sentKg,
            sentCount: item.sentCount,
          },
          update: {
            personnelId: item.personnelId,
            yarnOrderItemId: item.yarnOrderItemId,
            sentKg: item.sentKg,
            sentCount: item.sentCount,
          },
        })),
      },
    },
  });
};

export const deleteYarnOrderShipment = async (id: number) => {
  return await prisma.yarnOrderShipment.delete({
    where: { id },
  });
};

export const getYarnOrderShipmentByOrder = async (yarnOrderId: number) => {
  return await prisma.yarnOrderShipment.findMany({
    where: {
      yarnOrderId,
    },
    include: {
      yarnOrder: {
        include: {
          account: true,
        },
      },
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: true,
      yarnOrderShipmentSent: true,
    },
  });
};

export const getAllYarnOrderShipments = async () => {
  return await prisma.yarnOrderShipment.findMany({
    include: {
      yarnOrder: {
        include: {
          account: true,
        },
      },
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: {
        include: {
          yarnOrderItem: {
            include: {
              yarnType: {
                include: {
                  yarnStock: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
