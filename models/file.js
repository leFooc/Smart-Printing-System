'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      File.hasMany(models.Order, {
        foreignKey: 'fileId'
      });
    }
  }
  File.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    paper: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Files',
    modelName: 'File',
  });
  return File;
};