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
    await queryInterface.bulkInsert('VenueSports', [
      {
        venueId: 1,
        sportId: 1,
      },
      {
        venueId: 1,
        sportId: 2,
      },
      {
        venueId: 1,
        sportId: 3,
      },
      {
        venueId: 1,
        sportId: 4,
      },
      {
        venueId: 2,
        sportId: 1,
      },
      {
        venueId: 2,
        sportId: 2,
      },
      {
        venueId: 2,
        sportId: 3,
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
    await queryInterface.bulkDelete('VenueSports', {}, {})
  },
}
