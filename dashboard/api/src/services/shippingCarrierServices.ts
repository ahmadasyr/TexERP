import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createShippingCarrier = async (data: {
  shippingCompanyId: number;
  name: string;
  identityNo?: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
}) => {
  return await prisma.shippingCarrier.create({
    data: {
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      name: data.name,
      identityNo: data.identityNo || null,
      phone: data.phone || null,
      email: data.email || null,
      address: data.address || null,
      note: data.note || null,
    },
  });
};

export const getShippingCarrierById = async (id: number) => {
  return await prisma.shippingCarrier.findUnique({
    where: { id },
  });
};

export const getAllShippingCarriers = async () => {
  return await prisma.shippingCarrier.findMany();
};

export const updateShippingCarrier = async (
  id: number,
  data: {
    shippingCompanyId?: number;
    name?: string;
    identityNo?: string;
    phone?: string;
    email?: string;
    address?: string;
    note?: string;
  }
) => {
  return await prisma.shippingCarrier.update({
    where: { id },
    data: {
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      name: data.name,
      identityNo: data.identityNo || null,
      phone: data.phone || null,
      email: data.email || null,
      address: data.address || null,
      note: data.note || null,
    },
  });
};

export const deleteShippingCarrier = async (id: number) => {
  return await prisma.shippingCarrier.delete({
    where: { id },
  });
};
