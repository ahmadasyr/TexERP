import {
  createLaminationColor,
  getLaminationColorById,
  getAllLaminationColors,
  updateLaminationColor,
  deleteLaminationColor,
} from "../services/laminationColorServices";
import { Request, Response } from "express";

export const createLaminationColorController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationColor = await createLaminationColor(req.body);
    res.status(201).json(laminationColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getLaminationColorByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationColor = await getLaminationColorById(Number(req.params.id));
    if (!laminationColor) {
      res.status(404).json({ message: "Lamination color not found" });
    }
    res.status(200).json(laminationColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllLaminationColorsController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationColors = await getAllLaminationColors();
    res.status(200).json(laminationColors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateLaminationColorController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationColor = await updateLaminationColor(
      Number(req.params.id),
      req.body
    );
    if (!laminationColor) {
      res.status(404).json({ message: "Lamination color not found" });
    }
    res.status(200).json(laminationColor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteLaminationColorController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationColor = await deleteLaminationColor(Number(req.params.id));
    if (!laminationColor) {
      res.status(404).json({ message: "Lamination color not found" });
    }
    res.status(200).json({ message: "Lamination color deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
