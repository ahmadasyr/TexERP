import {
  createItemTypeController,
  getItemTypeByIdController,
  getAllItemTypesController,
  updateItemTypeController,
  deleteItemTypeController,
} from "../controllers/itemTypeController";
import { Router } from "express";

const router = Router();

router.post("/", createItemTypeController);
router.get("/:id", getItemTypeByIdController);
router.get("/", getAllItemTypesController);
router.put("/:id", updateItemTypeController);
router.delete("/:id", deleteItemTypeController);

export default router;
