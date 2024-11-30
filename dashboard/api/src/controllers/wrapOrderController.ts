import {
  createWrapOrder,
  getWrapOrderById,
  deleteWrapOrder,
  updateWrapOrder,
  getWrapOrders,
} from "../services/wrapOrderServices";
import { Request, Response } from "express";

export const createWrapOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const wrapOrder = await createWrapOrder(req.body);
    res.status(201).json(wrapOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getWrapOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const wrapOrder = await getWrapOrderById(Number(req.params.id));
    res.status(200).json(wrapOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteWrapOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteWrapOrder(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateWrapOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const wrapOrder = await updateWrapOrder(Number(req.params.id), req.body);
    res.status(200).json(wrapOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getWrapOrdersController = async (req: Request, res: Response) => {
  try {
    const wrapOrders = await getWrapOrders();
    res.status(200).json(wrapOrders);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
