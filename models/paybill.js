'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paybill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paybill.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Paybill.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paper: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Paybills',
    modelName: 'Paybill',
  });
  return Paybill;
};