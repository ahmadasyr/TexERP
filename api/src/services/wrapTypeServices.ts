import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWrapTypes = async () => {
  return await prisma.wrapType.findMany();
};

export const getWrapTypeById = async (id: number) => {
  return await prisma.wrapType.findUnique({
    where: { id },
  });
};

export const createWrapType = async (data: {
  name: string;
  wrapGroupId?: number;
  stringCount: number;
  en: number;
}) => {
  return await prisma.wrapType.create({
    data,
  });
};

export const updateWrapType = async (
  id: number,
  data: {
    name?: string;
    wrapGroupId?: number;
    stringCount?: number;
    en?: number;
  }
) => {
  return await prisma.wrapType.update({
    where: { id },
    data,
  });
};

export const deleteWrapType = async (id: number) => {
  return await prisma.wrapType.delete({
    where: { id },
  });
};
