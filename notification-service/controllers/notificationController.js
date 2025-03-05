const NotificationModel = require("../models/notificationModel");
const EmailService = require("../services/emailService");

class NotificationController {
  static async notifyUser(req, res) {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const userDetails = await NotificationModel.getUserDetails(user_id);

      if (!userDetails || !userDetails.email) {
        return res.status(404).json({ error: "User email not found" });
      }

      const userEmail = userDetails.email;

      EmailService.sendEmail(
        userEmail,
        "Order Payment Confirmation",
        `<p>Hello, your order has been <b>successfully paid!</b> 🎉</p>
         <p>Thank you for your purchase!</p>`
      );

      res.json({ message: `Notification sent to ${userEmail}` });
    } catch (error) {
      console.error(`Failed to send notification: ${error.message}`);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
}

module.exports = NotificationController;
