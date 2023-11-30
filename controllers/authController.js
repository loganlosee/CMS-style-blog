// controllers/authController.js
const express = require('express');
const router = express.Router();

// Example login route
router.get('/login', (req, res) => {
  res.render('login'); // Render the login.handlebars view
});

// Other authentication routes...

module.exports = router;