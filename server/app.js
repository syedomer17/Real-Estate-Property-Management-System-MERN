import express from "express";
import config from "config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import publicRouter from "./controllers/public/index.js";
import authMiddleware from "./controllers/middlewares/auth.js";
import userRouter from "./controllers/user/index.js";
import "./utils/dbConnect.js";
import tenantRouter from "./controllers/tenant/index.js";
import propertyRouter from "./controllers/property/index.js";
import paymentRouter from "./controllers/payment/index.js";
import maintenanceRouter from "./controllers/maintenance/index.js";
import leaseRouter from "./controllers/lease/index.js";

const app = express();
const PORT = config.get("PORT") || 8090;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
); // Apne frontend ka port dalna

app.use(express.json()); // most important line for the project

//✅ Global Rate limit (subhi Routes pe apply hoga)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // Ek ip per max 100 request allow
  message: "Too many requests, please try again later.",
  header: true,
});

app.use(globalLimiter);

// Public router
app.use("/api/public", publicRouter);

// Middleware for authentication
// app.use(authMiddleware);

// Private routers
app.use("/api/private/user", userRouter);
app.use("/api/private/tenant", tenantRouter);
app.use("/api/private/property", propertyRouter);
app.use("/api/private/payment", paymentRouter);
app.use("/api/private/maintenance", maintenanceRouter);
app.use("/api/private/lease", leaseRouter);

// ✅ Home Route
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Server is up and Running" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// ✅ Not Found Route
app.use((req, res) => {
  res.status(404).json({ message: "Not Found Router" });
});

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
