import {
  createOutsourceGroupController,
  getOutsourceGroupByIdController,
  getAllOutsourceGroupsController,
  updateOutsourceGroupController,
  deleteOutsourceGroupController,
} from "../controllers/outsourceGroupController";
import { Router } from "express";

const router = Router();

router.post("/", createOutsourceGroupController);
router.get("/:id", getOutsourceGroupByIdController);
router.get("/", getAllOutsourceGroupsController);
router.put("/:id", updateOutsourceGroupController);
router.delete("/:id", deleteOutsourceGroupController);

export default router;
