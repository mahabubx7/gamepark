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
        hourlyPrice: 200,
      },
      {
        venueId: 1,
        sportId: 2,
        hourlyPrice: 100,
      },
      {
        venueId: 1,
        sportId: 3,
        hourlyPrice: 100,
      },
      {
        venueId: 1,
        sportId: 4,
        hourlyPrice: 100,
      },
      {
        venueId: 2,
        sportId: 1,
        hourlyPrice: 150,
      },
      {
        venueId: 2,
        sportId: 2,
        hourlyPrice: 50,
      },
      {
        venueId: 2,
        sportId: 3,
        hourlyPrice: 100,
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
