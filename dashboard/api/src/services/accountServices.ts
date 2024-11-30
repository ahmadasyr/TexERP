import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAccount = async (data: {
  name: string;
  debit: number;
  credit: number;
  outsource: boolean;
  dye: boolean;
  yarn: boolean;
  buys: boolean;
}) => {
  return await prisma.account.create({
    data,
  });
};

export const getAccountById = async (id: number) => {
  return await prisma.account.findUnique({
    where: { id },
  });
};

export const getAccountByProperties = async (
  outsource: boolean,
  dye: boolean,
  yarn: boolean,
  buys: boolean
) => {
  return await prisma.account.findMany({
    where: {
      outsource,
      dye,
      yarn,
      buys,
    },
  });
};

export const getAllAccounts = async () => {
  return await prisma.account.findMany();
};

export const updateAccount = async (
  id: number,
  data: {
    name?: string;
    debit?: number;
    credit?: number;
    outsource: boolean;
    dye: boolean;
    yarn: boolean;
    buys: boolean;
  }
) => {
  return await prisma.account.update({
    where: { id },
    data,
  });
};

export const deleteAccount = async (id: number) => {
  return await prisma.account.delete({
    where: { id },
  });
};
