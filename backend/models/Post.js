const db = require("../config/database");

/**
 * Post model for handling post-related database operations
 */
class Post {
  /**
   * Create a new post
   * @param {Object} postData - Post data
   * @returns {Object} Created post
   */
  static async create(postData) {
    const post = {
      userId: postData.userId,
      caption: postData.caption,
      image: postData.image,
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await db.posts.insert(post);
  }

  /**
   * Find all posts with pagination
   * @param {Number} page - Page number
   * @param {Number} limit - Number of posts per page
   * @returns {Array} Posts
   */
  static async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const posts = await db.posts.findWithSort({}, { createdAt: -1 }, skip, limit);

    return posts;
  }

  /**
   * Find a post by ID
   * @param {String} id - Post ID
   * @returns {Object} Found post
   */
  static async findById(id) {
    return await db.posts.findOne({ _id: id });
  }

  /**
   * Update a post
   * @param {String} id - Post ID
   * @param {String} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Number} Number of updated records
   */
  static async update(id, userId, updateData) {
    return await db.posts.update({ _id: id, userId }, { $set: { ...updateData, updatedAt: new Date() } });
  }

  /**
   * Delete a post
   * @param {String} id - Post ID
   * @param {String} userId - User ID
   * @returns {Number} Number of deleted records
   */
  static async delete(id, userId) {
    return await db.posts.remove({ _id: id, userId });
  }

  /**
   * Toggle like on a post
   * @param {String} id - Post ID
   * @param {String} userId - User ID
   * @returns {Object} Updated post
   */
  static async toggleLike(id, userId) {
    const post = await db.posts.findOne({ _id: id });

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if user already liked the post
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Remove like
      await db.posts.update({ _id: id }, { $pull: { likes: userId }, $set: { updatedAt: new Date() } });
      return { liked: false };
    } else {
      // Add like
      await db.posts.update({ _id: id }, { $push: { likes: userId }, $set: { updatedAt: new Date() } });
      return { liked: true };
    }
  }

  /**
   * Get user's posts
   * @param {String} userId - User ID
   * @returns {Array} User's posts
   */
  static async getUserPosts(userId) {
    return await db.posts.find({ userId });
  }
}

module.exports = Post;
