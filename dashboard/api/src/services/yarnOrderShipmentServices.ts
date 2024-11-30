import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createYarnOrderShipment = async (data: {
  yarnOrderId: number;
  createdAt?: Date;
  sentDate: Date;
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
      sentDate: data.sentDate,
      closed: data.closed,
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      shippingCarrier: {
        connect: {
          id: data.shippingCarrierId,
        },
      },
      shippingCar: {
        connect: {
          id: data.shippingCarId,
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

export const getYarnOrderShipmentById = async (id: number) => {
  return await prisma.yarnOrderShipment.findUnique({
    where: { id },
    include: {
      yarnOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: true,
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
  }
) => {
  return await prisma.yarnOrderShipment.update({
    where: { id },
    data: {
      yarnOrder: {
        connect: {
          id: data.yarnOrderId,
        },
      },
      createdAt: data.createdAt,
      sentDate: data.sentDate,
      closed: data.closed,
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      shippingCarrier: {
        connect: {
          id: data.shippingCarrierId,
        },
      },
      shippingCar: {
        connect: {
          id: data.shippingCarId,
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

export const deleteYarnOrderShipment = async (id: number) => {
  return await prisma.yarnOrderShipment.delete({
    where: { id },
  });
};

export const listYarnOrderShipments = async () => {
  return await prisma.yarnOrderShipment.findMany({
    include: {
      yarnOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: true,
    },
  });
};

export const getAllYarnOrderShipments = async () => {
  return await prisma.yarnOrderShipment.findMany({
    include: {
      yarnOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      yarnOrderShipmentItem: true,
    },
  });
};
