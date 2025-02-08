import { issueStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReportIssues = async () => {
  return await prisma.reportIssue.findMany();
};

export const getReportIssueById = async (id: number) => {
  return await prisma.reportIssue.findUnique({
    where: {
      id: id,
    },
  });
};

export const createReportIssue = async (data: {
  title: string;
  description: string;
  personnelId: number;
}) => {
  return await prisma.reportIssue.create({
    data: {
      title: data.title,
      description: data.description,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      status: issueStatus.Open,
    },
  });
};

export const updateReportIssue = async (
  id: number,
  data: {
    response: string;
  }
) => {
  return await prisma.reportIssue.update({
    where: {
      id: id,
    },
    data: {
      status: issueStatus.InProgress,
      response: data.response,
    },
  });
};

export const deleteReportIssue = async (id: number) => {
  return await prisma.reportIssue.delete({
    where: {
      id: id,
    },
  });
};

export const getReportIssueByPersonnelId = async (personnelId: number) => {
  return await prisma.reportIssue.findMany({
    where: {
      personnelId: personnelId,
    },
  });
};

export const closeReportIssue = async (id: number) => {
  return await prisma.reportIssue.update({
    where: {
      id: id,
    },
    data: {
      status: issueStatus.Closed,
      closedDate: new Date(),
    },
  });
};
