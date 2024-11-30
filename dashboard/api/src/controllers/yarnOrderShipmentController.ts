import {
  createYarnOrderShipment,
  getYarnOrderShipmentById,
  updateYarnOrderShipment,
  deleteYarnOrderShipment,
  getAllYarnOrderShipments,
} from "../services/yarnOrderShipmentServices";
import { Request, Response } from "express";

export const createYarnOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderShipment = await createYarnOrderShipment(req.body);
    res.status(201).json(yarnOrderShipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllYarnOrderShipmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderShipments = await getAllYarnOrderShipments();
    res.status(200).json(yarnOrderShipments);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getYarnOrderShipmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderShipment = await getYarnOrderShipmentById(
      Number(req.params.id)
    );
    res.status(200).json(yarnOrderShipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateYarnOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnOrderShipment = await updateYarnOrderShipment(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(yarnOrderShipment);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteYarnOrderShipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteYarnOrderShipment(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
