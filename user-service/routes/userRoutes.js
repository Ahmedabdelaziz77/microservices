const express = require("express");
const {
  createUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user", createUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);

module.exports = router;
