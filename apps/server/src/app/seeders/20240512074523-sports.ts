import { generateUid } from '@utils/uid'
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
    await queryInterface.bulkInsert('Sports', [
      {
        name: 'Football',
        uid: 'football_' + generateUid(4),
        createdAt: new Date(),
      },
      {
        name: 'Cricket',
        uid: 'cricket_' + generateUid(4),
        createdAt: new Date(),
      },
      {
        name: 'Padel',
        uid: 'padel_' + generateUid(4),
        createdAt: new Date(),
      },
      {
        name: 'Tenis',
        uid: 'tenis_' + generateUid(4),
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
    await queryInterface.bulkDelete('Sports', {}, {})
  },
}
