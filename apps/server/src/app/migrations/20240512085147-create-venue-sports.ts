import { DataTypes, QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable(
      'VenueSports',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        venueId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        sportId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          uniqueVenueSport: {
            fields: ['venueId', 'sportId'],
          },
        },
      },
    )
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('VenueSports')
  },
}
