import {
  createYarnOrderShipmentSentController,
  getYarnOrderShipmentSentController,
  updateYarnOrderShipmentSentController,
  deleteYarnOrderShipmentSentController,
  getAllYarnOrderShipmentSentController,
} from "../controllers/yarnOrderShipmentSentController";

import { Router } from "express";

const router = Router();

router.post("/", createYarnOrderShipmentSentController);
router.get("/", getAllYarnOrderShipmentSentController);
router.get("/:id", getYarnOrderShipmentSentController);
router.put("/:id", updateYarnOrderShipmentSentController);
router.delete("/:id", deleteYarnOrderShipmentSentController);

export default router;
