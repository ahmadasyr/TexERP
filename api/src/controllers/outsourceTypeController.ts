import {
  createOutsourceType,
  getOutsourceTypeById,
  getAllOutsourceTypes,
  updateOutsourceType,
  deleteOutsourceType,
} from "../services/outsourceTypeServices";
import { Request, Response } from "express";

export const createOutsourceTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceType = await createOutsourceType(req.body);
    res.status(201).json(outsourceType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getOutsourceTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceType = await getOutsourceTypeById(Number(req.params.id));
    if (!outsourceType) {
      res.status(404).json({ message: "Outsource type not found" });
    }
    res.status(200).json(outsourceType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllOutsourceTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceTypes = await getAllOutsourceTypes();
    res.status(200).json(outsourceTypes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateOutsourceTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceType = await updateOutsourceType(
      Number(req.params.id),
      req.body
    );
    if (!outsourceType) {
      res.status(404).json({ message: "Outsource type not found" });
    }
    res.status(200).json(outsourceType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteOutsourceTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceType = await deleteOutsourceType(Number(req.params.id));
    if (!outsourceType) {
      res.status(404).json({ message: "Outsource type not found" });
    }
    res.status(200).json({ message: "Outsource type deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
