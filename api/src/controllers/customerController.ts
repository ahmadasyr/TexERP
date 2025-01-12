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
        account: true,
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
      include: {
        taxOffice: true,
        bank: true,
        currency: true,
        personnel: true,
      },
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
    firstOfferDate,
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
    const account: any = await prisma.account.create({
      data: {
        name: name,
        accountType: {
          connect: { code: "120" },
        },
        debit: 0,
        credit: 0,
        customer: {
          create: {
            name,
            foreign: Boolean(foreign),
            relatedPerson,
            title,
            email,
            phoneNumber,
            firstOfferDate: firstOfferDate ? new Date(firstOfferDate) : null,
            firstRegisterDate: firstRegisterDate
              ? new Date(firstRegisterDate)
              : undefined,
            status,
            returnDate: returnDate ? new Date(returnDate) : null,
            salesOpinion,
            creditNote,
            shippingMethod: shippingMethod || undefined,
            meterLimit,
            address,
            city,
            taxNumber,
            paymentKind,
            note,
            iban,
            swift,
            taxOffice: taxOfficeId
              ? { connect: { id: taxOfficeId } }
              : undefined,
            bank: bankId ? { connect: { id: bankId } } : undefined,
            currency: currencyId ? { connect: { id: currencyId } } : undefined,
            personnel: { connect: { id: personnelId } },
          },
        },
      },
    });

    res.status(201).json(account);
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
    firstOfferDate,
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
        name: name || undefined,
        foreign,
        relatedPerson,
        title,
        email,
        phoneNumber,
        firstOfferDate: firstOfferDate ? new Date(firstOfferDate) : undefined,
        personnel: {
          connect: { id: personnelId },
        },
        firstRegisterDate: firstRegisterDate
          ? new Date(firstRegisterDate)
          : undefined,
        status,
        returnDate: returnDate ? new Date(returnDate) : undefined,
        salesOpinion,
        creditNote,
        shippingMethod,
        meterLimit,
        address,
        city,
        taxOfficeId: taxOfficeId || undefined,
        taxNumber,
        paymentKind,
        note,
        bankId: bankId || undefined,
        currency: currencyId ? { connect: { id: currencyId } } : undefined,
        iban,
        swift,
        account: name
          ? {
              update: {
                name: name,
              },
            }
          : undefined,
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }
    if (customer.accountId) {
      await prisma.account.delete({
        where: { id: customer.accountId },
      });
    }
    await prisma.customer.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

export const getCustomerForSales = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        status: {
          not: "Kara Liste",
        },
      },
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};
