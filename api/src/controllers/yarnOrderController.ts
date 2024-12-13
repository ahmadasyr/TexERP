import {
  createYarnOrder,
  getYarnOrderById,
  updateYarnOrder,
  deleteYarnOrder,
  getAllYarnOrders,
  closeYarnOrder,
  getOngoingYarnOrders,
  getYarnOrdersBySale,
} from "../services/yarnOrder";
import { Request, Response } from "express";

export const createYarnOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrder = await createYarnOrder(req.body);
    res.status(201).json(yarnOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllYarnOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrders = await getAllYarnOrders();
    res.status(200).json(yarnOrders);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getYarnOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrder = await getYarnOrderById(Number(req.params.id));
    res.status(200).json(yarnOrder);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateYarnOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrder = await updateYarnOrder(Number(req.params.id), req.body);
    res.status(200).json(yarnOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteYarnOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteYarnOrder(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const closeYarnOrderController = async (req: Request, res: Response) => {
  try {
    const yarnOrder = await closeYarnOrder(Number(req.params.id));
    res.status(200).json(yarnOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
export const getOngoingYarnOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrders = await getOngoingYarnOrders();
    res.status(200).json(yarnOrders);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getYarnOrdersBySaleController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrders = await getYarnOrdersBySale(req.params.sale === "1");
    res.status(200).json(yarnOrders);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
