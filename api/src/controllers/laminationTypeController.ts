import {
  createLaminationType,
  getLaminationTypeById,
  getAllLaminationTypes,
  updateLaminationType,
  deleteLaminationType,
} from "../services/laminationTypeServices";
import { Request, Response } from "express";

export const createLaminationTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationType = await createLaminationType(req.body);
    res.status(201).json(laminationType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getLaminationTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationType = await getLaminationTypeById(Number(req.params.id));
    if (!laminationType) {
      res.status(404).json({ message: "Lamination Type not found" });
    }
    res.status(200).json(laminationType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllLaminationTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationTypes = await getAllLaminationTypes();
    res.status(200).json(laminationTypes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateLaminationTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationType = await updateLaminationType(
      Number(req.params.id),
      req.body
    );
    if (!laminationType) {
      res.status(404).json({ message: "Lamination Type not found" });
    }
    res.status(200).json(laminationType);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteLaminationTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const laminationType = await deleteLaminationType(Number(req.params.id));
    if (!laminationType) {
      res.status(404).json({ message: "Lamination Type not found" });
    }
    res.status(200).json({ message: "Lamination Type deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
