import express from "express";
import * as personnelController from "../controllers/personnelController";

const router = express.Router();

router.get("/", personnelController.getAllPersonnels);
router.get("/sales", personnelController.getSalesPersonnel);
router.get("/:id", personnelController.getPersonnelById);
router.put("/:id", personnelController.updatePersonnel);
router.delete("/:id", personnelController.deletePersonnel);

export default router;
