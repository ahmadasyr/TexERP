import {
  createShippingCarrierController,
  getAllShippingCarriersController,
  getShippingCarrierByIdController,
  updateShippingCarrierController,
  deleteShippingCarrierController,
} from "../controllers/shippingCarrierController";
import { Router } from "express";

const router = Router();

router.get("/", getAllShippingCarriersController);
router.post("/", createShippingCarrierController);
router.get("/:id", getShippingCarrierByIdController);
router.put("/:id", updateShippingCarrierController);
router.delete("/:id", deleteShippingCarrierController);

export default router;
