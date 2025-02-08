import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDyeType = async (data: { name: string }) => {
  return await prisma.dyeType.create({
    data: {
      name: data.name,
    },
  });
};

export const getDyeTypeById = async (id: number) => {
  return await prisma.dyeType.findUnique({
    where: { id },
  });
};

export const getAllDyeTypes = async () => {
  return await prisma.dyeType.findMany();
};

export const updateDyeType = async (id: number, data: { name: string }) => {
  return await prisma.dyeType.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteDyeType = async (id: number) => {
  return await prisma.dyeType.delete({
    where: { id },
  });
};
