import {
  createDyeColor,
  getDyeColorById,
  getAllDyeColors,
  updateDyeColor,
  deleteDyeColor,
} from "../services/dyeColorServices";
import { Request, Response } from "express";

export const createDyeColorController = async (req: Request, res: Response) => {
  try {
    const dyeColor = await createDyeColor(req.body);
    res.status(201).json(dyeColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getDyeColorByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const dyeColor = await getDyeColorById(Number(req.params.id));
    if (!dyeColor) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json(dyeColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllDyeColorsController = async (
  req: Request,
  res: Response
) => {
  try {
    const dyeColors = await getAllDyeColors();
    res.status(200).json(dyeColors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateDyeColorController = async (req: Request, res: Response) => {
  try {
    const dyeColor = await updateDyeColor(Number(req.params.id), req.body);
    if (!dyeColor) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json(dyeColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteDyeColorController = async (req: Request, res: Response) => {
  try {
    const dyeColor = await deleteDyeColor(Number(req.params.id));
    if (!dyeColor) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json({ message: "Dye color deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
