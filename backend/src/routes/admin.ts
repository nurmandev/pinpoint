import express from "express";
import { auth } from "../middleware/auth";
import {
  addMenu,
  confirmOrder,
  createCategory,
  getAllMenu,
  getAllOrders,
  getOrderByCategory,
  getOrderConfirmation,
  getOrderDetails,
  rejectOrder,
} from "../controllers/admin";

const router = express.Router();

router.get("/order", auth(["admin"]), getAllOrders);

router.get("/order/:id", auth(["admin"]), getOrderDetails);

// router.get("/order/details", auth(["admin"]));

router.get("/order/confirm", auth(["admin"]), getOrderConfirmation);
router.post("/order/accept", auth(["admin"]), confirmOrder);
router.post("/order/reject", auth(["admin"]), rejectOrder);

// router.get("/order/timeline", auth(["admin"]));

router.get("/order/categories", auth(["admin"]), getOrderByCategory);
router.post("/order/addCategory", auth(["admin"]), createCategory);

router.get("/order/menus", auth(["admin"]), getAllMenu);
router.get("/order/addMenu", auth(["admin"]), addMenu);

export default router;
