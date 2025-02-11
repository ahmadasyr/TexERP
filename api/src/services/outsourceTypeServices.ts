import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOutsourceType = async (data: {
  name: string;
  outsourceGroupId: number;
  parentOutsourceTypeId: number;
}) => {
  return await prisma.outsourceType.create({
    data: {
      name: data.name,
      outsourceGroup: {
        connect: { id: data.outsourceGroupId },
      },
      parentOutsourceType: {
        connect: data.parentOutsourceTypeId
          ? { id: data.parentOutsourceTypeId }
          : undefined,
      },
    },
  });
};

export const getOutsourceTypeById = async (id: number) => {
  return await prisma.outsourceType.findUnique({
    where: { id },
  });
};

export const getAllOutsourceTypes = async () => {
  const types = await prisma.outsourceType.findMany({
    include: { outsourceGroup: true, parentOutsourceType: true },
  });
  return types.map((type) => ({
    ...type,
    group: type?.outsourceGroup?.name,
  }));
};

export const updateOutsourceType = async (
  id: number,
  data: {
    name: string;
    outsourceGroupId: number;
    parentOutsourceTypeId: number;
  }
) => {
  return await prisma.outsourceType.update({
    where: { id },
    data: {
      name: data.name,
      outsourceGroup: {
        connect: { id: data.outsourceGroupId },
      },
      parentOutsourceType: {
        connect: data.parentOutsourceTypeId
          ? { id: data.parentOutsourceTypeId }
          : undefined,
      },
    },
  });
};

export const deleteOutsourceType = async (id: number) => {
  return await prisma.outsourceType.delete({
    where: { id },
  });
};
