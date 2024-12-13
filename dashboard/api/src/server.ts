import express from "express";
require("dotenv").config();

import personnelRoutes from "./routes/personnelRoutes";
import customerRoutes from "./routes/customerRoutes";
import bankRoutes from "./routes/bankRoutes";
import currencyRoutes from "./routes/currencyRoutes";
import taxOfficeRoutes from "./routes/taxOfficeRoutes";
import customerMeetPlanRoutes from "./routes/customerMeetPlanRoutes";
import customerMeetReportRoutes from "./routes/customerMeetReportRoutes";
import productRoutes from "./routes/productRoutes";
import customerPriceRoutes from "./routes/customerPriceRoutes";
import offerRoutes from "./routes/offerRoutes";
import orderRoutes from "./routes/orderRoutes";
import customerComplaintRoutes from "./routes/customerComplaintRoutes";
import productFeasibilityFormRoutes from "./routes/productFeasibilityFormRoutes";
import competitorReportRoutes from "./routes/competitorReportRoutes";
import competitorReportSubjectRoutes from "./routes/competitorReportSubjectRoutes";
import competitorRoutes from "./routes/competitorRoutes";
import accountRoutes from "./routes/accountRoutes";
import accountTypeRoutes from "./routes/accountTypeRoutes";
import cutStockRoutes from "./routes/cutStockRoutes";
import machineRoutes from "./routes/machineRoutes";
import machineTypeRoutes from "./routes/machineTypeRoutes";
import productionOrderRoutes from "./routes/productionOrderRoutes";
import productionOrderWrapRoutes from "./routes/productionOrderWrapRoutes";
import rawQualityRoutes from "./routes/rawQualityRoutes";
import rawStockRoutes from "./routes/rawStockRoutes";
import wrapGroupRoutes from "./routes/wrapGroupRoutes";
import wrapOrderRoutes from "./routes/wrapOrderRoutes";
import wrapTypeRoutes from "./routes/wrapTypeRoutes";
import yarnRoutes from "./routes/yarnRoutes";
import yarnTypeRoutes from "./routes/yarnTypeRoutes";
import yarnOrderRoutes from "./routes/yarnOrderRoutes";
import yarnOrderShipmentSentRoutes from "./routes/yarnOrderShipmentSentRoutes";
import yarnOrderShipmentRoutes from "./routes/yarnOrderShipmentRoutes";
import yarnOrderShipmentItemRoutes from "./routes/yarnOrderShipmentItemRoutes";
import yarnOrderItemRoutes from "./routes/yarnOrderItemRoutes";
import shippingCompanyRoutes from "./routes/shippingCompanyRoutes";
import shippingCarrierRoutes from "./routes/shippingCarrierRoutes";
import shippingCarRoutes from "./routes/shippingCarRoutes";
import authRoutes from "./routes/authRoutes";
import productPriceRoutes from "./routes/productPriceRoutes";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Use personnel routes
app.use("/personnel", personnelRoutes);
// Use customer routes
app.use("/customer", customerRoutes);
// Use bank routes
app.use("/bank", bankRoutes);
// Use currency routes
app.use("/currency", currencyRoutes);
// Use taxOffice routes
app.use("/tax-office", taxOfficeRoutes);
// Use customerMeetPlan routes
app.use("/customer-meet-plan", customerMeetPlanRoutes);
// Use customerMeetReport routes
app.use("/customer-meet-report", customerMeetReportRoutes);
// Use product routes
app.use("/product", productRoutes);
// Use customerPrice routes
app.use("/customer-price", customerPriceRoutes);
// Use offer routes
app.use("/offer", offerRoutes);
// Use order routes
app.use("/order", orderRoutes);
// Use customer Complaint routes
app.use("/customer-complaint", customerComplaintRoutes);
// Use productFeasibilityForm routes
app.use("/product-feasibility-form", productFeasibilityFormRoutes);
// Use competitorReport routes
app.use("/competitor-report", competitorReportRoutes);
// Use competitorReportSubject routes
app.use("/competitor-report-subject", competitorReportSubjectRoutes);
// Use competitor routes
app.use("/competitor", competitorRoutes);
// Use account routes
app.use("/account", accountRoutes);
// Use accountType routes
app.use("/account-type", accountTypeRoutes);
// Use cutStock routes
app.use("/cut-stock", cutStockRoutes);
// Use machine routes
app.use("/machine", machineRoutes);
// Use machineType routes
app.use("/machine-type", machineTypeRoutes);
// Use productionOrder routes
app.use("/production-order", productionOrderRoutes);
// Use productionOrderWrap routes
app.use("/production-order-wrap", productionOrderWrapRoutes);
// Use rawQuality routes
app.use("/raw-quality", rawQualityRoutes);
// Use rawStock routes
app.use("/raw-stock", rawStockRoutes);
// Use wrapGroup routes
app.use("/wrap-group", wrapGroupRoutes);
// Use wrapOrder routes
app.use("/wrap-order", wrapOrderRoutes);
// Use wrapType routes
app.use("/wrap-type", wrapTypeRoutes);
// Use yarn routes
app.use("/yarn", yarnRoutes);
// Use yarnType routes
app.use("/yarn-type", yarnTypeRoutes);
// Use yarnOrder routes
app.use("/yarn-order", yarnOrderRoutes);
// Use yarnOrderShipmentSent routes
app.use("/yarn-order-shipment-sent", yarnOrderShipmentSentRoutes);
// Use yarnOrderShipmentItem routes
app.use("/yarn-order-shipment-item", yarnOrderShipmentItemRoutes);
// Use yarnOrderItem routes
app.use("/yarn-order-item", yarnOrderItemRoutes);
// Use yarnOrderShipment routes
app.use("/yarn-order-shipment", yarnOrderShipmentRoutes);
// Use shippingCompany routes
app.use("/shipping-company", shippingCompanyRoutes);
// Use shippingCarrier routes
app.use("/shipping-carrier", shippingCarrierRoutes);
// Use shippingCar routes
app.use("/shipping-car", shippingCarRoutes);
// auth routes
app.use("/auth", authRoutes);
// Use productPrice routes
app.use("/product-price", productPriceRoutes);
export default app;
