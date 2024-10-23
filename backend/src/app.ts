import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/database";
import router from "./routes";
import bodyParser from "body-parser";

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(bodyParser.json());

// Routes
app.use("/api", router);

export default app;
