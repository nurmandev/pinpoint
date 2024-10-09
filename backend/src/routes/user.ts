import express from "express";
import { getUserData } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = express.Router();

// Get logged-in user data route
router.get("/profile", auth(), getUserData);

export default router;
