import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createItemType = async (data: { name: string }) => {
  return await prisma.itemType.create({
    data: {
      name: data.name,
    },
  });
};

export const getItemTypeById = async (id: number) => {
  return await prisma.itemType.findUnique({
    where: { id },
  });
};

export const getAllItemTypes = async () => {
  return await prisma.itemType.findMany();
};

export const updateItemType = async (id: number, data: { name: string }) => {
  return await prisma.itemType.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteItemType = async (id: number) => {
  return await prisma.itemType.delete({
    where: { id },
  });
};
