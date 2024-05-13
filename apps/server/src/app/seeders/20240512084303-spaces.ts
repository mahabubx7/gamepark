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
    await queryInterface.bulkInsert('Spaces', [
      {
        name: 'Football X1',
        code: 'v1_football_1',
        sportTypeId: 1,
        venueId: 1,
        createdAt: new Date(),
      },
      {
        name: 'Cricket X1',
        code: 'v1_cricket_1',
        sportTypeId: 2,
        venueId: 1,
        createdAt: new Date(),
      },
      {
        name: 'Football X1',
        code: 'v2_football_1',
        sportTypeId: 1,
        venueId: 2,
        createdAt: new Date(),
      },
      {
        name: 'Cricket X1',
        code: 'v2_cricket_1',
        sportTypeId: 2,
        venueId: 2,
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
    await queryInterface.bulkDelete('Spaces', {}, {})
  },
}
