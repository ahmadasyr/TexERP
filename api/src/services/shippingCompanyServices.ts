import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createShippingCompany = async (data: { name: string }) => {
  return await prisma.shippingCompany.create({
    data: {
      name: data.name,
    },
  });
};

export const getShippingCompanyById = async (id: number) => {
  return await prisma.shippingCompany.findUnique({
    where: { id },
    include: {
      shippingCarrier: true,
      shippingCar: true,
      orderShipment: true,
      yarnOrderShipment: true,
    },
  });
};

export const getAllShippingCompanies = async () => {
  return await prisma.shippingCompany.findMany({
    include: {
      shippingCarrier: true,
      shippingCar: true,
      orderShipment: true,
      yarnOrderShipment: true,
    },
  });
};

export const updateShippingCompany = async (
  id: number,
  data: { name?: string }
) => {
  return await prisma.shippingCompany.update({
    where: { id },
    data,
  });
};

export const deleteShippingCompany = async (id: number) => {
  return await prisma.shippingCompany.delete({
    where: { id },
  });
};
