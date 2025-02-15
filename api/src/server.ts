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
import machineRoutes from "./routes/machineRoutes";
import machineTypeRoutes from "./routes/machineTypeRoutes";
import productionOrderRoutes from "./routes/productionOrderRoutes";
import productionOrderWrapRoutes from "./routes/productionOrderWrapRoutes";
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
import dyeColorRoutes from "./routes/dyeColorRoutes";
import outsourceTypeRoutes from "./routes/outsourceTypeRoutes";
import laminationColorRoutes from "./routes/laminationColorRoutes";
import itemTypeRoutes from "./routes/itemTypeRoutes";
import dofRoutes from "./routes/dofRoutes";
import laminationTypeRoutes from "./routes/laminationTypeRoutes";
import outsourceGroupRoutes from "./routes/outsourceGroupRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import materialRoutes from "./routes/materialRoutes";
import materialCategoryRoutes from "./routes/materialCategoryRoutes";
import purchaseRequestRoutes from "./routes/purchaseRequestRoutes";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes";
import packagingTypeRoutes from "./routes/packagingTypeRoutes";
import warehouseRoutes from "./routes/warehouseRoutes";
import purchaseDeliveryRoutes from "./routes/purchaseDeliveryRoutes";
import materialStockRoutes from "./routes/materialStockRoutes";
import orderShipmentRoutes from "./routes/orderShipmentRoutes";
import stockRoutes from "./routes/stockRoutes";
import reportIssue from "./routes/reportIssueRoutes";
import dyeOrderRoutes from "./routes/dyeOrderRoutes";
import dyeTypeRoutes from "./routes/dyeTypeRoutes";
import dyeShipmentRoutes from "./routes/dyeShipmentRoutes";
import outsourceOrderRoutes from "./routes/outsourceOrderRoutes";
import outsourceShipmentRoutes from "./routes/outsourceShipmentRoutes";
import yarnStockRoutes from "./routes/yarnStockRoutes";
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

// Use machine routes
app.use("/machine", machineRoutes);
// Use machineType routes
app.use("/machine-type", machineTypeRoutes);
// Use productionOrder routes
app.use("/production-order", productionOrderRoutes);
// Use productionOrderWrap routes
app.use("/production-order-wrap", productionOrderWrapRoutes);

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
// Use dyeColor routes
app.use("/dye-color", dyeColorRoutes);
// Use outsourceType routes
app.use("/outsource-type", outsourceTypeRoutes);
// Use laminationColor routes
app.use("/lamination-color", laminationColorRoutes);
// Use itemType routes
app.use("/item-type", itemTypeRoutes);
// Use dof routes
app.use("/dof", dofRoutes);
// Use laminationType routes
app.use("/lamination-type", laminationTypeRoutes);
// Use outsourceGroup routes
app.use("/outsource-group", outsourceGroupRoutes);
// Use notification routes
app.use("/notification", notificationRoutes);
// Use supplier routes
app.use("/supplier", supplierRoutes);
// Use material routes
app.use("/material", materialRoutes);
// Use materialCategory routes
app.use("/material-category", materialCategoryRoutes);
// Use purchaseRequest routes
app.use("/purchase-request", purchaseRequestRoutes);
// Use purchaseOrder routes
app.use("/purchase-order", purchaseOrderRoutes);
// Use packagingType routes
app.use("/packaging-type", packagingTypeRoutes);
// Use warehouse routes
app.use("/warehouse", warehouseRoutes);
// Use purchaseDelivery routes
app.use("/purchase-delivery", purchaseDeliveryRoutes);
// Use materialStock routes
app.use("/material-stock", materialStockRoutes);
// Use orderShipment routes
app.use("/order-shipment", orderShipmentRoutes);
// Use stock routes
app.use("/stock", stockRoutes);
// Use reportIssue routes
app.use("/report-issue", reportIssue);
// Use dyeOrder routes
app.use("/dye-order", dyeOrderRoutes);
// Use dyeType routes
app.use("/dye-type", dyeTypeRoutes);
// Use dyeShipment routes
app.use("/dye-shipment", dyeShipmentRoutes);
// Use outsourceOrder routes
app.use("/outsource-order", outsourceOrderRoutes);
// Use outsourceShipment routes
app.use("/outsource-shipment", outsourceShipmentRoutes);
// Use yarnStock routes
app.use("/yarn-stock", yarnStockRoutes);

export default app;
