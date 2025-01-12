import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAccountTypes = async () => {
  return await prisma.accountType.findMany();
};

export const getAccountTypeById = async (id: number) => {
  return await prisma.accountType.findUnique({
    where: { id },
  });
};

export const createAccountType = async (body: {
  name: string;
  code: string;
}) => {
  const { name, code } = body;
  return await prisma.accountType.create({
    data: { name, code },
  });
};

export const updateAccountType = async (
  id: number,
  body: {
    name: string;
    code: string;
  }
) => {
  const { name, code } = body;
  return await prisma.accountType.update({
    where: { id },
    data: { name, code },
  });
};

export const deleteAccountType = async (id: number) => {
  return await prisma.accountType.delete({
    where: { id },
  });
};
