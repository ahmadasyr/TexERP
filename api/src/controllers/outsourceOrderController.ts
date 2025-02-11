import {
  createOutsourceOrder,
  updateOutsourceOrder,
  fetchOutsourceOrders,
  fetchOutsourceOrder,
  deleteOutsourceOrder,
  changeOutsourceOrderStatus,
  getOrderByShipment,
  getOutsourceOrderItemSpecs,
  acceptOutsourceOrder,
  deleteConfirmation,
} from "../services/outsourceOrderServices";

import { Request, Response } from "express";
export const createOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await createOutsourceOrder(req.body);
    res.status(201).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const updateOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await updateOutsourceOrder(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const fetchOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await fetchOutsourceOrder(Number(req.params.id));
    res.status(200).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const fetchOutsourceOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrders = await fetchOutsourceOrders();
    res.status(200).json(outsourceOrders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await deleteOutsourceOrder(Number(req.params.id));
    res.status(200).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const closeOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await changeOutsourceOrderStatus(
      Number(req.params.id),
      true
    );
    res.status(200).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const openOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await changeOutsourceOrderStatus(
      Number(req.params.id),
      false
    );
    res.status(200).json(outsourceOrder);
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

export const getOutsourceOrderItemSpecsController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrderItemSpecs = await getOutsourceOrderItemSpecs(
      Number(req.params.id)
    );
    res.status(200).json(outsourceOrderItemSpecs);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const acceptOutsourceOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrderItemSpecs = await acceptOutsourceOrder(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(outsourceOrderItemSpecs);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteConfirmationController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceOrder = await deleteConfirmation(Number(req.params.id));
    res.status(200).json(outsourceOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
