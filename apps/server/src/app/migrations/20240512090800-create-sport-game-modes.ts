import { DataTypes, QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable(
      'SportGameModes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sportId: {
          type: Sequelize.INTEGER,
        },
        gameModeId: {
          type: Sequelize.INTEGER,
        },
      },
      {
        uniqueKeys: {
          uniqueSportGameMode: {
            fields: ['sportId', 'gameModeId'],
          },
        },
      },
    )
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('SportGameModes')
  },
}
