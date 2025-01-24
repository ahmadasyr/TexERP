import { materialUnit, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMaterialStock = async (data: {
  materialId: number;
  warehouseId?: number;
  quantity: number;
  unit: materialUnit;
  createdAt?: Date;
  purchaseOrderItemId?: number;
  personnelId: number;
  movedFromStockId?: number;
  movedPersonnelId?: number;
}) => {
  return await prisma.materialStock.create({
    data: {
      material: { connect: { id: data.materialId } },
      warehouse: data.warehouseId
        ? { connect: { id: data.warehouseId } }
        : undefined,
      quantity: data.quantity,
      unit: data.unit,
      purchaseOrderItem: data.purchaseOrderItemId
        ? { connect: { id: data.purchaseOrderItemId } }
        : undefined,
      personnel: { connect: { id: data.personnelId } },
      movedFromStock: data.movedFromStockId
        ? { connect: { id: data.movedFromStockId } }
        : undefined,
      movedPersonnel: data.movedPersonnelId
        ? { connect: { id: data.movedPersonnelId } }
        : undefined,
    },
  });
};

export const getAllMaterialStock = async () => {
  return await prisma.materialStock.findMany({
    include: {
      material: true,
      warehouse: true,
      purchaseOrderItem: true,
      personnel: true,
      movedFromStock: true,
      movedPersonnel: true,
    },
  });
};

export const getMaterialStockByMaterialId = async (materialId: number) => {
  return await prisma.materialStock.findMany({
    where: { materialId },
    include: {
      material: true,
      warehouse: true,
      purchaseOrderItem: true,
      personnel: true,
      movedFromStock: true,
      movedPersonnel: true,
    },
  });
};
export const getMaterialStockByWarehouseId = async (warehouseId: number) => {
  return await prisma.materialStock.findMany({
    where: { warehouseId },
    include: {
      material: true,
      warehouse: true,
      purchaseOrderItem: true,
      personnel: true,
      movedFromStock: true,
      movedPersonnel: true,
    },
  });
};

export const getMaterialStockByPurchaseOrderId = async (
  purchaseOrderId: number
) => {
  return await prisma.materialStock.findMany({
    where: {
      purchaseOrderItem: {
        purchaseOrderId: purchaseOrderId,
      },
    },
    include: {
      material: true,
      warehouse: true,
      purchaseOrderItem: true,
      personnel: true,
      movedFromStock: true,
      movedPersonnel: true,
    },
  });
};

export const getMaterialStockById = async (id: number) => {
  return await prisma.materialStock.findUnique({
    where: { id },
    include: {
      material: true,
      warehouse: true,
      purchaseOrderItem: true,
      personnel: true,
      movedFromStock: true,
      movedPersonnel: true,
    },
  });
};

export const updateMaterialStock = async (
  id: number,
  data: {
    materialId: number;
    warehouseId?: number;
    quantity: number;
    unit: materialUnit;
    createdAt?: Date;
    purchaseOrderItemId?: number;
    personnelId: number;
    movedFromStockId?: number;
    movedPersonnelId?: number;
  }
) => {
  return await prisma.materialStock.update({
    where: { id },
    data: {
      material: { connect: { id: data.materialId } },
      warehouse: data.warehouseId
        ? { connect: { id: data.warehouseId } }
        : undefined,
      quantity: data.quantity,
      unit: data.unit,
      purchaseOrderItem: data.purchaseOrderItemId
        ? { connect: { id: data.purchaseOrderItemId } }
        : undefined,
      personnel: { connect: { id: data.personnelId } },
      movedFromStock: data.movedFromStockId
        ? { connect: { id: data.movedFromStockId } }
        : undefined,
      movedPersonnel: data.movedPersonnelId
        ? { connect: { id: data.movedPersonnelId } }
        : undefined,
    },
  });
};

export const deleteMaterialStock = async (id: number) => {
  return await prisma.materialStock.delete({
    where: { id },
  });
};
