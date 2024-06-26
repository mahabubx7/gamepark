import orm from '@config/orm'
import { DataTypes, Model } from 'sequelize'

interface SportAttributes {
  id: number
  name: string
  description?: string
  uid: string
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

export class Sport extends Model<SportAttributes> implements SportAttributes {
  public id!: number
  public name!: string
  public uid!: string
  public description!: string

  public readonly createdAt!: Date
  public readonly deletedAt!: Date
  public readonly updatedAt!: Date
}

Sport.init(
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
    uid: {
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
    modelName: 'Sport',
    paranoid: true,
  },
)
