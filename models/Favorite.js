const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Favorite = sequelize.define('Favorite', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Favorite;
