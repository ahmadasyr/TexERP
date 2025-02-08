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
} from "../controllers/dyeOrderController";

import { Router } from "express";

const router = Router();

router.post("/", createDyeOrderController);
router.get("/kazanNo", fetchHighestKazanNoController);
router.put("/:id", updateDyeOrderController);
router.get("/:id", fetchDyeOrderController);
router.get("/", fetchDyeOrdersController);
router.get("/shipment/:id", getOrderByShipmentController);
router.put("/open/:id", openDyeOrderController);
router.put("/close/:id", closeDyeOrderController);
router.delete("/:id", deleteDyeOrderController);

export default router;
