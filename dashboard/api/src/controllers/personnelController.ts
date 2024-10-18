import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all personnel
export const getPersonnels = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const personnel = await prisma.personnel.findMany();
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving personnel" });
  }
};

// Get personnel by ID
export const getPersonnelById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const personnel = await prisma.personnel.findUnique({
      where: { id: parseInt(id) },
    });
    if (personnel) {
      res.json(personnel);
    } else {
      res.status(404).json({ error: "Personnel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving personnel" });
  }
};

export const getSalesPersonnel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const personnel = await prisma.personnel.findMany({
      where: { handleSales: true },
    });
    if (personnel.length > 0) {
      res.json(personnel);
    } else {
      res.status(404).json({ error: "No sales personnel exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving personnel" });
  }
};

// Create new personnel
export const createPersonnel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    firstname,
    lastname,
    position,
    department,
    dateofhire,
    email,
    phone,
    handleComplaints,
    handleSales,
  } = req.body;
  try {
    const newPersonnel = await prisma.personnel.create({
      data: {
        firstname,
        lastname,
        position,
        department,
        dateofhire,
        email,
        phone,
        handleComplaints,
        handleSales,
      },
    });
    res.status(201).json(newPersonnel);
  } catch (error) {
    res.status(500).json({ error: "Error creating personnel" });
  }
};

// Update personnel by ID
export const updatePersonnel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    position,
    department,
    dateofhire,
    email,
    phone,
    handleComplaints,
    handleSales,
  } = req.body;
  try {
    const updatedPersonnel = await prisma.personnel.update({
      where: { id: parseInt(id) },
      data: {
        firstname,
        lastname,
        position,
        department,
        dateofhire,
        email,
        phone,
        handleComplaints,
        handleSales,
      },
    });
    res.json(updatedPersonnel);
  } catch (error) {
    res.status(500).json({ error: "Error updating personnel" });
  }
};

// Delete personnel by ID
export const deletePersonnel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.personnel.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting personnel" });
  }
};