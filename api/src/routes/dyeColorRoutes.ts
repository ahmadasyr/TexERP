import {
  createDyeColorController,
  getDyeColorByIdController,
  getAllDyeColorsController,
  updateDyeColorController,
  deleteDyeColorController,
} from "../controllers/dyeColorController";
import { Router } from "express";

const router = Router();

router.post("/", createDyeColorController);
router.get("/:id", getDyeColorByIdController);
router.get("/", getAllDyeColorsController);
router.put("/:id", updateDyeColorController);
router.delete("/:id", deleteDyeColorController);

export default router;
