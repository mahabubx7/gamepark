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

    await queryInterface.bulkInsert('Venues', [
      {
        name: 'Shahid Tajuddin Park',
        address: 'Road 103, Gulshan 2, Dhaka',
        uid: generateUid(),
        adminId: 2,
        isApproved: true,
        createdAt: new Date(),
      },
      {
        name: 'Eclipse Park',
        address: 'Mirpur 10, Dhaka',
        uid: generateUid(),
        adminId: 2,
        isApproved: true,
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
    await queryInterface.bulkDelete('Venues', {}, {})
  },
}
