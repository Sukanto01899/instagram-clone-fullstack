const jwt = require("jsonwebtoken");

// In a production environment, this would be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// Expire in 2 minutes for testing purposes
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2m";

// Refresh token configuration
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "20m";

/**
 * Generate a JWT access token for a user
 * @param {Object} user - User object
 * @returns {String} JWT access token
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Generate a JWT refresh token for a user
 * @param {Object} user - User object
 * @returns {String} JWT refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
};

/**
 * Generate both access and refresh tokens for a user
 * @param {Object} user - User object
 * @returns {Object} Object containing access and refresh tokens
 */
const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Verify a JWT access token
 * @param {String} token - JWT access token
 * @returns {Object} Decoded token payload
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Verify a JWT refresh token
 * @param {String} token - JWT refresh token
 * @returns {Object} Decoded token payload
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

// Legacy function for backward compatibility
const generateToken = generateAccessToken;
const verifyToken = verifyAccessToken;

module.exports = {
  generateToken, // Legacy function
  verifyToken, // Legacy function
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};
