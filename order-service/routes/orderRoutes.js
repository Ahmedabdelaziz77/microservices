const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/order", createOrder);
router.get("/order/:id", getOrderById);
router.patch("/order/:id", updateOrderStatus);

module.exports = router;
