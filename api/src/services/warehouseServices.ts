// model warehouse {
//   id                Int    @id @default(autoincrement())
//   // will include name of the warehouse, address of the warehouse, personnel responsible for the warehouse
//   name              String
//   address           String
//   personnelId       Int
//   parentWarehouseId Int?

//   // relations
//   personnel       personnel       @relation(fields: [personnelId], references: [id])
//   parentWarehouse warehouse?      @relation("WarehouseRelation", fields: [parentWarehouseId], references: [id])
//   childWarehouse  warehouse[]     @relation("WarehouseRelation")
//   materialStock   materialStock[]
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllWarehouses = async () => {
  return await prisma.warehouse.findMany({
    include: {
      personnel: true,
      parentWarehouse: true,
    },
  });
};

export const getWarehouseById = async (id: number) => {
  return await prisma.warehouse.findUnique({
    where: {
      id: id,
    },
  });
};

export const createWarehouse = async (data: {
  name: string;
  address: string;
  personnelId: number;
  parentWarehouseId?: number;
}) => {
  return await prisma.warehouse.create({
    data: {
      name: data.name,
      address: data.address,
      personnel: { connect: { id: data.personnelId } },
      parentWarehouse: data.parentWarehouseId
        ? {
            connect: { id: data.parentWarehouseId },
          }
        : undefined,
    },
  });
};

export const updateWarehouse = async (
  id: number,
  data: {
    name: string;
    address: string;
    personnelId: number;
    parentWarehouseId?: number;
  }
) => {
  return await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      address: data.address,
      personnel: { connect: { id: data.personnelId } },
      parentWarehouse: data.parentWarehouseId
        ? {
            connect: { id: data.parentWarehouseId },
          }
        : { disconnect: true },
    },
  });
};

export const deleteWarehouse = async (id: number) => {
  return await prisma.warehouse.delete({
    where: {
      id: id,
    },
  });
};
