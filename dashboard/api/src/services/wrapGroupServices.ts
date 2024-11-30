import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createWrapGroup = async (name: string) => {
  return await prisma.wrapGroup.create({
    data: {
      name,
    },
  });
};

export const getWrapGroupById = async (id: number) => {
  return await prisma.wrapGroup.findUnique({
    where: { id },
    include: { wrapType: true },
  });
};

export const getAllWrapGroups = async () => {
  return await prisma.wrapGroup.findMany({
    include: { wrapType: true },
  });
};

export const updateWrapGroup = async (id: number, name: string) => {
  return await prisma.wrapGroup.update({
    where: { id },
    data: { name },
  });
};

export const deleteWrapGroup = async (id: number) => {
  return await prisma.wrapGroup.delete({
    where: { id },
  });
};
