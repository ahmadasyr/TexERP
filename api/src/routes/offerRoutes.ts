import express from "express";
import * as offerController from "../controllers/offerController";

const router = express.Router();

router.post("/", offerController.createOffer);
router.get("/", offerController.getAllOffers);
router.get("/:id", offerController.getOfferById);
router.get("/customer/:id", offerController.getOfferByCustomer);
router.get("/product/:id", offerController.getOfferByProduct);
router.put("/:id", offerController.updateOffer);
router.delete("/:id", offerController.deleteOffer);

export default router;
