import {
  createOrderShipmentController,
  getShipmentsByOrderController,
  getShipmentsController,
  updateOrderShipmentController,
  deleteOrderShipmentController,
  findStockMatchingOrderItemController,
  handleBarcodeReadController,
  getScannedItemsController,
  deleteConfirmationController,
  getShipmentByIdController,
  closeShipmentStatusController,
  openShipmentStatusController,
  getOpenShipmentsController,
  getShipmentItemsController,
  getConfirmedByOrderIdController,
  getShipmentItemDetailsController,
} from "../controllers/dyeShipmentController";

import { Router } from "express";

const router = Router();

router.post("/", createOrderShipmentController);
router.post("/read", handleBarcodeReadController);
router.put("/:id", updateOrderShipmentController);
router.put("/close/:id", closeShipmentStatusController);
router.put("/open/:id", openShipmentStatusController);
router.delete("/:id", deleteOrderShipmentController);
router.get("/open", getOpenShipmentsController);
router.delete("/scanned/:id", deleteConfirmationController);
router.get("/:id", getShipmentByIdController);
router.get("/scanned/:id", getScannedItemsController);
router.get("/stock/:id", findStockMatchingOrderItemController);
router.get("/order/:id", getShipmentsByOrderController);
router.get("/items/:id", getShipmentItemsController);
router.get("/confirmed/:id", getConfirmedByOrderIdController);
router.get("/shipmentItem/:id", getShipmentItemDetailsController);
router.get("/", getShipmentsController);

export default router;
