import { machineStatus, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createWrapOrder = async (data: {
  wrapTypeId: number;
  yarnTypeId: number;
  yarnLot: string;
  wrapMeter: number;
  startDate: Date;
  machineId: number;
  status: machineStatus;
  personnelId: number;
  requiredKg: number;
}) => {
  return await prisma.wrapOrder.create({
    data: {
      yarnLot: data.yarnLot,
      wrapMeter: data.wrapMeter,
      startDate: data.startDate,
      status: data.status,
      requiredKg: data.requiredKg,
      wrapType: { connect: { id: data.wrapTypeId } },
      yarnType: { connect: { id: data.yarnTypeId } },
      machine: { connect: { id: data.machineId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const getWrapOrderById = async (id: number) => {
  return await prisma.wrapOrder.findUnique({
    where: { id },
    include: {
      wrapType: true,
      yarnType: true,
      machine: true,
      personnel: true,
      wrapStock: true,
    },
  });
};

export const getWrapOrders = async () => {
  return await prisma.wrapOrder.findMany({
    include: {
      wrapType: true,
      yarnType: true,
      machine: true,
      personnel: true,
      wrapStock: true,
    },
  });
};

export const updateWrapOrder = async (
  id: number,
  data: Partial<{
    wrapTypeId: number;
    yarnTypeId: number;
    yarnLot: string;
    wrapMeter: number;
    startDate: Date;
    machineId: number;
    status: machineStatus;
    personnelId: number;
    requiredKg: number;
  }>
) => {
  return await prisma.wrapOrder.update({
    where: { id },
    data: {
      wrapType: data.wrapTypeId
        ? { connect: { id: data.wrapTypeId } }
        : undefined,
      yarnType: data.yarnTypeId
        ? { connect: { id: data.yarnTypeId } }
        : undefined,
      yarnLot: data.yarnLot,
      wrapMeter: data.wrapMeter,
      startDate: data.startDate,
      machine: data.machineId ? { connect: { id: data.machineId } } : undefined,
      status: data.status as machineStatus,
      personnel: data.personnelId
        ? { connect: { id: data.personnelId } }
        : undefined,
      requiredKg: data.requiredKg,
    },
  });
};

export const deleteWrapOrder = async (id: number) => {
  return await prisma.wrapOrder.delete({
    where: { id },
  });
};
