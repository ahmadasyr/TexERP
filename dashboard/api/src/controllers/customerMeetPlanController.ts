import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomerMeetPlans = async (req: Request, res: Response) => {
  try {
    const customerMeetPlans = await prisma.customerMeetPlan.findMany({
      include: { customer: true },
    });
    res.status(200).json(customerMeetPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer meet plans" });
  }
};

export const getCustomerMeetPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customerMeetPlan = await prisma.customerMeetPlan.findUnique({
      where: { id: Number(id) },
    });
    if (customerMeetPlan) {
      res.status(200).json(customerMeetPlan);
    } else {
      res.status(404).json({ error: "Customer meet plan not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer meet plan" });
  }
};

export const getCustomerMeetPlanByCustomer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const customerMeetPlan = await prisma.customerMeetPlan.findMany({
      where: { customerId: Number(id) },
      include: { customer: true },
    });
    if (customerMeetPlan) {
      res.status(200).json(customerMeetPlan);
    } else {
      res.status(404).json({ error: "Customer meet plan not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer meet plan" });
  }
};

export const createCustomerMeetPlan = async (req: Request, res: Response) => {
  const {
    customerId,
    country,
    visitReason,
    plannedDate,
    realDate,
    visitingPersonnelId,
    result,
    accuracyRate,
    note,
    travelExpense,
    accommodationExpense,
    foodExpense,
    giftExpense,
    officeExpense,
  } = req.body;

  try {
    const newCustomerMeetPlan = await prisma.customerMeetPlan.create({
      data: {
        customerId,
        country,
        visitReason,
        plannedDate: new Date(plannedDate),
        realDate: new Date(realDate),
        visitingPersonnelId,
        result,
        accuracyRate,
        note,
        travelExpense,
        accommodationExpense,
        foodExpense,
        giftExpense,
        officeExpense,
      },
    });
    res.status(201).json(newCustomerMeetPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer meet plan" });
  }
};

export const updateCustomerMeetPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    customerId,
    country,
    visitReason,
    plannedDate,
    realDate,
    visitingPersonnelId,
    result,
    accuracyRate,
    note,
    travelExpense,
    accommodationExpense,
    foodExpense,
    giftExpense,
    officeExpense,
  } = req.body;

  try {
    const updatedCustomerMeetPlan = await prisma.customerMeetPlan.update({
      where: { id: Number(id) },
      data: {
        customerId,
        country,
        visitReason,
        plannedDate: new Date(plannedDate),
        realDate: new Date(realDate),
        visitingPersonnelId,
        result,
        accuracyRate,
        note,
        travelExpense,
        accommodationExpense,
        foodExpense,
        giftExpense,
        officeExpense,
      },
    });
    res.status(200).json(updatedCustomerMeetPlan);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer meet plan" });
  }
};

export const deleteCustomerMeetPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customerMeetPlan.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer meet plan" });
  }
};
