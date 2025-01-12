import { NextFunction, Request, RequestHandler, Response } from "express";
const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { generateToken } from "../services/authServices";

export const register: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const personnel = await prisma.personnel.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      },
    });

    const token = generateToken(personnel);
    res.status(201).json({ token, personnel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating personnel", error });
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const personnel = await prisma.personnel.findUnique({
      where: { username },
    });
    if (!personnel) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, personnel.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = generateToken(personnel);
    res.status(200).json({ token, personnel });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.personnel
      .update({
        where: { username },
        data: { password: hashedPassword },
      })
      .then((personnel) => {
        const token = generateToken(personnel);
        res.status(200).json({ token, personnel });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error updating password", error });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating password", error });
  }
};
