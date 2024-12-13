import exp from "constants";
import {
  createMachineType,
  deleteMachineType,
  getAllMachineTypes,
  getMachineTypeById,
  updateMachineType,
} from "../services/machineTypeService";
import { Request, Response } from "express";

export const getAllMachineTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const machineTypes = await getAllMachineTypes();
    res.json(machineTypes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMachineTypeByIdController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    const machineType = await getMachineTypeById(id);
    if (!machineType) {
      res.status(404).json({ error: "Machine type not found" });
    }
    res.json(machineType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createMachineTypeController = async (
  req: Request,
  res: Response
) => {
  const name = req.body.name;
  try {
    const machineType = await createMachineType(name);
    res.json(machineType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMachineTypeController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  try {
    await deleteMachineType(id);
    res.json({ message: "Machine type deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMachineTypeController = async (
  req: Request,
  res: Response
) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  try {
    await updateMachineType(id, name);
    res.json({ message: "Machine type updated" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
