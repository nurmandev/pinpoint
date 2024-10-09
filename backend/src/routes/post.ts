import express, { Request } from "express";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  reportPost,
  getAllPost,
} from "../controllers/post";
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

// Create a post (Only partners)
router.post("/", auth(["partner"]), upload.array("media"), createPost);
router.get("/", getAllPost);

// Get a post by ID
router.get("/:id", auth(), getPostById);

// Update a post (Only owner can update)
router.put("/:id", upload.array("media"), auth(["partner"]), updatePost);

// Delete a post (Only owner can delete)
router.delete("/:id", auth(["partner"]), deletePost);

// Like a post (Any authenticated user)
router.post("/:id/like", auth(), likePost);

// Report a post (Any authenticated user)
router.post("/:id/report", auth(), reportPost);

export default router;
