import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import inventory from "./routes/inventoryRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventory);

const PORT = 7001;

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
