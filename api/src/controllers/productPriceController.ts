import {
  createProductPrice,
  updateProductPrice,
  deleteProductPrice,
  getProductPriceById,
  getAllProductPrices,
} from "../services/productPriceServices";
import { Request, Response } from "express";

export const getAllProductPricesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productPrices = await getAllProductPrices();
    res.status(200).json(productPrices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product prices" });
  }
};

export const getProductPriceByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const productPrice = await getProductPriceById(parseInt(id));
    if (productPrice) {
      res.status(200).json(productPrice);
    } else {
      res.status(404).json({ error: "Product price not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product price" });
  }
};

export const createProductPriceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productPrice = await createProductPrice(req.body);
    res.status(201).json(productPrice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product price" });
  }
};

export const updateProductPriceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const productPrice = await updateProductPrice(parseInt(id), req.body);
    res.status(200).json(productPrice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update product price" });
  }
};

export const deleteProductPriceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteProductPrice(parseInt(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product price" });
  }
};
