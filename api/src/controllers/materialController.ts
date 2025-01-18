import {
  createMaterial,
  getMaterialById,
  getAllMaterials,
  updateMaterial,
  deleteMaterial,
  getMaterialByCategory,
} from "../services/materialServices";
import { Request, Response } from "express";

export const createMaterialController = async (req: Request, res: Response) => {
  try {
    const material = await createMaterial(req.body);
    res.status(201).json(material);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getMaterialByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const material = await getMaterialById(Number(req.params.id));
    if (!material) {
      res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllMaterialsController = async (
  req: Request,
  res: Response
) => {
  try {
    const materials = await getAllMaterials();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMaterialController = async (req: Request, res: Response) => {
  try {
    const material = await updateMaterial(Number(req.params.id), req.body);
    if (!material) {
      res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMaterialController = async (req: Request, res: Response) => {
  try {
    const material = await deleteMaterial(Number(req.params.id));
    if (!material) {
      res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMaterialByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const materials = await getMaterialByCategory(
      Number(req.params.categoryId)
    );
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
