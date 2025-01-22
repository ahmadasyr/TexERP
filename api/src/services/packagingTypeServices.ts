import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPackagingTypes = async () => {
  return prisma.packagingType.findMany();
};

export const getPackagingTypeById = async (id: number) => {
  return prisma.packagingType.findUnique({
    where: {
      id,
    },
  });
};

export const createPackagingType = async (data: { name: string }) => {
  return prisma.packagingType.create({
    data: {
      name: data.name,
    },
  });
};

export const updatePackagingType = async (
  id: number,
  data: {
    name: string;
  }
) => {
  return prisma.packagingType.update({
    where: {
      id,
    },
    data: {
      name: data.name,
    },
  });
};

export const deletePackagingType = async (id: number) => {
  return prisma.packagingType.delete({
    where: {
      id,
    },
  });
};
