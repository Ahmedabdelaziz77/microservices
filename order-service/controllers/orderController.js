const axios = require("axios");
const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  const { user_id, product_name, quantity, price } = req.body;
  try {
    const userResponse = await axios.get(
      `http://localhost:3001/api/user/${user_id}`
    );
    if (!userResponse.data) {
      return res.status(401).json({ error: "User not found" });
    }

    Order.createOrder(
      user_id,
      product_name,
      quantity,
      price,
      (err, orderId) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error: " + err.message });

        res.status(201).json({
          id: orderId,
          user_id,
          product_name,
          quantity,
          price,
          status: "Pending",
        });
      }
    );
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating order: " + err.message });
  }
};

const getOrderById = (req, res) => {
  const { id } = req.params;
  Order.getOrderById(id, (err, row) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    if (!row) return res.status(404).json({ error: "Order not found" });

    res.json(row);
  });
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  Order.getOrderById(id, (err, row) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    if (!row) return res.status(404).json({ error: "Order not found" });
    if (row.status === "Paid")
      return res.status(400).json({ error: "Order is already paid" });

    Order.updateOrderStatus(id, (updateErr) => {
      if (updateErr)
        return res
          .status(500)
          .json({ error: "Failed to update order: " + updateErr.message });

      res.json({ message: `Order #${id} has been marked as Paid` });
    });
  });
};

module.exports = { createOrder, getOrderById, updateOrderStatus };
