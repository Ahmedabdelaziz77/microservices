const express = require("express");
const NotificationController = require("../controllers/notificationController");

const router = express.Router();

router.post("/", NotificationController.notifyUser);

module.exports = router;
