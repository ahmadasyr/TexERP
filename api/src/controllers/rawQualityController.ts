import {
  createRawQualityControlStock,
  updateRawQualityControlStock,
  deleteRawQualityControlStock,
  getAllRawQualityControlStocks,
  getRawQualityControlStockById,
} from "../services/rawQualityServices";
import { Request, Response } from "express";

export const getAllRawQualityControlStocksController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAllRawQualityControlStocks();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getRawQualityControlStockByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getRawQualityControlStockById(Number(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createRawQualityControlStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await createRawQualityControlStock(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateRawQualityControlStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await updateRawQualityControlStock(
      Number(req.params.id),
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteRawQualityControlStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await deleteRawQualityControlStock(Number(req.params.id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
