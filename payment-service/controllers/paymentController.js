const PaymentModel = require("../models/paymentModel");
const StripeService = require("../services/stripeService");

class PaymentController {
  static async payOrder(req, res) {
    try {
      const { order_id } = req.body;

      if (!order_id) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      const orderDetails = await PaymentModel.getOrderDetails(order_id);

      if (!orderDetails) {
        return res.status(404).json({ error: "Order not found" });
      }

      const { user_id, product_name, quantity, price, status } = orderDetails;

      if (status === "Paid") {
        return res.status(400).json({ error: "Order already paid" });
      }

      if (!price || isNaN(price)) {
        return res.status(400).json({ error: "Invalid order price" });
      }

      const paymentIntent = await StripeService.createPaymentIntent(
        price,
        "EGP",
        `${quantity}x ${product_name}`,
        { order_id, user_id }
      );

      setTimeout(async () => {
        try {
          await PaymentModel.updateOrderStatus(order_id);
          await PaymentModel.notifyUser(user_id, order_id);
        } catch (error) {
          console.error(error.message);
        }
      }, 3000);

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        message: `Payment initiated for Order #${order_id}`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PaymentController;
