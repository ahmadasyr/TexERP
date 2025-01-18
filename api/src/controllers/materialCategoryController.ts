import {
  createMaterialCategory,
  getMaterialCategoryById,
  getAllMaterialCategories,
  updateMaterialCategory,
  deleteMaterialCategory,
} from "../services/materialCategoryServices";
import { Request, Response } from "express";

export const createMaterialCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialCategory = await createMaterialCategory(req.body);
    res.status(201).json(materialCategory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getMaterialCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialCategory = await getMaterialCategoryById(
      Number(req.params.id)
    );
    if (!materialCategory) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json(materialCategory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllMaterialCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialCategorys = await getAllMaterialCategories();
    res.status(200).json(materialCategorys);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateMaterialCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialCategory = await updateMaterialCategory(
      Number(req.params.id),
      req.body
    );
    if (!materialCategory) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json(materialCategory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteMaterialCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const materialCategory = await deleteMaterialCategory(
      Number(req.params.id)
    );
    if (!materialCategory) {
      res.status(404).json({ message: "Dye color not found" });
    }
    res.status(200).json({ message: "Dye color deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
