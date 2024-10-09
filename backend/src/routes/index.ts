import express from "express";
import auth from "./auth";
import user from "./user";
import location from "./location";
import post from "./post";
import comment from "./comment";
import story from "./story";
import image from "./image";

const router = express.Router();

router.use("/auths", auth);
router.use("/users", user);
router.use("/locations", location);
router.use("/posts", post);
router.use("/comments", comment);
router.use("/stories", story);
router.use("/images", image);

export default router;
