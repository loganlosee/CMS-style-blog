// controllers/blogController.js
const express = require('express');
const router = express.Router();

// Example blog routes
router.get('/posts', (req, res) => {
  res.render('blog/posts'); // Render the blog/posts.handlebars view
});

// Other blog routes...

module.exports = router;