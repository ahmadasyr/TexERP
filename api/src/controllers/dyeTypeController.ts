import {
  createDyeType,
  getDyeTypeById,
  getAllDyeTypes,
  updateDyeType,
  deleteDyeType,
} from "../services/dyeTypeServices";
import { Request, Response } from "express";

export const createDyeTypeController = async (req: Request, res: Response) => {
  try {
    const dyeType = await createDyeType(req.body);
    res.status(201).json(dyeType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getDyeTypeByIdController = async (req: Request, res: Response) => {
  try {
    const dyeType = await getDyeTypeById(Number(req.params.id));
    if (!dyeType) {
      res.status(404).json({ message: "Dye Type not found" });
    }
    res.status(200).json(dyeType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllDyeTypesController = async (req: Request, res: Response) => {
  try {
    const dyeTypes = await getAllDyeTypes();
    res.status(200).json(dyeTypes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateDyeTypeController = async (req: Request, res: Response) => {
  try {
    const dyeType = await updateDyeType(Number(req.params.id), req.body);
    if (!dyeType) {
      res.status(404).json({ message: "Dye Type not found" });
    }
    res.status(200).json(dyeType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteDyeTypeController = async (req: Request, res: Response) => {
  try {
    const dyeType = await deleteDyeType(Number(req.params.id));
    if (!dyeType) {
      res.status(404).json({ message: "Dye Type not found" });
    }
    res.status(200).json({ message: "Dye Type deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
