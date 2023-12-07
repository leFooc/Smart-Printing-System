'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Paybill, {
        foreignKey: 'userId'
      });
      User.hasMany(models.File, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    paper: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataUsed: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
  });
  return User;
};