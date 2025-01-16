import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllDofs = async () => {
  return await prisma.dofiRequest.findMany({
    include: {
      followedPersonnel: true,
      fromPersonnel: true,
      toPersonnel: true,
    },
  });
};

export const getDof = async (id: number) => {
  return await prisma.dofiRequest.findUnique({
    where: {
      id,
    },
    include: {
      followedPersonnel: true,
      fromPersonnel: true,
      toPersonnel: true,
    },
  });
};

export const createDof = async (data: {
  fromPersonnelId: number;
  toPersonnelId: number;
  reason: string;
  date: Date;
  nonconformityDescription: string;
  plannedCorrectiveActions?: string;
  dueDate?: Date;
  resultsAndComments?: string;
  closureDate?: Date;
  followedPersonnelId?: number;
}) => {
  return await prisma.dofiRequest.create({
    data: {
      reason: data.reason,
      fromPersonnel: { connect: { id: data.fromPersonnelId } },
      toPersonnel: { connect: { id: data.toPersonnelId } },
      followedPersonnel: data.followedPersonnelId
        ? { connect: { id: data.followedPersonnelId } }
        : undefined,
      nonconformityDescription: data.nonconformityDescription,
      plannedCorrectiveActions: data.plannedCorrectiveActions,
      resultsAndComments: data.resultsAndComments,
      date: data.date ? new Date(data.date) : new Date(),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      closureDate: data.closureDate ? new Date(data.closureDate) : undefined,
    },
  });
};

export const updateDof = async (
  id: number,
  data: {
    fromPersonnelId: number;
    toPersonnelId: number;
    reason: string;
    date: Date;
    nonconformityDescription: string;
    plannedCorrectiveActions?: string;
    dueDate?: Date;
    resultsAndComments?: string;
    closureDate?: Date;
    followedPersonnelId?: number;
  }
) => {
  return await prisma.dofiRequest.update({
    where: { id },
    data: {
      reason: data.reason,
      fromPersonnel: { connect: { id: data.fromPersonnelId } },
      toPersonnel: { connect: { id: data.toPersonnelId } },
      date: data.date,
      nonconformityDescription: data.nonconformityDescription,
      plannedCorrectiveActions: data.plannedCorrectiveActions,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      resultsAndComments: data.resultsAndComments,
      closureDate: data.closureDate ? new Date(data.closureDate) : undefined,
      followedPersonnel: data.followedPersonnelId
        ? { connect: { id: data.followedPersonnelId } }
        : undefined,
    },
  });
};

export const deleteDof = async (id: number) => {
  return await prisma.dofiRequest.delete({
    where: {
      id,
    },
  });
};
