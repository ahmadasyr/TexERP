import {
  createPurchaseOrderController,
  deletePurchaseOrderController,
  getPurchaseOrderController,
  getPurchaseOrdersController,
  updatePurchaseOrderController,
  setPurchaseOrderStatusController,
  getPurchaseOrdersByPersonnelController,
  getItemDetailsController,
} from "../controllers/purchaseOrderController";
import { Router } from "express";

const router = Router();

router.get("/", getPurchaseOrdersController);
router.get("/:id", getPurchaseOrderController);
router.get("/personnel/:id", getPurchaseOrdersByPersonnelController);
router.get("/item/:id", getItemDetailsController);
router.post("/", createPurchaseOrderController);
router.put("/status/:id", setPurchaseOrderStatusController);
router.put("/:id", updatePurchaseOrderController);
router.delete("/:id", deletePurchaseOrderController);
export default router;
