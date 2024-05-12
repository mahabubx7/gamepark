import { Model, DataTypes } from 'sequelize'
import orm from '@config/orm'
import User from '@app/models/user'

interface VenueAttributes {
  id?: number
  adminId: number
  uid: string
  name: string
  address: string
  isApproved?: boolean
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

class Venue extends Model<VenueAttributes> implements VenueAttributes {
  public id!: number
  public adminId!: number
  public uid!: string
  public name!: string
  public address!: string
  public isApproved!: boolean
  public createdAt!: Date
  public deletedAt?: Date
  public updatedAt?: Date
}

Venue.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Venue',
  },
)

// relations
Venue.belongsTo(User, {
  foreignKey: {
    name: 'adminId',
    allowNull: false,
  },
  as: 'owner',
  onDelete: 'CASCADE',
})

export default Venue
