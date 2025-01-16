import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProductTypes = async () => {
  return await prisma.productType.findMany();
};

export const getProductTypeById = async (id: number) => {
  return await prisma.productType.findUnique({
    where: { id },
  });
};

export const createProductType = async (data: {
  name: string;
  needsCutting: boolean;
  specsGroup: string[];
}) => {
  return await prisma.productType.create({
    data: {
      name: data.name,
      needsCutting: data.needsCutting,
      specsGroup: data.specsGroup,
    },
  });
};

export const updateProductType = async (
  id: number,
  data: {
    name: string;
    needsCutting: boolean;
    specsGroup: string[];
  }
) => {
  return await prisma.productType.update({
    where: { id },
    data: {
      name: data.name,
      needsCutting: data.needsCutting,
      specsGroup: data.specsGroup,
    },
  });
};

export const deleteProductType = async (id: number) => {
  return await prisma.productType.delete({
    where: { id },
  });
};
