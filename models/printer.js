'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Printer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Printer.hasMany(models.Order, {
        foreignKey: 'printerId'
      });
    }
  }
  Printer.init({
    Name: {
      type: DataTypes.STRING,
    },
    Location: {
      type: DataTypes.STRING,
    },
    Papers: {
      type: DataTypes.INTEGER,
    },
    ActiveStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    TaskCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Printers',
    modelName: 'Printer',
  });
  return Printer;
};