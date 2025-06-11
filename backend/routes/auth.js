const express = require("express");
const authController = require("../controllers/authController");
const catchAsync = require("../libs/catch-async");
const auth = require("../middleware/auth");
const router = express.Router();

// Register a new user
router.post("/signup", catchAsync(authController.signup));

// Login a user
router.post("/login", catchAsync(authController.login));

// Request password reset
router.post("/forgot-password", catchAsync(authController.forgotPassword));

// Reset password
router.post("/reset-password", catchAsync(authController.resetPassword));

// Refresh access token using refresh token
router.post("/refresh-token", catchAsync(authController.refreshToken));

// Logout user (optional auth middleware for clearing all tokens)
router.post("/logout", auth, catchAsync(authController.logout));

module.exports = router;
