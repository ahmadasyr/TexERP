import express from "express";
import personnelRoutes from "./routes/personnelRoutes";
import customerRoutes from "./routes/customerRoutes";
import bankRoutes from "./routes/bankRoutes";
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

export default app;
