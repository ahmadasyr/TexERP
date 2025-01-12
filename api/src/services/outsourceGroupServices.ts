import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOutsourceGroup = async (data: { name: string }) => {
  return await prisma.outsourceGroup.create({
    data: {
      name: data.name,
    },
  });
};

export const getOutsourceGroupById = async (id: number) => {
  return await prisma.outsourceGroup.findUnique({
    where: { id },
  });
};

export const getAllOutsourceGroups = async () => {
  return await prisma.outsourceGroup.findMany();
};

export const updateOutsourceGroup = async (
  id: number,
  data: { name: string }
) => {
  return await prisma.outsourceGroup.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteOutsourceGroup = async (id: number) => {
  return await prisma.outsourceGroup.delete({
    where: { id },
  });
};
