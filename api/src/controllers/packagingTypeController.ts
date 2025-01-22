import {
  createPackagingType,
  deletePackagingType,
  getAllPackagingTypes,
  getPackagingTypeById,
  updatePackagingType,
} from "../services/packagingTypeServices";

import { Request, Response } from "express";

export const getAllPackagingTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const packagingTypes = await getAllPackagingTypes();
    res.json(packagingTypes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPackagingTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const packagingType = await getPackagingTypeById(id);
    res.json(packagingType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createPackagingTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const newPackagingType = await createPackagingType(data);
    res.json(newPackagingType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePackagingTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updatedPackagingType = await updatePackagingType(id, data);
    res.json(updatedPackagingType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deletePackagingTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const deletedPackagingType = await deletePackagingType(id);
    res.json(deletedPackagingType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
