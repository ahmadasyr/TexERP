import {
  createYarnOrderItemController,
  getYarnOrderItemByIdController,
  updateYarnOrderItemController,
  deleteYarnOrderItemController,
} from "../controllers/yarnOrderItemController";
import { Router } from "express";

const router = Router();

router.post("/", createYarnOrderItemController);
router.get("/:id", getYarnOrderItemByIdController);
router.put("/:id", updateYarnOrderItemController);
router.delete("/:id", deleteYarnOrderItemController);

export default router;
