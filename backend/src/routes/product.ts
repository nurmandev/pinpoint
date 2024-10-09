import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product";
import { productValidation } from "../utils/validations";
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

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  auth(),
  productValidation,
  upload.array("media"),
  createProduct
);

router.put("/:id", auth(), productValidation, updateProduct);

export default router;
