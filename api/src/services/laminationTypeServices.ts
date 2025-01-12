import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLaminationType = async (data: { name: string }) => {
  // return await prisma.laminationType.create({
  //   data: {
  //     name: data.name,
  //   },
  // });
  return 0;
};

export const getLaminationTypeById = async (id: number) => {
  // return await prisma.laminationType.findUnique({
  //   where: { id },
  // });
  return 0;
};

export const getAllLaminationTypes = async () => {
  // return await prisma.laminationType.findMany();
  return 0;
};

export const updateLaminationType = async (
  id: number,
  data: { name: string }
) => {
  // return await prisma.laminationType.update({
  //   where: { id },
  //   data: { name: data.name },
  // });
  return 0;
};

export const deleteLaminationType = async (id: number) => {
  // return await prisma.laminationType.delete({
  //   where: { id },
  // });
  return 0;
};
