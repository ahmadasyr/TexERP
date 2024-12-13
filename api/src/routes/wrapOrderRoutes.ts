import {
  createWrapOrderController,
  getWrapOrderByIdController,
  deleteWrapOrderController,
  updateWrapOrderController,
  getWrapOrdersController,
} from "../controllers/wrapOrderController";
import { Router } from "express";

const router = Router();

router.post("/", createWrapOrderController);
router.get("/:id", getWrapOrderByIdController);
router.delete("/:id", deleteWrapOrderController);
router.put("/:id", updateWrapOrderController);
router.get("/", getWrapOrdersController);

export default router;
