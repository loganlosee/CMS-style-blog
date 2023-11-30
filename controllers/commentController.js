const express = require('express');
const router = express.Router();

// Import Comment model (assuming it's in models/comment.js)
const { Comment } = require('../models');

// Route for adding a comment to a blog post
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;

    // Implement logic to add a comment to the specified blog post
    const newComment = await Comment.create({
      postId,
      text: req.body.text,
      // more
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other comment-related routes (update, delete) added here

module.exports = router;
