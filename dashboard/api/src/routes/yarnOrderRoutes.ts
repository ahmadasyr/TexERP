import {
  createYarnOrderController,
  getYarnOrderByIdController,
  updateYarnOrderController,
  deleteYarnOrderController,
  getAllYarnOrdersController,
  closeYarnOrderController,
  getOngoingYarnOrdersController,
  getYarnOrdersBySaleController,
} from "../controllers/yarnOrderController";

import { Router } from "express";

const router = Router();

router.post("/", createYarnOrderController);
router.get("/", getAllYarnOrdersController);
router.get("/ongoing", getOngoingYarnOrdersController);
router.put("/close/:id", closeYarnOrderController);
router.get("/:id", getYarnOrderByIdController);
router.put("/:id", updateYarnOrderController);
router.delete("/:id", deleteYarnOrderController);
router.get("/sale/:sale", getYarnOrdersBySaleController);

export default router;
