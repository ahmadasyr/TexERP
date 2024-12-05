import exp from "constants";
import {
  createYarnOrderItem,
  getYarnOrderItemById,
  updateYarnOrderItem,
  deleteYarnOrderItem,
  getYarnOrderItems,
} from "../services/yarnOrderItemServices";

import { Request, Response } from "express";

export const createYarnOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderItem = await createYarnOrderItem(req.body);
    res.status(201).json(yarnOrderItem);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getYarnOrderItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderItems = await getYarnOrderItems();
    res.status(200).json(yarnOrderItems);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getYarnOrderItemByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderItem = await getYarnOrderItemById(Number(req.params.id));
    res.status(200).json(yarnOrderItem);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateYarnOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderItem = await updateYarnOrderItem(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(yarnOrderItem);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteYarnOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteYarnOrderItem(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
