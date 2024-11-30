import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProductGroup = async (name: string) => {
  return await prisma.productGroup.create({
    data: {
      name,
    },
  });
};

export const getProductGroupById = async (id: number) => {
  return await prisma.productGroup.findUnique({
    where: { id },
    include: { product: true },
  });
};

export const getAllProductGroups = async () => {
  return await prisma.productGroup.findMany({
    include: { product: true },
  });
};

export const updateProductGroup = async (id: number, name: string) => {
  return await prisma.productGroup.update({
    where: { id },
    data: { name },
  });
};

export const deleteProductGroup = async (id: number) => {
  return await prisma.productGroup.delete({
    where: { id },
  });
};
