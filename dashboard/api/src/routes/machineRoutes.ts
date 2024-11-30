import {
  createMachineController,
  getMachineByIdController,
  getMachinesController,
  updateMachineController,
  deleteMachineController,
} from "../controllers/machineController";
import { Router } from "express";

const router = Router();

router.post("/", createMachineController);
router.get("/", getMachinesController);
router.get("/:id", getMachineByIdController);
router.put("/:id", updateMachineController);
router.delete("/:id", deleteMachineController);

export default router;
