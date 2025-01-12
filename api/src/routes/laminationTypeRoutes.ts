import {
  createLaminationTypeController,
  getLaminationTypeByIdController,
  getAllLaminationTypesController,
  updateLaminationTypeController,
  deleteLaminationTypeController,
} from "../controllers/laminationTypeController";
import { Router } from "express";

const router = Router();

router.post("/", createLaminationTypeController);
router.get("/:id", getLaminationTypeByIdController);
router.get("/", getAllLaminationTypesController);
router.put("/:id", updateLaminationTypeController);
router.delete("/:id", deleteLaminationTypeController);

export default router;
