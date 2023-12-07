'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.File, {
        foreignKey: 'fileId'
      });
      Order.belongsTo(models.Printer, {
        foreignKey: 'printerId'
      });
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Order.init({
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fileId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    side: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    isPortrait: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isA4: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    paperUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Orders',
    modelName: 'Order',
  });
  return Order;
};