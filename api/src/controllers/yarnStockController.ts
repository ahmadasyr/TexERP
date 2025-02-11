import {
  getYarnStock,
  createYarnStock,
  updateYarnStock,
  deleteYarnStock,
  getYarnStockById,
} from "../services/yarnStockServices";

import { Request, Response } from "express";

export const getYarnStockController = async (req: Request, res: Response) => {
  try {
    const yarnStock = await getYarnStock();
    res.json(yarnStock);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getYarnStockByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnStock = await getYarnStockById(Number(req.params.id));
    res.json(yarnStock);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createYarnStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnStock = await createYarnStock(req.body);
    res.json(yarnStock);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateYarnStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnStock = await updateYarnStock(Number(req.params.id), req.body);
    res.json(yarnStock);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteYarnStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnStock = await deleteYarnStock(Number(req.params.id));
    res.json(yarnStock);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
