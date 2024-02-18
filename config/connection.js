require("dotenv").config();
const { SQL_NAME, SQL_USER, SQL_PW, SQL_HOST, SQL_DIALECT } = process.env;
const Sequelize = require("sequelize");

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(SQL_NAME, SQL_USER, SQL_PW, {
      host: SQL_HOST,
      dialect: SQL_DIALECT,
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;