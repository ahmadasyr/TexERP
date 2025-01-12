import {
  createDof,
  getAllDofs,
  getDof,
  updateDof,
  deleteDof,
} from "../services/dofSevices";

import { Request, Response } from "express";

export const createDofController = async (req: Request, res: Response) => {
  try {
    const dof = await createDof(req.body);
    res.status(201).json(dof);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getDofController = async (req: Request, res: Response) => {
  try {
    const dof = await getDof(Number(req.params.id));
    res.status(200).json(dof);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const getAllDofsController = async (req: Request, res: Response) => {
  try {
    const dofs = await getAllDofs();
    res.status(200).json(dofs);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const updateDofController = async (req: Request, res: Response) => {
  try {
    const dof = await updateDof(Number(req.params.id), req.body);
    res.status(200).json(dof);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const deleteDofController = async (req: Request, res: Response) => {
  try {
    const dof = await deleteDof(Number(req.params.id));
    res.status(200).json(dof);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
