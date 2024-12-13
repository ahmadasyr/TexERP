import {
  createShippingCarrier,
  getShippingCarrierById,
  getAllShippingCarriers,
  updateShippingCarrier,
  deleteShippingCarrier,
} from "../services/shippingCarrierServices";

import { Request, Response } from "express";

export const createShippingCarrierController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCarrier = await createShippingCarrier(req.body);
    res.status(201).json(shippingCarrier);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllShippingCarriersController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCarriers = await getAllShippingCarriers();
    res.status(200).json(shippingCarriers);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShippingCarrierByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCarrier = await getShippingCarrierById(Number(req.params.id));
    res.status(200).json(shippingCarrier);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateShippingCarrierController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCarrier = await updateShippingCarrier(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(shippingCarrier);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteShippingCarrierController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteShippingCarrier(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
