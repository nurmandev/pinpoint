import { Router } from "express";
import { getMedia } from "../controllers/media";

const router = Router();

router.get("/:key", getMedia);

export default router;
