require('ts-node/register')
require('dotenv').config()

function getDb() {
  const dbName = process.env.DB_NAME || 'pern_db'
  if (process.env.NODE_ENV === 'production') {
    return dbName + '_prod'
  } else if (process.env.NODE_ENV === 'test') {
    return dbName + '_test'
  } else {
    return dbName + '_dev'
  }
}

module.exports = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: getDb(),
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_TYPE || 'postgres',
  port: process.env.DB_PORT || 5432,
}
