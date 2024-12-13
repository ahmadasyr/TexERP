import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createShippingCar = async (data: {
  shippingCompanyId: number;
  plate: string;
}) => {
  return await prisma.shippingCar.create({
    data: {
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      plate: data.plate,
    },
  });
};

export const getShippingCarById = async (id: number) => {
  return await prisma.shippingCar.findUnique({
    where: { id },
  });
};

export const getAllShippingCars = async () => {
  return await prisma.shippingCar.findMany();
};

export const updateShippingCar = async (
  id: number,
  data: { shippingCompanyId?: number; plate?: string }
) => {
  return await prisma.shippingCar.update({
    where: { id },
    data: {
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      plate: data.plate,
    },
  });
};

export const deleteShippingCar = async (id: number) => {
  return await prisma.shippingCar.delete({
    where: { id },
  });
};
