import {
  createYarnOrderShipmentItem,
  getYarnOrderShipmentItemById,
  updateYarnOrderShipmentItem,
  deleteYarnOrderShipmentItem,
} from "../services/yarnOrderShipmentItemServices";
import { Request, Response } from "express";

export const createYarnOrderShipmentItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const yarnOrderShipmentItem = await createYarnOrderShipmentItem(data);
    res.json(yarnOrderShipmentItem);
  } catch (error) {}
};

export const getYarnOrderShipmentItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const yarnOrderShipmentItem = await getYarnOrderShipmentItemById(id);
    res.json(yarnOrderShipmentItem);
  } catch (error) {}
};

export const updateYarnOrderShipmentItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const yarnOrderShipmentItem = await updateYarnOrderShipmentItem(id, data);
    res.json(yarnOrderShipmentItem);
  } catch (error) {}
};

export const deleteYarnOrderShipmentItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    await deleteYarnOrderShipmentItem(id);
    res.json({ message: "Yarn order shipment item deleted" });
  } catch (error) {}
};
