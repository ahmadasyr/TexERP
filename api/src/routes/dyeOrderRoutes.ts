import {
  createDyeOrderController,
  fetchHighestKazanNoController,
  updateDyeOrderController,
  fetchDyeOrderController,
  fetchDyeOrdersController,
  deleteDyeOrderController,
  openDyeOrderController,
  closeDyeOrderController,
  getOrderByShipmentController,
  getDyeItemSpecsController,
  acceptDyeController,
  deleteConfirmationController,
} from "../controllers/dyeOrderController";

import { Router } from "express";

const router = Router();

router.post("/", createDyeOrderController);
router.post("/accept/:id", acceptDyeController);
router.delete("/accept/:id", deleteConfirmationController);
router.get("/specs/:id", getDyeItemSpecsController);
router.get("/kazanNo", fetchHighestKazanNoController);
router.put("/:id", updateDyeOrderController);
router.get("/:id", fetchDyeOrderController);
router.get("/", fetchDyeOrdersController);
router.get("/shipment/:id", getOrderByShipmentController);
router.put("/open/:id", openDyeOrderController);
router.put("/close/:id", closeDyeOrderController);
router.delete("/:id", deleteDyeOrderController);

export default router;
