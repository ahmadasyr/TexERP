import app from "../server";
import {
  createPurchaseRequest,
  getPurchaseRequest,
  getAllPurchaseRequests,
  updatePurchaseRequest,
  deletePurchaseRequest,
  supervisorApproval,
  getPurchaseRequestsByPersonnel,
  getSubordinatesPurchaseRequests,
  getSupervisorApprovedPurchaseRequests,
  purchasingApproval,
} from "../services/purchaseRequestServices";
import { Request, Response } from "express";

export const createPurchaseRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const result = await createPurchaseRequest(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getPurchaseRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getPurchaseRequest(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllPurchaseRequestsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllPurchaseRequests();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updatePurchaseRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await updatePurchaseRequest(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePurchaseRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deletePurchaseRequest(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const supervisorApprovalController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const approval = Boolean(req.params.approval);
    const data = req.body;
    const result = await supervisorApproval(id, approval);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const supervisorApprovalTrueController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await supervisorApproval(id, true);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const supervisorApprovalFalseController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await supervisorApproval(id, false);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getPurchaseRequestsByPersonnelController = async (
  req: Request,
  res: Response
) => {
  try {
    const personnelId = parseInt(req.params.personnelId);
    const result = await getPurchaseRequestsByPersonnel(personnelId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSubordinatesPurchaseRequestsController = async (
  req: Request,
  res: Response
) => {
  try {
    const personnelId = parseInt(req.params.personnelId);
    const result = await getSubordinatesPurchaseRequests(personnelId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSupervisorApprovedPurchaseRequestsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getSupervisorApprovedPurchaseRequests();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const purchasingApprovalTrueController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await purchasingApproval(id, true);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const purchasingApprovalFalseController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await purchasingApproval(id, false);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
