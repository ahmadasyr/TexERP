import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMachineTypes = async () => {
  return await prisma.machineType.findMany();
};

export const getMachineTypeById = async (id: number) => {
  return await prisma.machineType.findUnique({
    where: { id },
  });
};

export const createMachineType = async (name: string) => {
  return await prisma.machineType.create({
    data: { name },
  });
};

export const updateMachineType = async (id: number, name: string) => {
  return await prisma.machineType.update({
    where: { id },
    data: { name },
  });
};

export const deleteMachineType = async (id: number) => {
  return await prisma.machineType.delete({
    where: { id },
  });
};
