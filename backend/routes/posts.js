const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const { uploadPostImage } = require("../middleware/upload");
const router = express.Router();

const catchAsync = require("../libs/catch-async");

// Create a new post
router.post("/", auth, uploadPostImage, catchAsync(postController.createPost));

// Get all posts
router.get("/", catchAsync(postController.getPosts));

// Get a single post
router.get("/:id", catchAsync(postController.getPostById));

// Update a post
router.patch("/:id", auth, uploadPostImage, catchAsync(postController.updatePost));

// Delete a post
router.delete("/:id", auth, catchAsync(postController.deletePost));

// Like/unlike a post
router.post("/:id/like", auth, catchAsync(postController.toggleLike));

// Add a comment to a post
router.post("/:id/comment", auth, catchAsync(postController.addComment));

// Update a comment
router.patch("/comment/:commentId", auth, catchAsync(postController.updateComment));

// Delete a comment
router.delete("/comment/:commentId", auth, catchAsync(postController.deleteComment));

// Get user's posts (current user)
router.get("/user/me", auth, catchAsync(postController.getUserPosts));

// Get specific user's posts
router.get("/user/:userId", catchAsync(postController.getUserPosts));

module.exports = router;
