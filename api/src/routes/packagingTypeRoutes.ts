import {
  createPackagingTypeController,
  getAllPackagingTypesController,
  getPackagingTypeByIdController,
  updatePackagingTypeController,
  deletePackagingTypeController,
} from "../controllers/packagingTypeController";

import { Router } from "express";

const router = Router();

router.get("/", getAllPackagingTypesController);
router.get("/:id", getPackagingTypeByIdController);
router.post("/", createPackagingTypeController);
router.put("/:id", updatePackagingTypeController);
router.delete("/:id", deletePackagingTypeController);

export default router;
