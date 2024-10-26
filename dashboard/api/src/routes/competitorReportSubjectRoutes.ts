import express from "express";
import * as competitorReportSubjectController from "../controllers/competitorReportSubjectController";

const router = express.Router();

router.post("/", competitorReportSubjectController.createSubject);
router.get("/", competitorReportSubjectController.getAllSubjects);
router.get("/:id", competitorReportSubjectController.getSubjectById);
router.put("/:id", competitorReportSubjectController.updateSubject);
router.delete("/:id", competitorReportSubjectController.deleteSubject);

export default router;
