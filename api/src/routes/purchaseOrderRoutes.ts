import {
  createPurchaseOrderController,
  deletePurchaseOrderController,
  getPurchaseOrderController,
  getPurchaseOrdersController,
  updatePurchaseOrderController,
  setPurchaseOrderStatusController,
} from "../controllers/purchaseOrderController";
import { Router } from "express";

const router = Router();

router.get("/", getPurchaseOrdersController);
router.get("/:id", getPurchaseOrderController);
router.post("/", createPurchaseOrderController);
router.put("/status/:id", setPurchaseOrderStatusController);
router.put("/:id", updatePurchaseOrderController);
router.delete("/:id", deletePurchaseOrderController);
export default router;
