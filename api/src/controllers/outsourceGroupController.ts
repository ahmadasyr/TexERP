import {
  createOutsourceGroup,
  getOutsourceGroupById,
  getAllOutsourceGroups,
  updateOutsourceGroup,
  deleteOutsourceGroup,
} from "../services/outsourceGroupServices";
import { Request, Response } from "express";

export const createOutsourceGroupController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceGroup = await createOutsourceGroup(req.body);
    res.status(201).json(outsourceGroup);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getOutsourceGroupByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceGroup = await getOutsourceGroupById(Number(req.params.id));
    if (!outsourceGroup) {
      res.status(404).json({ message: "Outsource Group not found" });
    }
    res.status(200).json(outsourceGroup);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllOutsourceGroupsController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceGroups = await getAllOutsourceGroups();
    res.status(200).json(outsourceGroups);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateOutsourceGroupController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceGroup = await updateOutsourceGroup(
      Number(req.params.id),
      req.body
    );
    if (!outsourceGroup) {
      res.status(404).json({ message: "Outsource Group not found" });
    }
    res.status(200).json(outsourceGroup);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteOutsourceGroupController = async (
  req: Request,
  res: Response
) => {
  try {
    const outsourceGroup = await deleteOutsourceGroup(Number(req.params.id));
    if (!outsourceGroup) {
      res.status(404).json({ message: "Outsource Group not found" });
    }
    res.status(200).json({ message: "Outsource Group deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
