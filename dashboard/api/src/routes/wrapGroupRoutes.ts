import {
  createWrapGroupController,
  getWrapGroupByIdController,
  getAllWrapGroupsController,
  updateWrapGroupController,
  deleteWrapGroupController,
} from "../controllers/wrapGroupController";
import { Router } from "express";

const router = Router();

router.post("/", createWrapGroupController);
router.get("/:id", getWrapGroupByIdController);
router.get("/", getAllWrapGroupsController);
router.put("/:id", updateWrapGroupController);
router.delete("/:id", deleteWrapGroupController);

export default router;
