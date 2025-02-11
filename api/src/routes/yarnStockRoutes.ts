import {
  getYarnStockController,
  createYarnStockController,
  updateYarnStockController,
  deleteYarnStockController,
  getYarnStockByIdController,
} from "../controllers/yarnStockController";
import { Router } from "express";

const router = Router();

router.get("/", getYarnStockController);
router.get("/:id", getYarnStockByIdController);
router.post("/", createYarnStockController);
router.put("/:id", updateYarnStockController);
router.delete("/:id", deleteYarnStockController);

export default router;
