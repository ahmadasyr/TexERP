import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMaterialCategory = async (data: { name: string }) => {
  return await prisma.materialCategory.create({
    data: {
      name: data.name,
    },
  });
};

export const getMaterialCategoryById = async (id: number) => {
  return await prisma.materialCategory.findUnique({
    where: { id },
  });
};

export const getAllMaterialCategories = async () => {
  return await prisma.materialCategory.findMany();
};

export const updateMaterialCategory = async (
  id: number,
  data: { name: string }
) => {
  return await prisma.materialCategory.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteMaterialCategory = async (id: number) => {
  return await prisma.materialCategory.delete({
    where: { id },
  });
};
