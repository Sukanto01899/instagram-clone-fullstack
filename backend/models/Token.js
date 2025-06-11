const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");

/**
 * Token model for handling password reset tokens and refresh tokens
 */
class Token {
  /**
   * Create a password reset token
   * @param {String} userId - User ID
   * @returns {String} Token
   */
  static async createPasswordResetToken(userId) {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    await db.tokens.insert({
      userId,
      token,
      type: "password-reset",
      expiresAt,
      createdAt: new Date(),
    });

    return token;
  }

  /**
   * Store a refresh token
   * @param {String} userId - User ID
   * @param {String} refreshToken - Refresh token
   * @returns {Object} Token document
   */
  static async storeRefreshToken(userId, refreshToken) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 20); // Token expires in 20 minutes

    const tokenDoc = {
      userId,
      token: refreshToken,
      type: "refresh",
      expiresAt,
      createdAt: new Date(),
    };

    await db.tokens.insert(tokenDoc);
    return tokenDoc;
  }

  /**
   * Verify a refresh token
   * @param {String} token - Refresh token
   * @returns {Object} Token document
   */
  static async verifyRefreshToken(token) {
    const tokenDoc = await db.tokens.findOne({
      token,
      type: "refresh",
    });

    if (!tokenDoc) {
      throw new Error("Invalid refresh token");
    }

    if (new Date() > new Date(tokenDoc.expiresAt)) {
      // Clean up expired token
      await this.deleteToken(token);
      throw new Error("Refresh token has expired");
    }

    return tokenDoc;
  }

  /**
   * Delete refresh tokens for a user (useful for logout)
   * @param {String} userId - User ID
   * @returns {Number} Number of deleted records
   */
  static async deleteRefreshTokensForUser(userId) {
    return await db.tokens.remove({
      userId,
      type: "refresh",
    });
  }

  /**
   * Verify a password reset token
   * @param {String} token - Token
   * @returns {Object} Token document
   */
  static async verifyPasswordResetToken(token) {
    const tokenDoc = await db.tokens.findOne({
      token,
      type: "password-reset",
    });

    if (!tokenDoc) {
      throw new Error("Invalid or expired token");
    }

    if (new Date() > new Date(tokenDoc.expiresAt)) {
      throw new Error("Token has expired");
    }

    return tokenDoc;
  }

  /**
   * Delete a token
   * @param {String} token - Token
   * @returns {Number} Number of deleted records
   */
  static async deleteToken(token) {
    return await db.tokens.remove({ token });
  }
}

module.exports = Token;
