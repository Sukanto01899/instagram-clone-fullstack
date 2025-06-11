const express = require("express");
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");
const router = express.Router();
const catchAsync = require("../libs/catch-async");

// Get all notifications
router.get("/", auth, catchAsync(notificationController.getNotifications));

// Mark a notification as read
router.patch("/:id/read", auth, catchAsync(notificationController.markAsRead));

// Mark a notification as unread
router.patch("/:id/unread", auth, catchAsync(notificationController.markAsUnread));

module.exports = router;
