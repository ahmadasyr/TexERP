import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProductionOrderWrap = async (data: {
  productionOrderId: number;
  wrapStockId: number;
}) => {
  return await prisma.productionOrderWrap.create({
    data: {
      productionOrder: { connect: { id: data.productionOrderId } },
      wrapStock: { connect: { id: data.wrapStockId } },
    },
  });
};

export const getProductionOrderWrapById = async (id: number) => {
  return await prisma.productionOrderWrap.findUnique({
    where: { id },
  });
};

export const getAllProductionOrderWraps = async () => {
  return await prisma.productionOrderWrap.findMany();
};

export const updateProductionOrderWrap = async (
  id: number,
  data: { productionOrderId?: number; wrapStockId?: number }
) => {
  return await prisma.productionOrderWrap.update({
    where: { id },
    data: {
      productionOrder: { connect: { id: data.productionOrderId } },
      wrapStock: { connect: { id: data.wrapStockId } },
    },
  });
};

export const deleteProductionOrderWrap = async (id: number) => {
  return await prisma.productionOrderWrap.delete({
    where: { id },
  });
};
