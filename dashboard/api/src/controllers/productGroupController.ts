import {
  createProductGroup,
  getProductGroupById,
  getAllProductGroups,
  updateProductGroup,
  deleteProductGroup,
} from "../services/productGroupServices";
import { Request, Response } from "express";

export const createProductGroupController = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;
  try {
    const productGroup = await createProductGroup(name);
    res.status(201).json(productGroup);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProductGroupByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const productGroup = await getProductGroupById(parseInt(id));
    res.status(200).json(productGroup);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllProductGroupsController = async (
  req: Request,
  res: Response
) => {
  try {
    const productGroups = await getAllProductGroups();
    res.status(200).json(productGroups);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProductGroupController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const productGroup = await updateProductGroup(parseInt(id), name);
    res.status(200).json(productGroup);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProductGroupController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await deleteProductGroup(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
