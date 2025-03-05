const axios = require("axios");

class PaymentModel {
  static async getOrderDetails(order_id) {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/order/${order_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
  }

  static async updateOrderStatus(order_id) {
    try {
      await axios.patch(`http://localhost:3002/api/order/${order_id}`);
      console.log(`Order #${order_id} marked as Paid`);
    } catch (error) {
      throw new Error(`Failed to update order #${order_id}: ${error.message}`);
    }
  }

  static async notifyUser(user_id, order_id) {
    try {
      await axios.post("http://localhost:3004/api/notify", {
        user_id,
        order_id,
      });
      console.log(`Notification sent to user #${user_id}`);
    } catch (error) {
      throw new Error(`Failed to notify user #${user_id}: ${error.message}`);
    }
  }
}

module.exports = PaymentModel;
