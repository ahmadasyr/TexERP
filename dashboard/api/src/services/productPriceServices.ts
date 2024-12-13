// model productPrice {
//   id          Int      @id @default(autoincrement())
//   productId   Int
//   price       Float
//   currencyId  Int
//   date        DateTime
//   unit        unit
//   personnelId Int

//   // Relations
//   product   product   @relation(fields: [productId], references: [id])
//   currency  currency  @relation(fields: [currencyId], references: [id])
//   personnel personnel @relation(fields: [personnelId], references: [id])
// }
import { PrismaClient, unit } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProductPrices = async () => {
  return await prisma.productPrice.findMany({
    include: {
      product: true,
      currency: true,
      personnel: true,
    },
  });
};

export const getProductPriceById = async (id: number) => {
  return await prisma.productPrice.findUnique({
    where: { id },
    include: {
      product: true,
      currency: true,
      personnel: true,
    },
  });
};

export const createProductPrice = async (data: {
  productId: number;
  price: number;
  upfront: number;
  installment: number;
  currencyId: number;
  date: Date;
  unit: unit;
  personnelId: number;
}) => {
  return await prisma.productPrice.create({
    data: {
      price: data.price,
      upfront: data.upfront,
      installment: data.installment,
      date: data.date,
      unit: data.unit,
      product: {
        connect: { id: data.productId },
      },
      currency: {
        connect: { id: data.currencyId },
      },
      personnel: {
        connect: { id: data.personnelId },
      },
    },
  });
};

export const updateProductPrice = async (
  id: number,
  data: {
    productId: number;
    price: number;
    upfront: number;
    installment: number;
    currencyId: number;
    date: Date;
    unit: unit;
    personnelId: number;
  }
) => {
  return await prisma.productPrice.update({
    where: { id },
    data: {
      price: data.price,
      upfront: data.upfront,
      installment: data.installment,
      date: data.date,
      unit: data.unit,
      product: {
        connect: { id: data.productId },
      },
      currency: {
        connect: { id: data.currencyId },
      },
      personnel: {
        connect: { id: data.personnelId },
      },
    },
  });
};

export const deleteProductPrice = async (id: number) => {
  return await prisma.productPrice.delete({
    where: { id },
  });
};
