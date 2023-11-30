// server.js
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const { sequelize } = require('./models');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware for parsing JSON requests
app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Define your routes using controllers
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/blog', require('./controllers/blogController'));

sequelize.sync().then(() => {
  // Set up your routes and start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});