import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomerPrices = async (req: Request, res: Response) => {
  try {
    const customerPrices = await prisma.customerPrice.findMany({
      include: {
        product: true,
        currency: true,
        customer: true,
      },
    });
    res.status(200).json(customerPrices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer prices" });
  }
};

export const getCustomerPriceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customerPrice = await prisma.customerPrice.findUnique({
      where: { id: Number(id) },
    });
    if (customerPrice) {
      res.status(200).json(customerPrice);
    } else {
      res.status(404).json({ error: "Customer price not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer price" });
  }
};

export const getCustomerPriceByCustomer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const customerPrice = await prisma.customerPrice.findMany({
      where: { customerId: Number(id) },
      include: {
        product: true,
        currency: true,
        customer: true,
      },
    });
    if (customerPrice) {
      res.status(200).json(customerPrice);
    } else {
      res.status(404).json({ error: "Customer price not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer price" });
  }
};

export const createCustomerPrice = async (req: Request, res: Response) => {
  const {
    date,
    customerId,
    productId,
    currencyId,
    price,
    unit,
    upfront,
    installment,
    personnelId,
  } = req.body;
  try {
    const newCustomerPrice = await prisma.customerPrice.create({
      data: {
        date: new Date(date),
        customer: { connect: { id: customerId } },
        product: { connect: { id: productId } },
        currency: { connect: { id: currencyId } },
        personnel: { connect: { id: personnelId } },
        price,
        upfront,
        installment,
        unit,
      },
    });
    res.status(201).json(newCustomerPrice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create customer price" });
  }
};

export const updateCustomerPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    date,
    customerId,
    productId,
    currencyId,
    price,
    unit,
    upfront,
    installment,
    personnelId,
  } = req.body;
  try {
    const updatedCustomerPrice = await prisma.customerPrice.update({
      where: { id: Number(id) },
      data: {
        date: new Date(date),
        personnel: { connect: { id: personnelId } },
        customer: { connect: { id: customerId } },
        currency: { connect: { id: currencyId } },
        product: { connect: { id: productId } },
        price,
        upfront,
        installment,
        unit,
      },
    });
    res.status(200).json(updatedCustomerPrice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update customer price" });
  }
};

export const deleteCustomerPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customerPrice.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete customer price" });
  }
};
