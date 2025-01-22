import {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrder,
  getPurchaseOrders,
  cancelPurchaseOrder,
  completePurchaseOrder,
  rejectPurchaseOrder,
  returnPurchaseOrder,
} from "../services/purchaseOrderServices";

import { Request, Response } from "express";

export const getPurchaseOrdersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const purchaseOrders = await getPurchaseOrders();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase orders" });
  }
};

export const getPurchaseOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const purchaseOrder = await getPurchaseOrder(parseInt(id));
    if (purchaseOrder) {
      res.status(200).json(purchaseOrder);
    } else {
      res.status(404).json({ error: "Purchase order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase order" });
  }
};

export const createPurchaseOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const purchaseOrder = await createPurchaseOrder(req.body);
    res.status(201).json(purchaseOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create purchase order" });
  }
};

export const updatePurchaseOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const purchaseOrder = await updatePurchaseOrder(parseInt(id), req.body);
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update purchase order" });
  }
};

export const deletePurchaseOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await deletePurchaseOrder(parseInt(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete purchase order" });
  }
};

export const setPurchaseOrderStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const status: string = req.body.status;
  try {
    console.log(req.body);
    switch (status) {
      case "cancelled":
        await cancelPurchaseOrder(parseInt(id));
        break;
      case "completed":
        await completePurchaseOrder(parseInt(id));
        break;
      case "rejected":
        await rejectPurchaseOrder(parseInt(id));
        break;
      case "returned":
        await returnPurchaseOrder(parseInt(id));
        break;
      default:
        res.status(400).json({ error: "Invalid status" });
        return;
    }
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to update purchase order status" });
  }
};
