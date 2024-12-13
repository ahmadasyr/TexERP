import {
  createProductionOrderWrap,
  getProductionOrderWrapById,
  getAllProductionOrderWraps,
  updateProductionOrderWrap,
  deleteProductionOrderWrap,
} from "../services/productionOrderWrapServices";
import { Request, Response } from "express";

export const createProductionOrderWrapController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const productionOrderWrap = await createProductionOrderWrap(data);
    res.status(201).json(productionOrderWrap);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProductionOrderWrapByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const productionOrderWrap = await getProductionOrderWrapById(id);
    res.status(200).json(productionOrderWrap);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllProductionOrderWrapsController = async (
  req: Request,
  res: Response
) => {
  try {
    const productionOrderWraps = await getAllProductionOrderWraps();
    res.status(200).json(productionOrderWraps);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateProductionOrderWrapController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const productionOrderWrap = await updateProductionOrderWrap(id, data);
    res.status(200).json(productionOrderWrap);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProductionOrderWrapController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    await deleteProductionOrderWrap(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
