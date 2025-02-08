import {
  createDyeOrder,
  fetchHighestKazanNo,
  updateDyeOrder,
  fetchDyeOrder,
  fetchDyeOrders,
  deleteDyeOrder,
  changeDyeOrderStatus,
  getOrderByShipment,
} from "../services/dyeOrderServices";

import { Request, Response } from "express";

export const createDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await createDyeOrder(req.body);
    res.status(201).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const fetchHighestKazanNoController = async (
  req: Request,
  res: Response
) => {
  try {
    const kazanNo = await fetchHighestKazanNo();
    res.status(200).json(kazanNo);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const updateDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await updateDyeOrder(Number(req.params.id), req.body);
    res.status(200).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const fetchDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await fetchDyeOrder(Number(req.params.id));
    res.status(200).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const fetchDyeOrdersController = async (req: Request, res: Response) => {
  try {
    const dyeOrders = await fetchDyeOrders();
    res.status(200).json(dyeOrders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await deleteDyeOrder(Number(req.params.id));
    res.status(200).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const closeDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await changeDyeOrderStatus(Number(req.params.id), true);
    res.status(200).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const openDyeOrderController = async (req: Request, res: Response) => {
  try {
    const dyeOrder = await changeDyeOrderStatus(Number(req.params.id), false);
    res.status(200).json(dyeOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
export const getOrderByShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getOrderByShipment(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
