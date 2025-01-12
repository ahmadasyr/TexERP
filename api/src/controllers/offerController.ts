import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        order: true,
        personnel: true,
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
      include: {
        order: true,
        personnel: true,
        offerItem: true,
      },
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
      where: {
        order: {
          customerId: Number(id),
        },
      },
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
    const offer = await prisma.offer.findMany();
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
    personnelId,
    paymentDue,
    deliveryDeadlineDate,
    validPeriod,
    validPeriodType,
    lastValidityDate,
    additionalTerms,
    conditions,
    total,
    totalKDV,
    responseDate,
    detail,
    meetStatement,
    meetNote,
    status,
    customerTargetPrice,
    orderId,
    offerItems, // Array of offer items [{ orderItemId, price, vatRate, total, totalVat, vade }]
  } = req.body;

  try {
    // Create the offer
    const newOffer = await prisma.offer.create({
      data: {
        personnelId,
        paymentDue,
        deliveryDeadlineDate: new Date(deliveryDeadlineDate),
        validPeriod,
        validPeriodType,
        lastValidityDate: new Date(lastValidityDate),
        additionalTerms,
        conditions,
        total,
        totalKDV,
        responseDate: responseDate ? new Date(responseDate) : undefined,
        detail,
        meetStatement,
        meetNote,
        status,
        customerTargetPrice,
        orderId,
        // Create related offer items
        offerItem: {
          create: offerItems.map((item: any) => ({
            orderItemId: item.orderItemId,
            price: item.price,
            vatRate: item.vatRate,
            total: item.total,
            totalVat: item.totalVat,
            vade: item.vade,
          })),
        },
      },
    });

    res.status(201).json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create offer" });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    personnelId,
    paymentDue,
    deliveryDeadlineDate,
    validPeriod,
    validPeriodType,
    lastValidityDate,
    additionalTerms,
    conditions,
    total,
    totalKDV,
    responseDate,
    detail,
    meetStatement,
    meetNote,
    status,
    customerTargetPrice,
    orderId,
    offerItems, // Array of offer items [{ orderItemId, price, vatRate, total, totalVat, vade }]
  } = req.body;
  try {
    // Update the offer
    const updatedOffer = await prisma.offer.update({
      where: { id: Number(id) },
      data: {
        personnelId,
        paymentDue,
        deliveryDeadlineDate: new Date(deliveryDeadlineDate),
        validPeriod,
        validPeriodType,
        lastValidityDate: new Date(lastValidityDate),
        additionalTerms,
        conditions,
        total,
        totalKDV,
        responseDate: responseDate ? new Date(responseDate) : undefined,
        detail,
        meetStatement,
        meetNote,
        status,
        customerTargetPrice,
        orderId,
        // Update related offer items
        offerItem: {
          deleteMany: {}, // Delete existing offer items
          create: offerItems.map((item: any) => ({
            orderItemId: item.orderItemId,
            price: item.price,
            vatRate: item.vatRate,
            total: item.total,
            totalVat: item.totalVat,
            vade: item.vade,
          })),
        },
      },
    });

    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error(error);
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
