import { Model, DataTypes } from 'sequelize'
import { generateUid } from '@utils/uid'
import orm from '@config/orm'
import User from '@app/models/user'

interface VenueAttributes {
  id?: number
  adminId: number
  uid: string
  name: string
  address: string
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: orm,
    modelName: 'Venue',
    tableName: 'venues',
    timestamps: true,
    paranoid: true,
  },
)

// hooks
Venue.addHook('beforeCreate', (venue: Venue) => {
  venue.uid = generateUid() // generate unique id
})

// relations
Venue.belongsTo(User, {
  foreignKey: {
    name: 'adminId',
    allowNull: false,
  },
  as: 'admin',
  onDelete: 'CASCADE',
})

export default Venue
