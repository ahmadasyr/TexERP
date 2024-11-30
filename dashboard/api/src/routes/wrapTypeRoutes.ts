import {
  createWrapTypeController,
  deleteWrapTypeController,
  getWrapTypeByIdController,
  getWrapTypesController,
  updateWrapTypeController,
} from "../controllers/wrapTypeController";

import { Router } from "express";

const router = Router();

router.get("/", getWrapTypesController);
router.get("/:id", getWrapTypeByIdController);
router.post("/", createWrapTypeController);
router.put("/:id", updateWrapTypeController);
router.delete("/:id", deleteWrapTypeController);

export default router;
