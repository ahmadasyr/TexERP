import {
  createYarnOrderShipmentController,
  getAllYarnOrderShipmentsController,
  getYarnOrderShipmentByIdController,
  updateYarnOrderShipmentController,
  deleteYarnOrderShipmentController,
} from "../controllers/yarnOrderShipmentController";
import { Router } from "express";

const router = Router();

router.post("/", createYarnOrderShipmentController);
router.get("/", getAllYarnOrderShipmentsController);
router.get("/:id", getYarnOrderShipmentByIdController);
router.put("/:id", updateYarnOrderShipmentController);
router.delete("/:id", deleteYarnOrderShipmentController);

export default router;
