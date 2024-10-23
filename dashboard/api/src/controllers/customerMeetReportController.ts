import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCustomerMeetReports = async (
  req: Request,
  res: Response
) => {
  try {
    const reports = await prisma.customerMeetReport.findMany();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer meet reports" });
  }
};

export const getCustomerMeetReportById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const report = await prisma.customerMeetReport.findUnique({
      where: { id: Number(id) },
    });
    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: "Customer meet report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer meet report" });
  }
};

export const createCustomerMeetReport = async (req: Request, res: Response) => {
  const {
    revisionDate,
    meetDate,
    personnelId,
    visitReason,
    customerId,
    city,
    district,
    peopleMet,
    wayOfMeeting,
    contentsOfMeeting,
    customerNote,
    responseToCustomer,
  } = req.body;

  try {
    const newReport = await prisma.customerMeetReport.create({
      data: {
        revisionDate: new Date(revisionDate),
        meetDate: new Date(meetDate),
        personnelId,
        visitReason,
        customerId,
        city,
        district,
        peopleMet,
        wayOfMeeting,
        contentsOfMeeting,
        customerNote,
        responseToCustomer,
      },
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer meet report" });
  }
};

export const updateCustomerMeetReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    revisionDate,
    meetDate,
    personnelId,
    visitReason,
    customerId,
    city,
    district,
    peopleMet,
    wayOfMeeting,
    contentsOfMeeting,
    customerNote,
    responseToCustomer,
  } = req.body;

  try {
    const updatedReport = await prisma.customerMeetReport.update({
      where: { id: Number(id) },
      data: {
        revisionDate: new Date(revisionDate),
        meetDate: new Date(meetDate),
        personnelId,
        visitReason,
        customerId,
        city,
        district,
        peopleMet,
        wayOfMeeting,
        contentsOfMeeting,
        customerNote,
        responseToCustomer,
      },
    });
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer meet report" });
  }
};

export const deleteCustomerMeetReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customerMeetReport.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer meet report" });
  }
};
