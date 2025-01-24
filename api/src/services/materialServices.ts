// model material {
//   id         Int          @id @default(autoincrement())
//   // will include name of the material, type of the material, unit of the material
//   name       String
//   unit       materialUnit
//   categoryId Int

//   // Relations
//   materialCategory  materialCategory    @relation(fields: [categoryId], references: [id])
//   materialPrice     materialPrice[]
//   purchaseOrderItem purchaseOrderItem[]
//   materialStock     materialStock[]
// }
import { PrismaClient, materialUnit } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createMaterial = async (data: {
  name: string;
  unit: materialUnit;
  categoryId: number;
}) => {
  return await prisma.material.create({
    data: {
      name: data.name,
      unit: data.unit,
      materialCategory: { connect: { id: data.categoryId } },
    },
  });
};

export const getMaterialById = async (id: number) => {
  return await prisma.material.findUnique({
    where: { id },
  });
};

export const getAllMaterials = async () => {
  const materials = await prisma.material.findMany({
    include: { materialCategory: true },
  });
  return materials.map((material) => ({
    ...material,
    category: material.materialCategory.name,
  }));
};

export const updateMaterial = async (
  id: number,
  data: { name: string; unit: materialUnit; categoryId: number }
) => {
  return await prisma.material.update({
    where: { id },
    data: {
      name: data.name,
      unit: data.unit,
      materialCategory: { connect: { id: data.categoryId } },
    },
  });
};

export const deleteMaterial = async (id: number) => {
  return await prisma.material.delete({
    where: { id },
  });
};

export const getMaterialByCategory = async (categoryId: number) => {
  return await prisma.material.findMany({
    where: { categoryId },
    include: { materialCategory: true },
  });
};

export const getMaterialsInOrder = async (orderId: number) => {
  return await prisma.material.findMany({
    where: {
      purchaseOrderItem: {
        some: {
          purchaseOrderId: orderId,
        },
      },
    },
    include: {
      purchaseOrderItem: {
        select: {
          id: true,
          quantity: true,
        },
        where: {
          purchaseOrderId: orderId,
        },
      },
    },
  });
};
