const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

const db = {};

// Import all models in the current directory
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Exclude the index.js file
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configure associations, if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
