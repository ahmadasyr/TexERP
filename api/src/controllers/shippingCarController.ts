import {
  createShippingCar,
  getAllShippingCars,
  getShippingCarById,
  updateShippingCar,
  deleteShippingCar,
} from "../services/shippingCarServices";
import { Request, Response } from "express";

export const createShippingCarController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCar = await createShippingCar(req.body);
    res.status(201).json(shippingCar);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllShippingCarsController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCars = await getAllShippingCars();
    res.status(200).json(shippingCars);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getShippingCarByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCar = await getShippingCarById(Number(req.params.id));
    res.status(200).json(shippingCar);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateShippingCarController = async (
  req: Request,
  res: Response
) => {
  try {
    const shippingCar = await updateShippingCar(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(shippingCar);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const deleteShippingCarController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteShippingCar(Number(req.params.id));
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
