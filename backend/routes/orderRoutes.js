const express = require("express");
const Order = require("../models/Order");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// * users routes
router.get("/my-orders", protect, getUserOrders);
router.post("/create-order", protect, createOrder);
router.get(":id", protect, getOrderById);

// * admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
