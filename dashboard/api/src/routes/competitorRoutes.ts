import express from "express";
import * as competitorController from "../controllers/competitorController";

const router = express.Router();

router.post("/", competitorController.createCompetitor);
router.get("/", competitorController.getAllCompetitors);
router.get("/:id", competitorController.getCompetitorById);
router.put("/:id", competitorController.updateCompetitor);
router.delete("/:id", competitorController.deleteCompetitor);

export default router;
