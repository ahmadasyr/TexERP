import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDyeColor = async (data: { name: string }) => {
  return await prisma.dyeColor.create({
    data: {
      name: data.name,
    },
  });
};

export const getDyeColorById = async (id: number) => {
  return await prisma.dyeColor.findUnique({
    where: { id },
  });
};

export const getAllDyeColors = async () => {
  return await prisma.dyeColor.findMany();
};

export const updateDyeColor = async (id: number, data: { name: string }) => {
  return await prisma.dyeColor.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteDyeColor = async (id: number) => {
  return await prisma.dyeColor.delete({
    where: { id },
  });
};
