import orm from '@config/orm'
import { Model, DataTypes } from 'sequelize'
import Venue from './venue'
import { Sport } from './sport'

interface VenueSportsAttributes {
  id: number
  venueId: number
  sportId: number
  hourlyPrice: number
}

export class VenueSports
  extends Model<VenueSportsAttributes>
  implements VenueSportsAttributes
{
  public id!: number
  public venueId!: number
  public sportId!: number
  public hourlyPrice!: number
}

VenueSports.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hourlyPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 100,
    },
  },
  {
    sequelize: orm,
    modelName: 'VenueSports',
    timestamps: false,
  },
)

// relationships between Venue and Sport
Venue.belongsToMany(Sport, {
  through: VenueSports,
  foreignKey: 'venueId',
})

Sport.belongsToMany(Venue, {
  through: VenueSports,
  foreignKey: 'sportId',
})
