import {
  createYarnType,
  deleteYarnType,
  getAllYarnTypes,
  getYarnTypeById,
  updateYarnType,
} from "../services/yarnTypeServices";
import { Request, Response } from "express";

export const getAllYarnTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnTypes = await getAllYarnTypes();
    res.json(yarnTypes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getYarnTypeByIdController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    const yarnType = await getYarnTypeById(id);
    res.json(yarnType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createYarnTypeController = async (req: Request, res: Response) => {
  try {
    const yarnType = await createYarnType(req.body);
    res.json(yarnType);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateYarnTypeController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const yarnType = await updateYarnType(id, req.body);
    res.json(yarnType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteYarnTypeController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const yarnType = await deleteYarnType(id);
    res.json(yarnType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
