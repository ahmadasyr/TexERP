import {
  createProductionOrder,
  updateProductionOrder,
  deleteProductionOrder,
  getAllProductionOrders,
  getProductionOrderById,
} from "../services/productionOrderServices";
import { Request, Response } from "express";

export const createProductionOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const result = await createProductionOrder(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProductionOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await updateProductionOrder(id, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProductionOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteProductionOrder(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllProductionOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllProductionOrders();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProductionOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getProductionOrderById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
