import { Model, DataTypes } from 'sequelize'
import orm from '@config/orm'

interface UserAttributes {
  id?: number
  email: string
  password: string
  role: 'user' | 'vendor'
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

export default class User
  extends Model<UserAttributes>
  implements UserAttributes
{
  public id!: number
  public email!: string
  public password!: string
  public role!: 'user' | 'vendor'
  public createdAt!: Date
  public deletedAt?: Date
  public updatedAt?: Date
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'vendor'),
      defaultValue: 'user',
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
    modelName: 'User',
  },
)
