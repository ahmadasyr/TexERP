import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all banks
export const getBanks = async (req: Request, res: Response): Promise<void> => {
  try {
    const banks = await prisma.bank.findMany();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving banks" });
  }
};

// Get bank by ID
export const getBankById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const bank = await prisma.bank.findUnique({
      where: { id: parseInt(id) },
    });
    if (bank) {
      res.json(bank);
    } else {
      res.status(404).json({ error: "Bank not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving bank" });
  }
};

// Create new bank
export const createBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  try {
    const newBank = await prisma.bank.create({
      data: {
        name,
      },
    });
    res.status(201).json(newBank);
  } catch (error) {
    res.status(500).json({ error: "Error creating bank" });
  }
};

// Update bank by ID
export const updateBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedBank = await prisma.bank.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    res.json(updatedBank);
  } catch (error) {
    res.status(500).json({ error: "Error updating bank" });
  }
};

// Delete bank by ID
export const deleteBank = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.bank.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting bank" });
  }
};
