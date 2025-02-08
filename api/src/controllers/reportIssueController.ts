import {
  createReportIssue,
  updateReportIssue,
  deleteReportIssue,
  getReportIssueByPersonnelId,
  closeReportIssue,
  getReportIssueById,
  getReportIssues,
} from "../services/reportIssueServices";

import { Request, Response } from "express";

export const getReportIssuesController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssues = await getReportIssues();
    res.status(200).json(reportIssues);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getReportIssueByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssue = await getReportIssueById(Number(req.params.id));
    res.status(200).json(reportIssue);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createReportIssueController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssue = await createReportIssue({
      title: req.body.title,
      description: req.body.description,
      personnelId: req.body.personnelId,
    });
    res.status(200).json(reportIssue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateReportIssueController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssue = await updateReportIssue(Number(req.params.id), {
      response: req.body.response,
    });
    res.status(200).json(reportIssue);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteReportIssueController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssue = await deleteReportIssue(Number(req.params.id));
    res.status(200).json(reportIssue);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getReportIssueByPersonnelIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssues = await getReportIssueByPersonnelId(
      Number(req.params.personnelId)
    );
    res.status(200).json(reportIssues);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const closeReportIssueController = async (
  req: Request,
  res: Response
) => {
  try {
    const reportIssue = await closeReportIssue(Number(req.params.id));
    res.status(200).json(reportIssue);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
