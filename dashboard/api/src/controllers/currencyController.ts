import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createCurrency = async (req: Request, res: Response) => {
  const { name, code, rate, exchangePercent } = req.body;
  try {
    const currency = await prisma.currency.create({
      data: { name, code, rate, exchangePercent },
    });
    res.status(201).json(currency);
  } catch (error) {
    res.status(500).json({ error: "Failed to create currency" });
  }
};

export const getCurrencyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currency = await prisma.currency.findUnique({
      where: { id: Number(id) },
    });
    if (currency) {
      res.status(200).json(currency);
    } else {
      res.status(404).json({ error: "Currency not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve currency" });
  }
};

export const getAllCurrencies = async (_req: Request, res: Response) => {
  try {
    const currencies = await prisma.currency.findMany();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve currencies" });
  }
};

export const updateCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, rate, exchangePercent } = req.body;
  try {
    const currency = await prisma.currency.update({
      where: { id: Number(id) },
      data: { name, code, rate, exchangePercent },
    });
    res.status(200).json(currency);
  } catch (error) {
    res.status(500).json({ error: "Failed to update currency" });
  }
};

export const deleteCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.currency.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete currency" });
  }
};
