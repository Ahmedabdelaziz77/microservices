const axios = require("axios");

class NotificationModel {
  static async getUserDetails(user_id) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/${user_id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch user details");
    }
  }
}

module.exports = NotificationModel;
