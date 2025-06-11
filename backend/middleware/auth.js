const { verifyAccessToken } = require("../config/jwt");
const db = require("../config/database");

/**
 * Middleware to authenticate users using JWT access tokens
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
        code: "NO_TOKEN",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        code: "NO_TOKEN",
      });
    }

    // Verify access token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token expired",
          code: "TOKEN_EXPIRED",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token",
          code: "INVALID_TOKEN",
        });
      } else {
        return res.status(401).json({
          message: "Authentication failed",
          code: "AUTH_FAILED",
        });
      }
    }

    // Find user by id
    const user = await db.users.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    // Remove password from user object
    const { password, ...userWithoutPassword } = user;

    // Add user to request object
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      message: "Authentication failed",
      code: "AUTH_FAILED",
    });
  }
};

module.exports = auth;
