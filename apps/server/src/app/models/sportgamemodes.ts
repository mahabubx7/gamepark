import orm from '@config/orm'
import { DataTypes, Model } from 'sequelize'
import { Sport } from './sport'
import { GameMode } from './gamemode'

interface SportGameModesAttributes {
  id: number
  sportId: number
  gameModeId: number
}

export class SportGameModes
  extends Model<SportGameModesAttributes>
  implements SportGameModesAttributes
{
  public id!: number
  public sportId!: number
  public gameModeId!: number
}

SportGameModes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameModeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: orm,
    modelName: 'SportGameModes',
    timestamps: false,
  },
)

// relationships between Sport and GameMode
Sport.belongsToMany(GameMode, {
  through: SportGameModes,
  foreignKey: 'sportId',
})

GameMode.belongsToMany(Sport, {
  through: SportGameModes,
  foreignKey: 'gameModeId',
})
