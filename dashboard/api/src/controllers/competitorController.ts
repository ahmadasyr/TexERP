import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCompetitors = async (req: Request, res: Response) => {
  try {
    const competitors = await prisma.competitor.findMany({
      include: { competitorReport: true },
    });
    res.json(competitors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCompetitorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const competitor = await prisma.competitor.findUnique({
      where: { id: Number(id) },
      include: { competitorReport: true },
    });
    if (competitor) {
      res.json(competitor);
    } else {
      res.status(404).json({ error: "Competitor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCompetitor = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCompetitor = await prisma.competitor.create({
      data: { name },
    });
    res.status(201).json(newCompetitor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCompetitor = await prisma.competitor.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updatedCompetitor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.competitor.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
