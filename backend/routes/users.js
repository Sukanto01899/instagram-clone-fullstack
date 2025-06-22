const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const catchAsync = require("../libs/catch-async");
const { uploadAvatar } = require("../middleware/upload");
const router = express.Router();

// Get current user profile
router.get("/me", auth, catchAsync(userController.getMe));

// Get user profile by ID
router.get("/:id", catchAsync(userController.getUserById));

// Update user profile
router.patch("/me", auth, catchAsync(userController.updateMe));

// Update user avatar
router.patch("/me/avatar", auth, uploadAvatar, catchAsync(userController.updateAvatar));

// Change password
router.patch("/me/password", auth, catchAsync(userController.changePassword));

// Poke another user
router.post("/:id/poke", auth, catchAsync(userController.pokeUser));

module.exports = router;
