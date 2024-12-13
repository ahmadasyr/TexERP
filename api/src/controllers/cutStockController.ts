import {
  createCutStock,
  getCutStock,
  getCutStocks,
  deleteCutStock,
  updateCutStock,
} from "../services/cutStockServices";
import { Request, Response } from "express";

export const createCutStockController = async (req: Request, res: Response) => {
  try {
    const cutStock = await createCutStock(req.body);
    res.status(201).json(cutStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCutStockController = async (req: Request, res: Response) => {
  try {
    const cutStock = await getCutStock(Number(req.params.id));
    res.status(200).json(cutStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getCutStocksController = async (_: Request, res: Response) => {
  try {
    const cutStocks = await getCutStocks();
    res.status(200).json(cutStocks);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateCutStockController = async (req: Request, res: Response) => {
  try {
    const cutStock = await updateCutStock(Number(req.params.id), req.body);
    res.status(200).json(cutStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteCutStockController = async (req: Request, res: Response) => {
  try {
    await deleteCutStock(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
