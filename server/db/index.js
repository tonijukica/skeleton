const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  'baza',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

const db = {
  User: sequelize.import('./models/user')
}

db.sequelize = sequelize;

module.exports = db;