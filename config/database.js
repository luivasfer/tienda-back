const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tienda_db', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

module.exports = sequelize;