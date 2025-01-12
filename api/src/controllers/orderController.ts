import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  getOrderByCustomerId,
} from "../services/orderServices";
import { Request, Response } from "express";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getOrderController = async (req: Request, res: Response) => {
  try {
    const order = await getOrder(Number(req.params.id));
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const order = await updateOrder(Number(req.params.id), req.body);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const order = await deleteOrder(Number(req.params.id));
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getOrderByCustomerIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await getOrderByCustomerId(Number(req.params.id));
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
