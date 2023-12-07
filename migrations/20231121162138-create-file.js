'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      fileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fileType: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      paper: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};