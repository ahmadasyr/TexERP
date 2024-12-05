import {
  createShippingCompany,
  getShippingCompanyById,
  getAllShippingCompanies,
  updateShippingCompany,
  deleteShippingCompany,
} from "../services/shippingCompanyServices";

import { Request, Response } from "express";

export const createShippingCompanyController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCompany = await createShippingCompany(req.body);
    res.status(201).json(shippingCompany);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllShippingCompaniesController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCompanies = await getAllShippingCompanies();
    res.status(200).json(shippingCompanies);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShippingCompanyByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCompany = await getShippingCompanyById(Number(req.params.id));
    res.status(200).json(shippingCompany);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateShippingCompanyController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCompany = await updateShippingCompany(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(shippingCompany);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteShippingCompanyController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteShippingCompany(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
