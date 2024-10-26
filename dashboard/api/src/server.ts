import express from "express";
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
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Use personnel routes
app.use("/api/personnel", personnelRoutes);
// Use customer routes
app.use("/api/customer", customerRoutes);
// Use bank routes
app.use("/api/bank", bankRoutes);
// Use currency routes
app.use("/api/currency", currencyRoutes);
// Use taxOffice routes
app.use("/api/tax-office", taxOfficeRoutes);
// Use customerMeetPlan routes
app.use("/api/customer-meet-plan", customerMeetPlanRoutes);
// Use customerMeetReport routes
app.use("/api/customer-meet-report", customerMeetReportRoutes);
// Use product routes
app.use("/api/product", productRoutes);
// Use customerPrice routes
app.use("/api/customer-price", customerPriceRoutes);
// Use offer routes
app.use("/api/offer", offerRoutes);
// Use order routes
app.use("/api/order", orderRoutes);
// Use customer Complaint routes
app.use("/api/customer-complaint", customerComplaintRoutes);
// Use productFeasibilityForm routes
app.use("/api/product-feasibility-form", productFeasibilityFormRoutes);
// Use competitorReport routes
app.use("/api/competitor-report", competitorReportRoutes);
// Use competitorReportSubject routes
app.use("/api/competitor-report-subject", competitorReportSubjectRoutes);
// Use competitor routes
app.use("/api/competitor", competitorRoutes);

export default app;
