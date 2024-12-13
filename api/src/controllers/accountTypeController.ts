import {
  createAccountType,
  deleteAccountType,
  getAllAccountTypes,
  getAccountTypeById,
  updateAccountType,
} from "../services/accountTypeServices";
import { Request, Response } from "express";

export const getAllAccountTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const accountTypes = await getAllAccountTypes();
    res.json(accountTypes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAccountTypeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const accountType = await getAccountTypeById(Number(req.params.id));
    res.json(accountType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createAccountTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const accountType = await createAccountType(req.body.name);
    res.json(accountType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateAccountTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const accountType = await updateAccountType(
      Number(req.params.id),
      req.body.name
    );
    res.json(accountType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteAccountTypeController = async (
  req: Request,
  res: Response
) => {
  try {
    const accountType = await deleteAccountType(Number(req.params.id));
    res.json(accountType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
