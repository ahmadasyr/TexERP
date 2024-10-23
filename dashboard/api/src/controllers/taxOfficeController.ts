import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTaxOffices = async (req: Request, res: Response) => {
  try {
    const taxOffices = await prisma.taxOffice.findMany();
    res.json(taxOffices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tax offices" });
  }
};

export const getTaxOfficeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const taxOffice = await prisma.taxOffice.findUnique({
      where: { id: Number(id) },
    });
    if (taxOffice) {
      res.json(taxOffice);
    } else {
      res.status(404).json({ error: "Tax office not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tax office" });
  }
};

export const createTaxOffice = async (req: Request, res: Response) => {
  const { name, city } = req.body;
  try {
    const newTaxOffice = await prisma.taxOffice.create({
      data: { name, city },
    });
    res.status(201).json(newTaxOffice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tax office" });
  }
};

export const updateTaxOffice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, city } = req.body;
  try {
    const updatedTaxOffice = await prisma.taxOffice.update({
      where: { id: Number(id) },
      data: { name, city },
    });
    res.json(updatedTaxOffice);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tax office" });
  }
};

export const deleteTaxOffice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.taxOffice.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tax office" });
  }
};
