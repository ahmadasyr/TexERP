import {
  createOrderShipmentController,
  closeOrderShipmentController,
  OpenOrderShipmentController,
  getShipmentsByOrderController,
  getShipmentByIdController,
  getShipmentsController,
  updateOrderShipmentController,
  deleteOrderShipmentController,
  createByItemController,
  getConfirmedShipmentsController,
  getOpenShipmentsController,
  getShipmentItemsController,
  findStockMatchingOrderItemController,
  getShipmentItemDetailsController,
  handleBarcodeReadController,
  getScannedItemsController,
  deleteConfirmationController,
} from "../controllers/orderShipmentController";

import { Router } from "express";

const router = Router();

router.get("/opened", getOpenShipmentsController);
router.post("/", createOrderShipmentController);
router.post("/read", handleBarcodeReadController);
router.post("/shipmentItem", createByItemController);
router.put("/:id", updateOrderShipmentController);
router.delete("/:id", deleteOrderShipmentController);
router.delete("/confirmation/:id", deleteConfirmationController);
router.put("/close/:id", closeOrderShipmentController);
router.put("/open/:id", OpenOrderShipmentController);
router.get("/items/:id", getShipmentItemsController);
router.get("/scanned/:id", getScannedItemsController);
router.get("/stock/:id", findStockMatchingOrderItemController);
router.get("/confirmed/:id", getConfirmedShipmentsController);
router.get("/shipmentItem/:id", getShipmentItemDetailsController);
router.get("/order/:id", getShipmentsByOrderController);
router.get("/:id", getShipmentByIdController);
router.get("/", getShipmentsController);

export default router;
