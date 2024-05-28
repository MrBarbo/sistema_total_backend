const { Sequelize } = require('sequelize');
require('dotenv').config()

//Create sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    port:process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
  });

module.exports = sequelize;