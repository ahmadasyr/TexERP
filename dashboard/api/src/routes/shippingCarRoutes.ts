import {
  createShippingCarController,
  getAllShippingCarsController,
  getShippingCarByIdController,
  updateShippingCarController,
  deleteShippingCarController,
} from "../controllers/shippingCarController";
import { Router } from "express";

const router = Router();

router.get("/", getAllShippingCarsController);
router.post("/", createShippingCarController);
router.get("/:id", getShippingCarByIdController);
router.put("/:id", updateShippingCarController);
router.delete("/:id", deleteShippingCarController);

export default router;
