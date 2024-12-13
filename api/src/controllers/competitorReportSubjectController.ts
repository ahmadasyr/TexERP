import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSubjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subjects = await prisma.competitionReportSubject.findMany({
      include: { competitorReportContent: true },
    });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSubjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const subject = await prisma.competitionReportSubject.findUnique({
      where: { id: Number(id) },
      include: { competitorReportContent: true },
    });
    if (subject) {
      res.status(200).json(subject);
    } else {
      res.status(404).json({ error: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  try {
    const newSubject = await prisma.competitionReportSubject.create({
      data: { name },
    });
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedSubject = await prisma.competitionReportSubject.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.competitionReportSubject.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
