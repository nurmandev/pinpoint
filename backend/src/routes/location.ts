import express from "express";
import {
  createLocation,
  getUserAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../controllers/location";
import { auth } from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads/" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with a unique name
  },
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Create a new location
router.post("/", upload.array("media"), auth(), createLocation);

// Get all locations
router.get("/user", auth(), getUserAllLocations);

// Get a location by ID
router.get("/:id", getLocationById);

// Update a location by ID
router.put("/:id", auth(), updateLocation);

// Delete a location by ID
router.delete("/:id", auth(), deleteLocation);

export default router;
