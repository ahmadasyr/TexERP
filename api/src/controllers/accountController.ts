import {
  createAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
  deleteAccount,
  getAccountByProperties,
} from "../services/accountServices";
import { Request, Response } from "express";

export const createAccountController = async (req: Request, res: Response) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAccountByIdController = async (req: Request, res: Response) => {
  try {
    const account = await getAccountById(Number(req.params.id));
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllAccountsController = async (_: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateAccountController = async (req: Request, res: Response) => {
  try {
    const account = await updateAccount(Number(req.params.id), req.body);
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteAccountController = async (req: Request, res: Response) => {
  try {
    await deleteAccount(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAccountByPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { outsource, dye, yarn, buys } = req.params;
    const outsourceBool = outsource === "1";
    const dyeBool = dye === "1";
    const yarnBool = yarn === "1";
    const buysBool = buys === "1";
    const accounts = await getAccountByProperties(
      outsourceBool,
      dyeBool,
      yarnBool,
      buysBool
    );
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};