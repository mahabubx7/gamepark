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
    await queryInterface.bulkInsert('GameModes', [
      {
        name: '1v1',
        description: '1 to 1 pair',
        totalPlayers: 2,
        createdAt: new Date(),
      },
      {
        name: '2v2',
        description: '2 vs 2 pair',
        totalPlayers: 4,
        createdAt: new Date(),
      },
      {
        name: '4v4',
        description: '4 vs 4 pair',
        totalPlayers: 8,
        createdAt: new Date(),
      },
      {
        name: '11v11',
        description: '11 vs 11 pair',
        totalPlayers: 22,
        createdAt: new Date(),
      },
      {
        name: 'custom',
        description: 'make your custom pair',
        totalPlayers: 1,
        createdAt: new Date(),
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
    await queryInterface.bulkDelete('GameModes', {}, {})
  },
}
