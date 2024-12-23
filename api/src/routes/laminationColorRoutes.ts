import {
  createLaminationColorController,
  getLaminationColorByIdController,
  getAllLaminationColorsController,
  updateLaminationColorController,
  deleteLaminationColorController,
} from "../controllers/laminationColorController";
import { Router } from "express";

const router = Router();

router.post("/", createLaminationColorController);
router.get("/:id", getLaminationColorByIdController);
router.get("/", getAllLaminationColorsController);
router.put("/:id", updateLaminationColorController);
router.delete("/:id", deleteLaminationColorController);

export default router;
