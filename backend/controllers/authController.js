const User = require("../models/User");
const Token = require("../models/Token");
const { generateTokens, verifyRefreshToken } = require("../config/jwt");

/**
 * Handle user signup
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token in database
    await Token.storeRefreshToken(user._id, refreshToken);

    res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Handle user login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required" });
    }

    // Find user
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await User.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token in database
    await Token.storeRefreshToken(user._id, refreshToken);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Handle forgot password request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const user = await User.findByEmail(email);

    // Always return the same response even if user doesn't exist (for security)
    if (!user) {
      return res.json({ message: "Check the Server Console for Reset Token" });
    }

    // Generate reset token
    const token = await Token.createPasswordResetToken(user._id);

    // In a real app, we would send an email with the reset link
    // For this demo, we'll just return the token
    console.log(`Reset token for ${email}: ${token}`);

    res.json({ message: "Check the Server Console for Reset Token" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Handle password reset
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    // Verify token
    const tokenDoc = await Token.verifyPasswordResetToken(token);

    // Find user
    const user = await User.findById(tokenDoc.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const salt = await require("bcrypt").genSalt(10);
    const hashedPassword = await require("bcrypt").hash(newPassword, salt);

    // Update user password
    await User.update(user._id, { password: hashedPassword });

    // Delete used token
    await Token.deleteToken(token);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Handle token refresh
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Validate input
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify refresh token (JWT verification)
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Verify refresh token exists in database and is not expired
    try {
      await Token.verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Delete old refresh token and store new one
    await Token.deleteToken(refreshToken);
    await Token.storeRefreshToken(user._id, newRefreshToken);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Handle user logout
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete the specific refresh token
      await Token.deleteToken(refreshToken);
    }

    // If user is authenticated, delete all refresh tokens for the user
    if (req.user) {
      await Token.deleteRefreshTokensForUser(req.user._id);
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
};
