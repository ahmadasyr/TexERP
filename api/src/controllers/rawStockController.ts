import {
  createRawStock,
  getRawStockById,
  getAllRawStocks,
  updateRawStock,
  deleteRawStock,
} from "../services/rawStockServices";
import { Request, Response } from "express";

export const createRawStockController = async (req: Request, res: Response) => {
  try {
    const rawStock = await createRawStock(req.body);
    res.status(201).json(rawStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getRawStockByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const rawStock = await getRawStockById(Number(req.params.id));
    res.status(200).json(rawStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllRawStocksController = async (
  req: Request,
  res: Response
) => {
  try {
    const rawStocks = await getAllRawStocks();
    res.status(200).json(rawStocks);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateRawStockController = async (req: Request, res: Response) => {
  try {
    const rawStock = await updateRawStock(Number(req.params.id), req.body);
    res.status(200).json(rawStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteRawStockController = async (req: Request, res: Response) => {
  try {
    await deleteRawStock(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
