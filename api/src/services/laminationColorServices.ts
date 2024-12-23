import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLaminationColor = async (data: { name: string }) => {
  return await prisma.laminationColor.create({
    data: {
      name: data.name,
    },
  });
};

export const getLaminationColorById = async (id: number) => {
  return await prisma.laminationColor.findUnique({
    where: { id },
  });
};

export const getAllLaminationColors = async () => {
  return await prisma.laminationColor.findMany();
};

export const updateLaminationColor = async (
  id: number,
  data: { name: string }
) => {
  return await prisma.laminationColor.update({
    where: { id },
    data: { name: data.name },
  });
};

export const deleteLaminationColor = async (id: number) => {
  return await prisma.laminationColor.delete({
    where: { id },
  });
};
