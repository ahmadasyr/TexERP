import {
  createDofController,
  getDofController,
  getAllDofsController,
  updateDofController,
  deleteDofController,
} from "../controllers/dofController";

import e, { Router } from "express";

const router = Router();

router.post("/", createDofController);
router.get("/", getAllDofsController);
router.get("/:id", getDofController);
router.put("/:id", updateDofController);
router.delete("/:id", deleteDofController);

export default router;
