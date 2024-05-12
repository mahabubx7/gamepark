import orm from '@config/orm'
import { DataTypes, Model } from 'sequelize'

interface GameModeAttributes {
  id: number
  name?: string
  description?: string
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

export class GameMode
  extends Model<GameModeAttributes>
  implements GameModeAttributes
{
  public id!: number
  public name!: string
  public description!: string

  public readonly createdAt!: Date
  public readonly deletedAt!: Date
  public readonly updatedAt!: Date
}

GameMode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'GameMode',
    paranoid: true,
  },
)
