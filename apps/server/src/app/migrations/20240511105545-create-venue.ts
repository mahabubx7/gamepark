import { QueryInterface, DataTypes } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, dt: typeof DataTypes) {
    await queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dt.INTEGER,
      },
      adminId: {
        type: dt.INTEGER,
        allowNull: false,
      },
      uid: {
        type: dt.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: dt.STRING,
        allowNull: false,
      },
      address: {
        type: dt.STRING,
        allowNull: false,
      },
      coverImage: {
        type: dt.STRING,
        allowNull: true,
        defaultValue:
          'https://res.cloudinary.com/duy2qjewy/image/upload/v1715667419/sample.jpg',
      },
      isApproved: {
        type: dt.BOOLEAN,
        defaultValue: false,
      },
      openningHour: {
        type: dt.STRING,
        defaultValue: '06:00',
      },
      closingHour: {
        type: dt.STRING,
        defaultValue: '22:00',
      },
      workingDays: {
        type: dt.ARRAY(dt.STRING),
        defaultValue: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
      },
      createdAt: {
        allowNull: false,
        type: dt.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: dt.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: dt.DATE,
      },
    })
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('Venues')
  },
}
