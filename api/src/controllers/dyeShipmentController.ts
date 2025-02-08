import {
  createOrderShipment,
  updateOrderShipment,
  getShipmentsByOrder,
  getShipments,
  deleteOrderShipment,
  findStockMatchingOrderItem,
  handleBarcodeRead,
  getScannedItems,
  deleteConfirmation,
  getShipmentById,
  updateShipmentStatus,
  getConfirmedByOrderId,
  getOpenShipments,
  getShipmentItems,
  getShipmentItemDetails,
} from "../services/dyeOrderShipmentServices";

import { Request, Response } from "express";

export const createOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await createOrderShipment(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await updateOrderShipment(req.body);
    res.status(200).json(shipment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getShipmentsByOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipments = await getShipmentsByOrder(Number(req.params.id));
    res.status(200).json(shipments);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShipmentsController = async (_: Request, res: Response) => {
  try {
    const shipments = await getShipments();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await deleteOrderShipment(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const findStockMatchingOrderItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const stock = await findStockMatchingOrderItem(Number(req.params.id));
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const handleBarcodeReadController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await handleBarcodeRead(req.body);
    res.status(200).json(shipment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getScannedItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getScannedItems(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteConfirmationController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await deleteConfirmation(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getShipmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getShipmentById(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const closeShipmentStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await updateShipmentStatus(Number(req.params.id), true);
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const openShipmentStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await updateShipmentStatus(Number(req.params.id), false);
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getConfirmedByOrderIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getConfirmedByOrderId(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getOpenShipmentsController = async (_: Request, res: Response) => {
  try {
    const shipments = await getOpenShipments();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShipmentItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getShipmentItems(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShipmentItemDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const shipment = await getShipmentItemDetails(Number(req.params.id));
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
