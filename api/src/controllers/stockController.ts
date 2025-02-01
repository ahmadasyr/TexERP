import { stockStatus } from "@prisma/client";
import {
  createStock,
  getStock,
  getStocksByStatus,
  getStocks,
  deleteStock,
  updateStock,
  getStocksByIds,
} from "../services/stockServices";

import { Request, Response } from "express";

export const getStocksController = async (req: Request, res: Response) => {
  try {
    const stocks = await getStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getStockController = async (req: Request, res: Response) => {
  try {
    const stock = await getStock(Number(req.params.id));
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getStocksByStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const stocks = await getStocksByStatus(req.params.status as stockStatus);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createStockController = async (req: Request, res: Response) => {
  try {
    const stock = await createStock(req.body);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteStockController = async (req: Request, res: Response) => {
  try {
    const stock = await deleteStock(Number(req.params.id));
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateStockController = async (req: Request, res: Response) => {
  try {
    const stock = await updateStock(Number(req.params.id), req.body);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getStocksByIdsController = async (req: Request, res: Response) => {
  try {
    const stocks = await getStocksByIds(req.body.ids);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
