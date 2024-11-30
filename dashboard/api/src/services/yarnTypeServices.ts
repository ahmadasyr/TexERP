import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllYarnTypes = async () => {
  return await prisma.yarnType.findMany({
    include: { personnel: true, currency: true },
  });
};

export const getYarnTypeById = async (id: number) => {
  return await prisma.yarnType.findUnique({
    where: { id },
    include: {
      personnel: true,
      currency: true,
      yarnOrderItem: {
        include: {
          yarnOrder: true,
        },
      },
      yarnStock: {
        include: {
          yarnType: true,
          yarnOrder: true,
          account: true,
          personnel: true,
        },
      },
    },
  });
};

export const createYarnType = async (body: {
  name: string;
  count: number;
  unit: string;
  color: string;
  colorCode: string;
  personnelId: number;
  price?: number;
  currencyId?: number;
}) => {
  return await prisma.yarnType.create({
    data: {
      name: body.name,
      count: body.count,
      unit: body.unit,
      color: body.color,
      colorCode: body.colorCode,
      personnel: { connect: { id: body.personnelId } },
      price: body.price,
      currency: body.currencyId
        ? { connect: { id: body.currencyId } }
        : undefined,
    },
  });
};

export const updateYarnType = async (
  id: number,
  data: Partial<{
    id: number;
    name: string;
    count: number;
    unit: string;
    color: string;
    colorCode: string;
    price: number;
    currencyId: number;
  }>
) => {
  return await prisma.yarnType.update({
    where: { id: id },
    data: {
      name: data.name,
      count: data.count,
      unit: data.unit,
      color: data.color,
      colorCode: data.colorCode,
      price: data.price,
      currency: { connect: { id: data.currencyId } },
    },
  });
};

export const deleteYarnType = async (id: number) => {
  return await prisma.yarnType.delete({
    where: { id },
  });
};
export const getYarnTypesByColor = async (color: string) => {
  return await prisma.yarnType.findMany({
    where: { color },
  });
};
