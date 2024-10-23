import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  getServicesForLocation,
  submitReview,
  updateService,
} from "../controllers/service";
import {
  serviceReviewValidation,
  serviceValidation,
} from "../utils/validations";
import { auth } from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = Router();

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
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
});

router.get("/", getAllServices);

router.get("/:id", getServiceById);
router.get("/location/:locationId", getServicesForLocation);

router.post(
  "/",
  auth(),
  // serviceValidation,
  upload.array("media"),
  createService
);

router.post("/:id/review", auth(), serviceReviewValidation, submitReview);

router.put("/:id", auth(), serviceValidation, updateService);

router.delete("/:id", auth(), deleteService);

export default router;
