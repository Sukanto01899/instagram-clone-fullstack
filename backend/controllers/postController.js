const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const User = require("../models/User");
const fs = require("fs");

/**
 * Helper function to populate post with likes and comments user data
 * @param {Object} post - Post object
 * @returns {Object} Post with populated likes and comments
 */
const populatePostData = async (post) => {
  // Get liked users data
  let likedUsers = [];
  if (post.likes && post.likes.length > 0) {
    likedUsers = await Promise.all(
      post.likes.map(async (userId) => {
        const likeUser = await User.findById(userId);
        if (likeUser) {
          const { password, ...likeUserWithoutPassword } = likeUser;
          return likeUserWithoutPassword;
        }
        return null;
      })
    );
    // Filter out null values in case some users don't exist
    likedUsers = likedUsers.filter((user) => user !== null);
  }

  // Get comments with user data
  const comments = await Comment.getPostComments(post._id);
  const commentsWithUserData = await Promise.all(
    comments.map(async (comment) => {
      const commentUser = await User.findById(comment.userId);
      const { password, ...commentUserWithoutPassword } = commentUser || { name: "Unknown", avatar: null };
      return {
        ...comment,
        user: commentUserWithoutPassword,
      };
    })
  );

  return {
    ...post,
    likes: likedUsers,
    likesCount: likedUsers.length,
    comments: commentsWithUserData,
    commentsCount: commentsWithUserData.length,
  };
};

/**
 * Create a new post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.path;
    }

    // Create post
    const post = await Post.create({
      userId: req.user._id,
      caption,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all posts (paginated)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = await Post.findAll(page, limit);

    // Get complete data for each post
    const postsWithCompleteData = await Promise.all(
      posts.map(async (post) => {
        // Get post author data
        const user = await User.findById(post.userId);
        const { password, ...userWithoutPassword } = user || { name: "Unknown", avatar: null };

        // Populate likes and comments
        const populatedPost = await populatePostData(post);

        return {
          ...populatedPost,
          user: userWithoutPassword,
        };
      })
    );

    res.json(postsWithCompleteData);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a post by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Get user data
    const user = await User.findById(post.userId);
    const { password, ...userWithoutPassword } = user;

    // Populate likes and comments
    const populatedPost = await populatePostData(post);

    res.json({
      ...populatedPost,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Get post by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    let image = undefined;

    // If a new image is uploaded, set image path
    if (req.file) {
      image = req.file.path;
    }

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is the post owner
    if (post.userId !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    // Prepare update object
    const updateObj = {};
    if (caption !== undefined) updateObj.caption = caption;
    if (image !== undefined) updateObj.image = image;

    // If a new image is being uploaded and the post already has an image, remove the old image
    if (image && post.image) {
      fs.unlink(post.image, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
    }

    // Update post
    await Post.update(id, req.user._id, updateObj);

    // Get updated post
    const updatedPost = await Post.findById(id);

    res.json(updatedPost);
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is the post owner
    if (post.userId !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Delete post
    await Post.delete(id, req.user._id);

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Toggle like on a post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Toggle like
    const result = await Post.toggleLike(id, req.user._id);

    // Create notification only when post is liked
    if (result.liked && post.userId !== req.user._id) {
      await Notification.create({
        type: "like",
        userId: post.userId,
        fromUserId: req.user._id,
        postId: id,
      });
    }

    res.json({
      message: result.liked ? "Post liked" : "Post unliked",
      liked: result.liked,
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add a comment to a post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create comment
    const comment = await Comment.create({
      postId: id,
      userId: req.user._id,
      text,
    });

    // Create notification if post owner is not the commenter
    if (post.userId !== req.user._id) {
      await Notification.create({
        type: "comment",
        userId: post.userId,
        fromUserId: req.user._id,
        postId: id,
      });
    }

    // Get user data for the comment
    const user = await User.findById(req.user._id);
    const { password, ...userWithoutPassword } = user;

    res.status(201).json({
      comment: {
        ...comment,
        user: userWithoutPassword,
      },
      message: "Comment added",
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a comment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Find comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is the comment owner
    if (comment.userId !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    // Update comment
    await Comment.update(commentId, req.user._id, { text });

    // Get updated comment
    const updatedComment = await Comment.findById(commentId);

    // Get user data for the comment
    const user = await User.findById(req.user._id);
    const { password, ...userWithoutPassword } = user;

    res.json({
      comment: {
        ...updatedComment,
        user: userWithoutPassword,
      },
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error("Update comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a comment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is the comment owner
    if (comment.userId !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // Delete comment
    await Comment.delete(commentId, req.user._id);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get user's posts
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id; // Allow getting posts for specific user or current user

    // Get user information
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from user data
    const { password, ...userWithoutPassword } = user;

    const posts = await Post.getUserPosts(userId);

    // Add likes and comments data to each post
    const postsWithCompleteData = await Promise.all(
      posts.map(async (post) => {
        return await populatePostData(post);
      })
    );

    res.json({
      user: userWithoutPassword,
      posts: postsWithCompleteData,
      postsCount: postsWithCompleteData.length,
    });
  } catch (error) {
    console.error("Get user posts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  updateComment,
  deleteComment,
  getUserPosts,
};
