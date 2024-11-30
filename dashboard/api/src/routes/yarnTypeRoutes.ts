import {
  createYarnTypeController,
  deleteYarnTypeController,
  getAllYarnTypesController,
  getYarnTypeByIdController,
  updateYarnTypeController,
} from "../controllers/yarnTypeController";
import { Router } from "express";

const router = Router();

router.get("/", getAllYarnTypesController);
router.get("/:id", getYarnTypeByIdController);
router.post("/", createYarnTypeController);
router.put("/:id", updateYarnTypeController);
router.delete("/:id", deleteYarnTypeController);

export default router;
