import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomerComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await prisma.customerComplaint.findMany({
      include: {
        customer: true,
        product: true,
        dealingPersonnel: true,
        evaluatingPersonnel: true,
      },
    });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer complaints" });
  }
};

export const getCustomerComplaintById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const complaint = await prisma.customerComplaint.findUnique({
      where: { id: Number(id) },
      include: {
        product: true,
        dealingPersonnel: true,
        evaluatingPersonnel: true,
      },
    });
    if (complaint) {
      res.status(200).json(complaint);
    } else {
      res.status(404).json({ error: "Customer complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer complaint" });
  }
};

export const getCustomerComplaintByCustomer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const complaint = await prisma.customerComplaint.findMany({
      where: { customerId: Number(id) },
      include: {
        customer: true,
        product: true,
        dealingPersonnel: true,
        evaluatingPersonnel: true,
      },
    });
    if (complaint) {
      res.status(200).json(complaint);
    } else {
      res.status(404).json({ error: "Customer complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer complaint" });
  }
};

export const createCustomerComplaint = async (req: Request, res: Response) => {
  const {
    date,
    subject,
    productId,
    customerId,
    packagingDate,
    complaintDetails,
    dealingPersonnelId,
    dealingDate,
    evaluatingPersonnelId,
    actionTaken,
    result,
    orderId,
    lot,
    openDof,
    dofTo,
    nonconformityDescription,
  } = req.body;

  try {
    let newDof;
    if (openDof) {
      newDof = await prisma.dofiRequest.create({
        data: {
          date: date ? new Date(date) : new Date(),
          fromPersonnel: { connect: { id: dealingPersonnelId } },
          toPersonnel: { connect: { id: dofTo } },
          nonconformityDescription,
          reason: "Müşteri",
        },
      });
    }

    const newComplaint = await prisma.customerComplaint.create({
      data: {
        date: new Date(date),
        subject,
        product: { connect: { id: productId } },
        customer: { connect: { id: customerId } },
        packagingDate: packagingDate ? new Date(packagingDate) : null,
        complaintDetails,
        dealingPersonnel: { connect: { id: dealingPersonnelId } },
        dealingDate: new Date(dealingDate),
        evaluatingPersonnel: evaluatingPersonnelId
          ? { connect: { id: evaluatingPersonnelId } }
          : undefined,
        actionTaken,
        dofNo: newDof ? newDof.id : null,
        result,
        order: orderId ? { connect: { id: orderId } } : undefined,
        lot,
      },
    });
    res.status(201).json(newComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create customer complaint" });
  }
};

export const updateCustomerComplaint = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    date,
    subject,
    productId,
    customerId,
    packagingDate,
    complaintDetails,
    dealingPersonnelId,
    dealingDate,
    evaluatingPersonnelId,
    actionTaken,
    result,
    orderId,
    lot,
    openDof,
    dofTo,
    nonconformityDescription,
  } = req.body;

  try {
    const updatedComplaint = await prisma.customerComplaint.update({
      where: { id: Number(id) },
      data: {
        date: new Date(date),
        subject,
        product: { connect: { id: productId } },
        customer: { connect: { id: customerId } },
        packagingDate: packagingDate ? new Date(packagingDate) : null,
        complaintDetails,
        dealingPersonnel: { connect: { id: dealingPersonnelId } },
        dealingDate: new Date(dealingDate),
        evaluatingPersonnel: evaluatingPersonnelId
          ? { connect: { id: evaluatingPersonnelId } }
          : undefined,
        actionTaken,
        result,
        order: orderId ? { connect: { id: orderId } } : undefined,
        lot,
      },
    });
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer complaint" });
  }
};

export const deleteCustomerComplaint = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.customerComplaint.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer complaint" });
  }
};
