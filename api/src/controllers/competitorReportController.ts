import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCompetitorReports = async (req: Request, res: Response) => {
  try {
    const competitorReports = await prisma.competitorReport.findMany({
      include: {
        competitor: true,
        competitorReportContent: true,
      },
    });
    res.status(200).json(competitorReports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch competitor reports" });
  }
};

export const getCompetitorReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const competitorReport = await prisma.competitorReport.findUnique({
      where: { id: Number(id) },
      include: {
        competitor: true,
        competitorReportContent: true,
      },
    });
    if (competitorReport) {
      res.status(200).json(competitorReport);
    } else {
      res.status(404).json({ error: "Competitor report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch competitor report" });
  }
};

export const getCompetitorReportByCompetitor = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const competitorReport = await prisma.competitorReport.findMany({
      where: { competitorId: Number(id) },
      include: {
        competitor: true,
        competitorReportContent: true,
      },
    });
    if (competitorReport) {
      res.status(200).json(competitorReport);
    } else {
      res.status(404).json({ error: "Competitor report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch competitor report" });
  }
};

export const createCompetitorReport = async (req: Request, res: Response) => {
  const { competitorId, date, competitorReportContent } = req.body;
  try {
    const newCompetitorReport = await prisma.competitorReport.create({
      data: {
        competitorId,
        date: new Date(date),

        competitorReportContent: {
          createMany: {
            data: competitorReportContent,
          },
        },
      },
    });
    res.status(201).json(newCompetitorReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to create competitor report" });
  }
};

export const updateCompetitorReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { competitorId, date, competitorReportContent } = req.body;
  try {
    const updatedCompetitorReport = await prisma.competitorReport.update({
      where: { id: Number(id) },
      data: {
        competitorId,
        date: new Date(date),
        competitorReportContent: {
          deleteMany: {},
          create: competitorReportContent,
        },
      },
    });
    res.status(200).json(updatedCompetitorReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update competitor report" });
  }
};

export const deleteCompetitorReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.competitorReportContent.deleteMany({
      where: { competitorReportId: Number(id) },
    });
    await prisma.competitorReport.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete competitor report" });
  }
};
