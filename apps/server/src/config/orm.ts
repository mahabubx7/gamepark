import { Sequelize } from 'sequelize'
import env from '@config/env'
import logger from './logger'

/*
|============================================
| @Sequelize (ORM) client
| * Database connection client <postgres>
|============================================
*/

const { user, password, name, host, port, type } = env.databases.postgres

function getDb() {
  if (process.env.NODE_ENV === 'production') {
    return name + '_prod'
  } else if (process.env.NODE_ENV === 'test') {
    return name + '_test'
  } else {
    return name + '_dev'
  }
}

const orm = new Sequelize({
  username: user,
  password,
  database: getDb(),
  host,
  port,
  logging: env.isDevelopment,
  dialect: type,
  dialectOptions: {
    ssl: env.isProduction,
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
  },
})

export const authenticatePostgresDb = async () => {
  try {
    await orm.authenticate()
    logger.info('⛁ Postgres connected successfully!')
  } catch (error) {
    logger.error('❌ Unable to connect to the database:', error)
  }
}

export default orm
