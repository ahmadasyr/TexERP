import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomerMeetPlans = async (req: Request, res: Response) => {
  try {
    const customerMeetPlans = await prisma.customerMeetPlan.findMany({
      include: {
        customerMeetPlanAttendee: {
          include: {
            personnel: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        customerMeetPlanCustomer: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
      include: {
        customerMeetPlanAttendee: {
          include: {
            personnel: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        customerMeetPlanCustomer: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
      where: { customerMeetPlanCustomer: { some: { customerId: Number(id) } } },
      include: {
        customerMeetPlanAttendee: {
          include: {
            personnel: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        customerMeetPlanCustomer: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
    location,
    visitReason,
    plannedDate,
    realDate,
    returnDate,
    result,
    note,
    travelExpense,
    accommodationExpense,
    foodExpense,
    giftExpense,
    officeExpense,
    customerMeetPlanAttendee,
    customerMeetPlanCustomer,
  }: {
    location: string;
    visitReason: string;
    plannedDate: string;
    realDate?: string;
    returnDate?: string;
    result?: string;
    note?: string;
    travelExpense?: number;
    accommodationExpense?: number;
    foodExpense?: number;
    giftExpense?: number;
    officeExpense?: number;
    customerMeetPlanAttendee: Array<Number>;
    customerMeetPlanCustomer: Array<{ customerId: Number; note?: string }>;
  } = req.body;

  try {
    const newCustomerMeetPlan = await prisma.customerMeetPlan.create({
      data: {
        location,
        visitReason,
        plannedDate: new Date(plannedDate),
        realDate: realDate ? new Date(realDate) : null,
        returnDate: returnDate ? new Date(returnDate) : null,
        result,
        note,
        travelExpense,
        accommodationExpense,
        foodExpense,
        giftExpense,
        officeExpense,
        customerMeetPlanAttendee: customerMeetPlanAttendee
          ? {
              create: customerMeetPlanAttendee.map((attendee) => ({
                personnel: { connect: { id: Number(attendee) } },
              })),
            }
          : undefined,
        customerMeetPlanCustomer: customerMeetPlanCustomer
          ? {
              create: customerMeetPlanCustomer.map((customer) => ({
                customer: { connect: { id: Number(customer.customerId) } },
                note: customer.note,
              })),
            }
          : undefined,
      },
    });
    res.status(201).json(newCustomerMeetPlan);
  } catch (error) {
    console.error("Error creating customer meet plan:", error);
    res.status(500).json({ error: "Failed to create customer meet plan" });
  }
};

export const updateCustomerMeetPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    location,
    visitReason,
    plannedDate,
    realDate,
    returnDate,
    result,
    note,
    travelExpense,
    accommodationExpense,
    foodExpense,
    giftExpense,
    officeExpense,
    customerMeetPlanAttendee,
    customerMeetPlanCustomer,
  }: {
    location: string;
    visitReason: string;
    plannedDate: string;
    realDate?: string;
    returnDate?: string;
    result?: string;
    note?: string;
    travelExpense?: number;
    accommodationExpense?: number;
    foodExpense?: number;
    giftExpense?: number;
    officeExpense?: number;
    customerMeetPlanAttendee: Array<Number>;
    customerMeetPlanCustomer: Array<{ customerId: Number; note?: string }>;
  } = req.body;

  try {
    const updatedCustomerMeetPlan = await prisma.customerMeetPlan.update({
      where: { id: Number(id) },
      data: {
        location,
        visitReason,
        plannedDate: new Date(plannedDate),
        realDate: realDate ? new Date(realDate) : null,
        returnDate: returnDate ? new Date(returnDate) : null,
        result,
        note,
        travelExpense,
        accommodationExpense,
        foodExpense,
        giftExpense,
        officeExpense,
        customerMeetPlanAttendee: customerMeetPlanAttendee
          ? {
              deleteMany: {
                personnelId: {
                  notIn: customerMeetPlanAttendee.map((attendee) =>
                    Number(attendee)
                  ),
                },
              },
              upsert: customerMeetPlanAttendee.map((attendee) => ({
                where: {
                  customerMeetPlanId_personnelId: {
                    customerMeetPlanId: Number(id),
                    personnelId: Number(attendee),
                  },
                },
                create: { personnel: { connect: { id: Number(attendee) } } },
                update: {},
              })),
            }
          : {
              deleteMany: { id: { notIn: [] } },
            },
        customerMeetPlanCustomer: customerMeetPlanCustomer
          ? {
              deleteMany: {
                customerId: {
                  notIn: customerMeetPlanCustomer.map((customer) =>
                    Number(customer.customerId)
                  ),
                },
              },
              upsert: customerMeetPlanCustomer.map((customer) => ({
                where: {
                  customerId_customerMeetPlanId: {
                    customerId: Number(customer.customerId),
                    customerMeetPlanId: Number(id),
                  },
                },
                create: {
                  customer: { connect: { id: Number(customer.customerId) } },
                  note: customer.note,
                },
                update: { note: customer.note },
              })),
            }
          : {
              deleteMany: { id: { notIn: [] } },
            },
      },
    });
    res.status(200).json(updatedCustomerMeetPlan);
  } catch (error) {
    console.error("Error updating customer meet plan:", error);
    res.status(500).json({ error: "Failed to update customer meet plan" });
  }
};

export const deleteCustomerMeetPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customerMeetPlanAttendee.deleteMany({
      where: { customerMeetPlanId: Number(id) },
    });
    await prisma.customerMeetPlanCustomer.deleteMany({
      where: { customerMeetPlanId: Number(id) },
    });
    await prisma.customerMeetPlan.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer meet plan" });
  }
};
