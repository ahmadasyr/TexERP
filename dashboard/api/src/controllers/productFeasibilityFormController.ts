import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProductFeasibilityForms = async (
  req: Request,
  res: Response
) => {
  try {
    const forms = await prisma.productFeasibilityForm.findMany();
    res.status(200).json(forms);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch product feasibility forms" });
  }
};

export const getProductFeasibilityFormById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const form = await prisma.productFeasibilityForm.findUnique({
      where: { id: Number(id) },
    });
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ error: "Product feasibility form not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product feasibility form" });
  }
};

export const getProductFeasibilityFormByCustomer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const form = await prisma.productFeasibilityForm.findMany({
      where: { customerId: Number(id) },
    });
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ error: "Product feasibility form not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product feasibility form" });
  }
};

export const createProductFeasibilityForm = async (
  req: Request,
  res: Response
) => {
  try {
    const newForm = await prisma.productFeasibilityForm.create({
      data: req.body,
    });
    res.status(201).json(newForm);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create product feasibility form" });
  }
};

export const updateProductFeasibilityForm = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const updatedForm = await prisma.productFeasibilityForm.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedForm);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update product feasibility form" });
  }
};

export const deleteProductFeasibilityForm = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await prisma.productFeasibilityForm.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete product feasibility form" });
  }
};
