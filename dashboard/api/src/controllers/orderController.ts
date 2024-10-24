import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        product: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        product: true,
      },
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const getOrderByCustId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findMany({
      where: { customerId: Number(id) },
      include: {
        product: true,
      },
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const {
    orderNo,
    customerId,
    index,
    productId,
    quantity,
    unit,
    deliveryAddress,
    acceptanceDate,
    specifications,
    details,
  } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        orderNo,
        customerId,
        index,
        productId,
        quantity,
        unit,
        deliveryAddress,
        acceptanceDate: new Date(acceptanceDate),
        specifications,
        details,
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    orderNo,
    customerId,
    index,
    productId,
    quantity,
    unit,
    deliveryAddress,
    acceptanceDate,
    specifications,
    details,
  } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        orderNo,
        customerId,
        index,
        productId,
        quantity,
        unit,
        deliveryAddress,
        acceptanceDate: new Date(acceptanceDate),
        specifications,
        details,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.order.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
