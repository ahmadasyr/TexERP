import {
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
} from "../services/warehouseServices";

import { Request, Response } from "express";

export const getAllWarehousesController = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouses = await getAllWarehouses();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getWarehouseByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouse = await getWarehouseById(Number(req.params.id));
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createWarehouseController = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouse = await createWarehouse(req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateWarehouseController = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouse = await updateWarehouse(Number(req.params.id), req.body);
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteWarehouseController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteWarehouse(Number(req.params.id));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
