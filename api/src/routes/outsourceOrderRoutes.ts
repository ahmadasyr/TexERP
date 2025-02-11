import {
  createOutsourceOrderController,
  updateOutsourceOrderController,
  fetchOutsourceOrderController,
  fetchOutsourceOrdersController,
  deleteOutsourceOrderController,
  openOutsourceOrderController,
  closeOutsourceOrderController,
  getOrderByShipmentController,
  getOutsourceOrderItemSpecsController,
  acceptOutsourceOrderController,
  deleteConfirmationController,
} from "../controllers/outsourceOrderController";

import { Router } from "express";

const router = Router();

router.post("/", createOutsourceOrderController);
router.post("/accept/:id", acceptOutsourceOrderController);
router.delete("/accept/:id", deleteConfirmationController);
router.get("/specs/:id", getOutsourceOrderItemSpecsController);
router.put("/:id", updateOutsourceOrderController);
router.get("/:id", fetchOutsourceOrderController);
router.get("/", fetchOutsourceOrdersController);
router.get("/shipment/:id", getOrderByShipmentController);
router.put("/open/:id", openOutsourceOrderController);
router.put("/close/:id", closeOutsourceOrderController);
router.delete("/:id", deleteOutsourceOrderController);

export default router;
