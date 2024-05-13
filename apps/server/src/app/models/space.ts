import orm from '@config/orm'
import { Model, DataTypes } from 'sequelize'
import Venue from '@app/models/venue'

interface SpaceAttributes {
  id: number
  name: string
  code: string
  sportTypeId: number
  venueId: number
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

export class Space extends Model<SpaceAttributes> implements SpaceAttributes {
  public id!: number
  public name!: string
  public code!: string
  public sportTypeId!: number
  public venueId!: number

  public readonly createdAt!: Date
  public readonly deletedAt!: Date
  public readonly updatedAt!: Date
}

Space.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sportTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
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
    modelName: 'Space',
  },
)

// relationship with Venue
Venue.hasMany(Space, {
  foreignKey: 'venueId',
  as: 'spaces',
  onDelete: 'CASCADE',
})

Space.belongsTo(Venue, {
  foreignKey: 'venueId',
  as: 'venue',
})
