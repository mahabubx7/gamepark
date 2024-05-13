import orm from '@config/orm'
import { DataTypes, Model } from 'sequelize'
import { Team } from './team'
import User from './user'

interface TeamMembersAttributes {
  id?: number
  teamId: number
  userId: number
}

export class TeamMembers
  extends Model<TeamMembersAttributes>
  implements TeamMembersAttributes
{
  public id!: number
  public teamId!: number
  public userId!: number
}

TeamMembers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: orm,
    modelName: 'TeamMembers',
    timestamps: false,
  },
)

// relationships between Team and TeamMembers
Team.hasOne(TeamMembers, {
  foreignKey: 'teamId',
  as: 'members',
  onDelete: 'CASCADE',
})

TeamMembers.belongsTo(Team, {
  foreignKey: 'teamId',
  as: 'team',
})

// relationships between User and TeamMembers
User.belongsToMany(Team, {
  through: TeamMembers,
  foreignKey: 'userId',
})

Team.belongsToMany(User, {
  through: TeamMembers,
  foreignKey: 'teamId',
})
