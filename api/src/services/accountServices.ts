import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAccount = async (data: {
  name: string;
  accountTypeId: number;
}) => {
  return await prisma.account.create({
    data: {
      name: data.name,
      accountType: {
        connect: {
          id: data.accountTypeId,
        },
      },
    },
  });
};

export const getAccountById = async (id: number) => {
  return await prisma.account.findUnique({
    where: { id },
  });
};

export const getAccountByProperties = async (code: string) => {
  return await prisma.account.findMany({
    where: {
      accountType: {
        code,
      },
    },
  });
};

export const getAllAccounts = async () => {
  return await prisma.account.findMany({
    include: {
      accountType: true,
    },
  });
};

export const updateAccount = async (
  id: number,
  data: {
    name?: string;
    accountTypeId?: number;
  }
) => {
  return await prisma.account.update({
    where: { id },
    data: {
      name: data.name,
      accountType: {
        connect: {
          id: data.accountTypeId,
        },
      },
    },
  });
};

export const deleteAccount = async (id: number) => {
  return await prisma.account.delete({
    where: { id },
  });
};
