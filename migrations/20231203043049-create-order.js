'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      printerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Printers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'No ACTION'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      fileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      fileName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      copies: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isPortrait: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isA4: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      paperUsed: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Orders');
  }
};