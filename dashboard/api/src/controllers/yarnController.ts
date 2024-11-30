import {
  createYarnStockEntry,
  deleteYarnStockEntry,
  getAllYarnStockEntries,
  getYarnStockEntryById,
  updateYarnStockEntry,
  getStockEntriesByYarnTypeId,
  submitMultipleYarnStockEntriesByYarnTypeId,
} from "../services/yarnServices";
import { Request, Response } from "express";

export const getAllYarnStockEntriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnStockEntries = await getAllYarnStockEntries();
    res.json(yarnStockEntries);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getYarnStockEntryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const yarnStockEntry = await getYarnStockEntryById(id);
    res.json(yarnStockEntry);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createYarnStockEntryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const yarnStockEntry = await createYarnStockEntry(data);
    res.json(yarnStockEntry);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateYarnStockEntryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const yarnStockEntry = await updateYarnStockEntry(id, data);
    res.json(yarnStockEntry);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteYarnStockEntryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    await deleteYarnStockEntry(id);
    res.json({ message: "Yarn stock entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getStockEntriesByYarnTypeIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnTypeId = Number(req.params.yarnTypeId);
    const stockEntries = await getStockEntriesByYarnTypeId(yarnTypeId);
    res.json(stockEntries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const submitMultipleYarnStockEntriesByYarnTypeIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const yarnTypeId = Number(req.params.yarnTypeId);
    const data = req.body;
    const stockEntries = await submitMultipleYarnStockEntriesByYarnTypeId(data);
    res.json(stockEntries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
