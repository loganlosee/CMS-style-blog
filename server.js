const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const { sequelize } = require('./models'); 
const routes = require('./controllers');
const handlebars = require('handlebars');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session
const sessionStore = new SequelizeStore({
  db: sequelize,
});
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

handlebars.registerHelper('extend', function (name, context) {
  const block = handlebars.registeredBlocks[name];
  return block ? block(context) : null;
});

// Set up Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      // custom helpers here
      extend: function (name, context) {
        // Custom implementation of extend helper
        // ?
      },
    },
  })
);
app.set('view engine', 'handlebars');

// Routes
app.use(routes);

app.get('/', (req, res) => {
  // Render the home.handlebars template
  res.render('home', { pageTitle: 'Home Page' });
});

app.get('/api/blog', (req, res) => {
  res.render('blog', { pageTitle: 'Blog Page' });
});

app.get('/api/auth/logout', (req, res) => {
  // Handle logout logic and redirect or render a page
  // ...
});

// Error middleware
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start Sequelize and sync models with the database
sequelize.sync().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
