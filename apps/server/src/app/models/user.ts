import { Model, DataTypes } from 'sequelize'
import orm from '@config/orm'
import bcrypt from 'bcrypt'

interface UserAttributes {
  id?: number
  email: string
  password: string
  username?: string
  role?: 'user' | 'vendor' | 'admin'
  isApproved?: boolean
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public username?: string
  public role!: 'user' | 'vendor' | 'admin'
  isApproved!: boolean
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'vendor', 'admin'),
      defaultValue: 'user',
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
    modelName: 'User',
  },
)

// Hash password before creating user
User.addHook('beforeCreate', async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10)
})

export default User
