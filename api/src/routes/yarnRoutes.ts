import {
  createYarnStockEntryController,
  deleteYarnStockEntryController,
  getAllYarnStockEntriesController,
  getYarnStockEntryByIdController,
  updateYarnStockEntryController,
  getStockEntriesByYarnTypeIdController,
  submitMultipleYarnStockEntriesByYarnTypeIdController,
} from "../controllers/yarnController";
import { Router } from "express";

const router = Router();

router.get("/", getAllYarnStockEntriesController);
router.get("/:id", getYarnStockEntryByIdController);
router.post("/", createYarnStockEntryController);
router.put("/:id", updateYarnStockEntryController);
router.delete("/:id", deleteYarnStockEntryController);
router.get("/yarnType/:yarnTypeId", getStockEntriesByYarnTypeIdController);
router.post(
  "/yarnType/:yarnTypeId",
  submitMultipleYarnStockEntriesByYarnTypeIdController
);
export default router;
