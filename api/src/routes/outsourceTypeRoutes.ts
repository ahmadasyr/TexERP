import {
  createOutsourceTypeController,
  getOutsourceTypeByIdController,
  getAllOutsourceTypesController,
  updateOutsourceTypeController,
  deleteOutsourceTypeController,
} from "../controllers/outsourceTypeController";
import { Router } from "express";

const router = Router();

router.post("/", createOutsourceTypeController);
router.get("/:id", getOutsourceTypeByIdController);
router.get("/", getAllOutsourceTypesController);
router.put("/:id", updateOutsourceTypeController);
router.delete("/:id", deleteOutsourceTypeController);

export default router;
