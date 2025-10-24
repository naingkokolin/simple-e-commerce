const express = require("express");
const router = express.Router();
const {
  createAccount,
  loginAccount,
  logoutAccount,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

// sign up
router.post("/signup", createAccount);

// login
router.post("/login", loginAccount);

// logout
router.post("/logout", logoutAccount);

module.exports = router;
