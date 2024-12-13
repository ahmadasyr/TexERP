import {
  createMachineTypeController,
  deleteMachineTypeController,
  getAllMachineTypesController,
  getMachineTypeByIdController,
  updateMachineTypeController,
} from "../controllers/machineTypeController";
import { Router } from "express";

const router = Router();

router.get("/", getAllMachineTypesController);
router.get("/:id", getMachineTypeByIdController);
router.post("/", createMachineTypeController);
router.put("/:id", updateMachineTypeController);
router.delete("/:id", deleteMachineTypeController);

export default router;
