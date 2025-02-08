import {
  createDyeTypeController,
  getDyeTypeByIdController,
  getAllDyeTypesController,
  updateDyeTypeController,
  deleteDyeTypeController,
} from "../controllers/dyeTypeController";
import { Router } from "express";

const router = Router();

router.post("/", createDyeTypeController);
router.get("/:id", getDyeTypeByIdController);
router.get("/", getAllDyeTypesController);
router.put("/:id", updateDyeTypeController);
router.delete("/:id", deleteDyeTypeController);

export default router;
