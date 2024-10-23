import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        taxOffice: true,
        bank: true,
        currency: true,
        personnel: true,
      },
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    foreign,
    relatedPerson,
    title,
    email,
    phoneNumber,
    firstOffer,
    personnelId,
    firstRegisterDate,
    status,
    returnDate,
    salesOpinion,
    creditNote,
    shippingMethod,
    meterLimit,
    address,
    city,
    taxOfficeId,
    taxNumber,
    paymentKind,
    note,
    bankId,
    currencyId,
    iban,
    swift,
  } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        foreign,
        relatedPerson,
        title,
        email,
        phoneNumber,
        firstOffer: new Date(firstOffer),
        personnelId,
        firstRegisterDate: new Date(firstRegisterDate),
        status,
        returnDate: new Date(returnDate),
        salesOpinion,
        creditNote,
        shippingMethod,
        meterLimit,
        address,
        city,
        taxNumber,
        paymentKind,
        note,
        iban,
        swift,
        taxOffice: {
          connect: { id: taxOfficeId },
        },
        bank: {
          connect: { id: bankId },
        },
        currency: {
          connect: { id: currencyId },
        },
        personnel: {
          connect: { id: personnelId },
        },
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    foreign,
    relatedPerson,
    title,
    email,
    phoneNumber,
    firstOffer,
    personnelId,
    firstRegisterDate,
    status,
    returnDate,
    salesOpinion,
    creditNote,
    shippingMethod,
    meterLimit,
    address,
    city,
    taxOfficeId,
    taxNumber,
    paymentKind,
    note,
    bankId,
    currencyId,
    iban,
    swift,
  } = req.body;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name,
        foreign,
        relatedPerson,
        title,
        email,
        phoneNumber,
        firstOffer: new Date(firstOffer),
        personnelId,
        firstRegisterDate: new Date(firstRegisterDate),
        status,
        returnDate: new Date(returnDate),
        salesOpinion,
        creditNote,
        shippingMethod,
        meterLimit,
        address,
        city,
        taxOfficeId,
        taxNumber,
        paymentKind,
        note,
        bankId,
        currencyId,
        iban,
        swift,
      },
    });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
