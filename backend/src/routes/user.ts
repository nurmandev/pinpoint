import express from "express";
import { getUserData, updateUserData } from "../controllers/user";
import { auth } from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Get logged-in user data route
router.get("/profile", auth(), getUserData);
router.put("/", auth(), upload.array("media"), updateUserData);

export default router;
