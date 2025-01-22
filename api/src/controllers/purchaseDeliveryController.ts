import {
  createPurchaseDelivery,
  getPurchaseDeliveries,
  getPurchaseDeliveryById,
  updatePurchaseDelivery,
  deletePurchaseDelivery,
} from "../services/purchaseDeliveryServices";

import { Request, Response } from "express";

export const createPurchaseDeliveryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const result = await createPurchaseDelivery(data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getPurchaseDeliveriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPurchaseDeliveries();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getPurchaseDeliveryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const result = await getPurchaseDeliveryById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updatePurchaseDeliveryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const result = await updatePurchaseDelivery(id, data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deletePurchaseDeliveryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const result = await deletePurchaseDelivery(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
