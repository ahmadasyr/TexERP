import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMaterialCategory = async (data: {
  name: string;
  parentCategoryId?: number;
}) => {
  return await prisma.materialCategory.create({
    data: {
      name: data.name,
      parentCategory: data.parentCategoryId
        ? { connect: { id: data.parentCategoryId } }
        : undefined,
    },
  });
};

export const getMaterialCategoryById = async (id: number) => {
  return await prisma.materialCategory.findUnique({
    where: { id },
    include: {
      parentCategory: true,
    },
  });
};

export const getAllMaterialCategories = async () => {
  const categories = await prisma.materialCategory.findMany({
    include: {
      parentCategory: true,
    },
  });

  // Add the pCategory column
  return categories.map((category) => ({
    ...category,
    pCategory: category.parentCategory?.name || null, // Add parentCategory name or null if it doesn't exist
  }));
};

export const updateMaterialCategory = async (
  id: number,
  data: { name: string; parentCategoryId?: number }
) => {
  return await prisma.materialCategory.update({
    where: { id },
    data: {
      name: data.name,
      parentCategory: data.parentCategoryId
        ? { connect: { id: data.parentCategoryId } }
        : undefined,
    },
  });
};

export const deleteMaterialCategory = async (id: number) => {
  return await prisma.materialCategory.delete({
    where: { id },
  });
};
