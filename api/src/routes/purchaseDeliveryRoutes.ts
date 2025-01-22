import {
  createPurchaseDeliveryController,
  getPurchaseDeliveriesController,
  getPurchaseDeliveryByIdController,
  deletePurchaseDeliveryController,
  updatePurchaseDeliveryController,
} from "../controllers/purchaseDeliveryController";

import { Router } from "express";

const router = Router();

router.post("/", createPurchaseDeliveryController);
router.get("/", getPurchaseDeliveriesController);
router.get("/:id", getPurchaseDeliveryByIdController);
router.put("/:id", updatePurchaseDeliveryController);
router.delete("/:id", deletePurchaseDeliveryController);

export default router;
