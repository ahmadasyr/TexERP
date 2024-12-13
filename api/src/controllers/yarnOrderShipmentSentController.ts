import {
  createYarnOrderShipmentSent,
  getYarnOrderShipmentSent,
  getAllYarnOrderShipmentSent,
  updateYarnOrderShipmentSent,
  deleteYarnOrderShipmentSent,
} from "../services/yarnOrderShipmentSentService";
import { Request, Response } from "express";

export const createYarnOrderShipmentSentController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const result = await createYarnOrderShipmentSent(data);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getYarnOrderShipmentSentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getYarnOrderShipmentSent(id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllYarnOrderShipmentSentController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllYarnOrderShipmentSent();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateYarnOrderShipmentSentController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const result = await updateYarnOrderShipmentSent(data);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteYarnOrderShipmentSentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteYarnOrderShipmentSent(id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
