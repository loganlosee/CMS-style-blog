const express = require('express');
const router = express.Router();

// Import BlogPost model 
const { BlogPost } = require('../models');

// Route for fetching all blog posts
router.get('/posts', async (req, res) => {
  try {
    // Implement logic to fetch all blog posts
    const posts = await BlogPost.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other blog-related routes (create, update, delete) can be added here

module.exports = router;
