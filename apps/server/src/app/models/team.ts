import orm from '@config/orm'
import { DataTypes, Model } from 'sequelize'
import User from './user'

interface TeamAttributes {
  id?: number
  code: string
  teamSize: number
  ownerId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class Team extends Model<TeamAttributes> implements TeamAttributes {
  public id!: number
  public code!: string
  public teamSize!: number
  public ownerId!: number
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

Team.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    teamSize: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: orm,
    modelName: 'Teams',
    timestamps: true,
  },
)

Team.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner',
  onDelete: 'CASCADE',
})
