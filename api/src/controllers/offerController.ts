import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
        currency: true,
      },
    });
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};

export const getOfferById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: Number(id) },
    });
    if (offer) {
      res.status(200).json(offer);
    } else {
      res.status(404).json({ error: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offer" });
  }
};

export const getOfferByCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const offer = await prisma.offer.findMany({
      where: { customerId: Number(id) },
    });
    if (offer) {
      res.status(200).json(offer);
    } else {
      res.status(404).json({ error: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offer" });
  }
};

export const getOfferByProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const offer = await prisma.offer.findMany({
      where: { productId: Number(id) },
    });
    if (offer) {
      res.status(200).json(offer);
    } else {
      res.status(404).json({ error: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offer" });
  }
};

export const createOffer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    offerNo,
    saleNo,
    offerDate,
    customerId,
    date,
    proformaNo,
    requestNo,
    requestDate,
    requestDeadline,
    requestBudget,
    productId,
    specification,
    detail,
    quantity,
    unit,
    price,
    currencyId,
    vat,
    total,
    maturity,
    daysDue,
    deadlineDate,
    specialRequirement,
    deliveryAddress,
    shippingMethod,
    proformaDetails,
    packingListNo,
    additionalTerms,
    validPeriod,
    validPeriodType,
    conditions,
    lastValidityDate,
    acceptanceDate,
    rejectionDate,
    status,
    meetNote,
    lastMeetDate,
    meetStatement,
    totalKDV,
  } = req.body;
  try {
    const newOffer = await prisma.offer.create({
      data: {
        offerNo,
        saleNo,
        offerDate: new Date(offerDate),
        date: date ? new Date(date) : undefined,
        proformaNo,
        requestNo,
        requestDate: new Date(requestDate),
        requestDeadline: requestDeadline
          ? new Date(requestDeadline)
          : undefined,
        requestBudget,
        specification,
        detail,
        quantity,
        unit,
        price,
        vat,
        total,
        maturity,
        daysDue,
        deadlineDate: new Date(deadlineDate),
        specialRequirement,
        deliveryAddress,
        shippingMethod,
        proformaDetails,
        packingListNo,
        additionalTerms,
        validPeriod,
        validPeriodType,
        conditions,
        lastValidityDate: new Date(lastValidityDate),
        acceptanceDate: acceptanceDate ? new Date(acceptanceDate) : undefined,
        rejectionDate: rejectionDate ? new Date(rejectionDate) : undefined,
        status,
        meetNote,
        lastMeetDate: lastMeetDate ? new Date(lastMeetDate) : undefined,
        meetStatement,
        totalKDV,
        customer: {
          connect: { id: customerId },
        },
        product: {
          connect: { id: productId },
        },
        currency: {
          connect: { id: currencyId },
        },
      },
    });
    res.status(201).json(newOffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create offer" });
  }
};
export const updateOffer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedOffer = await prisma.offer.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update offer" });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.offer.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete offer" });
  }
};
