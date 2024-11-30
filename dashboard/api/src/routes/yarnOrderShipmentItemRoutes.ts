import {
  createYarnOrderShipmentItemController,
  getYarnOrderShipmentItemController,
  updateYarnOrderShipmentItemController,
  deleteYarnOrderShipmentItemController,
} from "../controllers/yarnOrderShipmentItemController";

import { Router } from "express";

const router = Router();

router.post("/", createYarnOrderShipmentItemController);
router.get("/:id", getYarnOrderShipmentItemController);
router.put("/:id", updateYarnOrderShipmentItemController);
router.delete("/:id", deleteYarnOrderShipmentItemController);

export default router;
