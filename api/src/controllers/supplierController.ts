import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../services/supplierServices";

import { Request, Response } from "express";

export const createSupplierController = async (req: Request, res: Response) => {
  try {
    const supplier = await createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getSupplierByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const supplier = await getSupplierById(Number(req.params.id));
    if (!supplier) {
      res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllSuppliersController = async (
  req: Request,
  res: Response
) => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateSupplierController = async (req: Request, res: Response) => {
  try {
    const supplier = await updateSupplier(Number(req.params.id), req.body);
    if (!supplier) {
      res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteSupplierController = async (req: Request, res: Response) => {
  try {
    const supplier = await deleteSupplier(Number(req.params.id));
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
