import {
  createMaterialStock,
  getAllMaterialStock,
  getMaterialStockById,
  updateMaterialStock,
  deleteMaterialStock,
  getMaterialStockByMaterialId,
  getMaterialStockByPurchaseOrderId,
  getMaterialStockByWarehouseId,
} from "../services/materialStockServices";

import { Request, Response } from "express";

export const createMaterialStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const materialStock = await createMaterialStock(data);
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllMaterialStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialStock = await getAllMaterialStock();
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMaterialStockByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const materialStock = await getMaterialStockById(id);
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateMaterialStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const materialStock = await updateMaterialStock(id, data);
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteMaterialStockController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    await deleteMaterialStock(id);
    res.json({ message: "Material stock deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMaterialStockByMaterialIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialId = parseInt(req.params.id);
    const materialStock = await getMaterialStockByMaterialId(materialId);
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMaterialStockByPurchaseOrderIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const purchaseOrderId = parseInt(req.params.id);
    const materialStock = await getMaterialStockByPurchaseOrderId(
      purchaseOrderId
    );
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMaterialStockByWarehouseIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouseId = parseInt(req.params.id);
    const materialStock = await getMaterialStockByWarehouseId(warehouseId);
    res.json(materialStock);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
