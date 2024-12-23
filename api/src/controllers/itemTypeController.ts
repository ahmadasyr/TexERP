import {
  createItemType,
  getItemTypeById,
  getAllItemTypes,
  updateItemType,
  deleteItemType,
} from "../services/itemTypeServices";
import { Request, Response } from "express";

export const createItemTypeController = async (req: Request, res: Response) => {
  try {
    const itemType = await createItemType(req.body);
    res.status(201).json(itemType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getItemTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const itemType = await getItemTypeById(Number(req.params.id));
    if (!itemType) {
      res.status(404).json({ message: "Item type not found" });
    }
    res.status(200).json(itemType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllItemTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const itemTypes = await getAllItemTypes();
    res.status(200).json(itemTypes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateItemTypeController = async (req: Request, res: Response) => {
  try {
    const itemType = await updateItemType(Number(req.params.id), req.body);
    if (!itemType) {
      res.status(404).json({ message: "Item type not found" });
    }
    res.status(200).json(itemType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteItemTypeController = async (req: Request, res: Response) => {
  try {
    const itemType = await deleteItemType(Number(req.params.id));
    if (!itemType) {
      res.status(404).json({ message: "Item type not found" });
    }
    res.status(200).json({ message: "Item type deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
