const path = require("path");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const express = require("express");
const session = require("express-session");
const handleBars = require("express-handlebars");
const hbs = handleBars.create();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session
const myStore = new SequelizeStore({
  db: sequelize, 
});

app.use(session({
  secret: 'secret',
  store: myStore,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

// Start Sequelize and sync models with the database
sequelize.sync().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
