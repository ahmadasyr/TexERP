import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMachines = async () => {
  return await prisma.machine.findMany({
    include: {
      machineType: true,
      wrapOrder: true,
      productionOrder: true,
    },
  });
};

export const getMachineById = async (id: number) => {
  return await prisma.machine.findUnique({
    where: { id },
    include: {
      machineType: true,
      wrapOrder: true,
      productionOrder: true,
    },
  });
};

export const createMachine = async (data: {
  name: string;
  machineTypeId: number;
}) => {
  return await prisma.machine.create({
    data: {
      name: data.name,
      machineType: { connect: { id: data.machineTypeId } },
    },
  });
};

export const updateMachine = async (
  id: number,
  data: { name?: string; machineTypeId?: number }
) => {
  return await prisma.machine.update({
    where: { id },
    data: {
      name: data.name,
      machineType: { connect: { id: data.machineTypeId } },
    },
  });
};

export const deleteMachine = async (id: number) => {
  return await prisma.machine.delete({
    where: { id },
  });
};
