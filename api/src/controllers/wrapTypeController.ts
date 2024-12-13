import {
  createWrapType,
  deleteWrapType,
  getWrapTypeById,
  getWrapTypes,
  updateWrapType,
} from "../services/wrapTypeServices";
import { Request, Response } from "express";

export const getWrapTypesController = async (req: Request, res: Response) => {
  try {
    const wrapTypes = await getWrapTypes();
    res.json(wrapTypes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getWrapTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const wrapType = await getWrapTypeById(Number(req.params.id));
    res.json(wrapType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createWrapTypeController = async (req: Request, res: Response) => {
  try {
    const wrapType = await createWrapType(req.body);
    res.json(wrapType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteWrapTypeController = async (req: Request, res: Response) => {
  try {
    const wrapType = await deleteWrapType(Number(req.params.id));
    res.json(wrapType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateWrapTypeController = async (req: Request, res: Response) => {
  try {
    const wrapType = await updateWrapType(Number(req.params.id), req.body);
    res.json(wrapType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
