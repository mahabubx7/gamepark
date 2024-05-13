import { DataTypes, QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable(
      'TeamMembers',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        teamId: {
          type: Sequelize.INTEGER,
        },
        memeberId: {
          type: Sequelize.INTEGER,
        },
      },
      {
        uniqueKeys: {
          uniqueTeamMember: {
            fields: ['teamId', 'memeberId'],
          },
        },
      },
    )
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable('TeamMembers')
  },
}
