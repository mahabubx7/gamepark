import { Model, DataTypes } from 'sequelize'
import orm from '@config/orm'
import User from 'src/app/models/user'

interface ProfileAttributes {
  id?: number
  userId: number
  fname: string
  lname: string
  address?: string
  createdAt?: Date
  updatedAt?: Date
}

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  public id!: number
  public userId!: number
  public fname!: string
  public lname!: string
  public address?: string
  public createdAt!: Date
  public updatedAt!: Date
}

Profile.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: orm,
    modelName: 'Profile',
  },
)

// relationship <Profile :: User> 1-1
User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' })
Profile.belongsTo(User, { foreignKey: 'userId' })

export default Profile
