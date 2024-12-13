import {
  createMachine,
  deleteMachine,
  getMachineById,
  getMachines,
  updateMachine,
} from "../services/machineServices";
import { Request, Response } from "express";

export const getMachinesController = async (req: Request, res: Response) => {
  try {
    const machines = await getMachines();
    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getMachineByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const machine = await getMachineById(id);
    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createMachineController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const machine = await createMachine(data);
    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateMachineController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const machine = await updateMachine(id, data);
    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteMachineController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteMachine(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
