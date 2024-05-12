import { QueryInterface, DataTypes } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, dt: typeof DataTypes) {
    await queryInterface.createTable('venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dt.INTEGER,
      },
      adminId: {
        type: dt.INTEGER,
        allowNull: false,
      },
      uid: {
        type: dt.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: dt.STRING,
        allowNull: false,
      },
      address: {
        type: dt.STRING,
        allowNull: false,
      },
      isApproved: {
        type: dt.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: dt.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: dt.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: dt.DATE,
      },
    })
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('venues')
  },
}
