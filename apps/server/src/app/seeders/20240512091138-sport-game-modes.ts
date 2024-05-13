import { DataTypes, QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('SportGameModes', [
      {
        sportId: 1,
        gameModeId: 4,
      },
      {
        sportId: 1,
        gameModeId: 5,
      },
      {
        sportId: 2,
        gameModeId: 4,
      },
      {
        sportId: 2,
        gameModeId: 5,
      },
      {
        sportId: 3,
        gameModeId: 1,
      },
      {
        sportId: 3,
        gameModeId: 2,
      },
      {
        sportId: 3,
        gameModeId: 3,
      },
      {
        sportId: 3,
        gameModeId: 5,
      },
      {
        sportId: 4,
        gameModeId: 1,
      },
      {
        sportId: 4,
        gameModeId: 2,
      },
      {
        sportId: 4,
        gameModeId: 3,
      },
      {
        sportId: 4,
        gameModeId: 5,
      },
    ])
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SportGameModes', {}, {})
  },
}
