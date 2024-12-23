import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOutsourceType = async (data: { name: string }) => {
  return await prisma.outsourceType.create({
    data: {
      name: data.name,
    },
  });
};

export const getOutsourceTypeById = async (id: number) => {
  return await prisma.outsourceType.findUnique({
    where: { id },
  });
};

export const getAllOutsourceTypes = async () => {
  return await prisma.outsourceType.findMany();
};

export const updateOutsourceType = async (
  id: number,
  data: { name: string }
) => {
  return await prisma.outsourceType.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteOutsourceType = async (id: number) => {
  return await prisma.outsourceType.delete({
    where: { id },
  });
};
