const User = require("../models/User");
const Poke = require("../models/Poke");
const Notification = require("../models/Notification");

/**
 * Get current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateMe = async (req, res) => {
  try {
    const { name, bio, website, gender } = req.body;
    const updateData = {};

    // Only update fields that are provided
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return res.status(400).json({ message: "Name must be at least 2 characters long" });
      }
      updateData.name = name.trim();
    }
    if (bio !== undefined) {
      if (bio.length > 150) {
        return res.status(400).json({ message: "Bio must be 150 characters or less" });
      }
      updateData.bio = bio;
    }
    if (website !== undefined) updateData.website = website;
    if (gender !== undefined) updateData.gender = gender;

    // Update user
    await User.update(req.user._id, updateData);

    // Get updated user
    const updatedUser = await User.findById(req.user._id);

    // Remove password from user object
    const { password, ...userWithoutPassword } = updatedUser;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update user avatar
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarPath = req.file.path;

    // Update user avatar
    await User.updateAvatar(req.user._id, avatarPath);

    // Get updated user data
    const updatedUser = await User.findById(req.user._id);
    const { password, ...userWithoutPassword } = updatedUser;

    res.json({
      message: "Avatar updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Change user password
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Get current user with password
    const user = await User.findById(req.user._id);

    // Verify current password
    const isCurrentPasswordValid = await User.comparePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await User.update(req.user._id, { password: hashedNewPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Poke another user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const pokeUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow poking yourself
    if (id === req.user._id) {
      return res.status(400).json({ message: "You cannot poke yourself" });
    }

    // Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create poke
    await Poke.create({
      fromUserId: req.user._id,
      toUserId: id,
    });

    // Create notification
    await Notification.create({
      type: "poke",
      userId: id,
      fromUserId: req.user._id,
    });

    res.json({ message: "User poked" });
  } catch (error) {
    console.error("Poke user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from user object
    const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMe,
  updateMe,
  updateAvatar,
  changePassword,
  pokeUser,
  getUserById,
};
