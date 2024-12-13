import {
  createWrapGroup,
  getWrapGroupById,
  getAllWrapGroups,
  updateWrapGroup,
  deleteWrapGroup,
} from "../services/wrapGroupServices";
import { Request, Response } from "express";

export const createWrapGroupController = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;
  try {
    const wrapGroup = await createWrapGroup(name);
    res.status(201).json(wrapGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getWrapGroupByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const wrapGroup = await getWrapGroupById(parseInt(id));
    res.status(200).json(wrapGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllWrapGroupsController = async (
  req: Request,
  res: Response
) => {
  try {
    const wrapGroups = await getAllWrapGroups();
    res.status(200).json(wrapGroups);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateWrapGroupController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const wrapGroup = await updateWrapGroup(parseInt(id), name);
    res.status(200).json(wrapGroup);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteWrapGroupController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await deleteWrapGroup(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
