import { generateUsernameHash } from '@utils/uid'
import { QueryInterface, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

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
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          // id: 1,
          email: 'user@gmail.com',
          password: await bcrypt.hash('123456', 10),
          role: 'user',
          isApproved: true,
          username: generateUsernameHash(),
          createdAt: new Date(),
        },
        {
          // id: 2,
          email: 'vendor@gmail.com',
          password: await bcrypt.hash('123456', 10),
          role: 'vendor',
          isApproved: false, // admin needs to approve
          username: generateUsernameHash('vendor_'),
          createdAt: new Date(),
        },
        {
          // id: 3,
          email: 'admin@gmail.com',
          password: await bcrypt.hash('123456', 10),
          role: 'admin',
          isApproved: true,
          username: generateUsernameHash('admin_'),
          createdAt: new Date(),
        },
      ],
      {
        retry: { max: 2 },
      },
    )

    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          // id: 1,
          fname: 'John',
          lname: 'Doe',
          userId: 1,
          createdAt: new Date(),
        },
        {
          // id: 2,
          fname: 'Jane',
          lname: 'Doe',
          userId: 2,
          createdAt: new Date(),
        },
        {
          // id: 3,
          fname: 'Admin',
          lname: 'Admin',
          userId: 3,
          createdAt: new Date(),
        },
      ],
      { retry: { max: 2 } },
    )
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {}, {})
    await queryInterface.bulkDelete('Profiles', {}, {})
  },
}
