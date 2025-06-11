const db = require("../config/database");

/**
 * Comment model for handling comment-related database operations
 */
class Comment {
  /**
   * Create a new comment
   * @param {Object} commentData - Comment data
   * @returns {Object} Created comment
   */
  static async create(commentData) {
    const comment = {
      postId: commentData.postId,
      userId: commentData.userId,
      text: commentData.text,
      createdAt: new Date(),
    };

    return await db.comments.insert(comment);
  }

  /**
   * Get all comments for a post
   * @param {String} postId - Post ID
   * @returns {Array} Comments
   */
  static async getPostComments(postId) {
    return await db.comments.find({ postId }, { sort: { createdAt: 1 } });
  }

  /**
   * Find a comment by ID
   * @param {String} id - Comment ID
   * @returns {Object} Found comment
   */
  static async findById(id) {
    return await db.comments.findOne({ _id: id });
  }

  /**
   * Update a comment
   * @param {String} id - Comment ID
   * @param {String} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Number} Number of updated records
   */
  static async update(id, userId, updateData) {
    return await db.comments.update({ _id: id, userId }, { $set: { ...updateData, updatedAt: new Date() } });
  }

  /**
   * Delete a comment
   * @param {String} id - Comment ID
   * @param {String} userId - User ID
   * @returns {Number} Number of deleted records
   */
  static async delete(id, userId) {
    return await db.comments.remove({ _id: id, userId });
  }
}

module.exports = Comment;
