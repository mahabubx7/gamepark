import Env from '@mx7/tenv'

const parser = new Env(process.env as Record<string, string>)

type PosibbleEnvs =
  | 'dev'
  | 'development'
  | 'prod'
  | 'production'
  | 'test'
  | 'testing'
  | 'ci'
  | 'staging'

/*
|============================================
| @ENV parser for env variables with types
| * Type-safe environment variables
| * One time parsing and access
| * Add more as you need
|============================================
*/
const env = {
  envMode: parser.key<PosibbleEnvs>('NODE_ENV', 'dev').get(),
  isProduction: parser.isProduction,
  isDevelopment: parser.isDevelopment,
  isStaging: parser.isStaging,
  isTest: parser.isTest,
  // isCI: parser.key<boolean>('CI', false).bool().get(),

  // Application specific configurations //
  port: parser.key<number>('PORT', 5000).integer().unsigned().get(),
  host: parser.key<string>('HOST', '0.0.0.0').url().get(),
  logLevel: parser.key('LOG_LEVEL', 'info').get(),
  jwt: {
    jwtSecret: parser.key('JWT_SECRET', 'secret').get(),
    jwtExpire: parser.key('JWT_EXPIRE', '7d').get(),
  },
  databases: {
    postgres: {
      name: parser.key('DB_NAME', 'gamepark').get(),
      user: parser.key('DB_USER', 'postgres').get(),
      password: parser.key('DB_PASSWORD', 'postgres').get(),
      host: parser.key('DB_HOST', '127.0.0.1').get(),
      port: parser.key<number>('DB_PORT', 5432).integer().unsigned().get(),
      type: 'postgres', // fixed for postgres
    },
    // postgres: parser
    //   .key('POSTGRES_URI', 'postgres://postgres:postgres@127.0.0.1:5432/pern')
    //   .get(),
    redis: parser.key('REDIS_URI', 'redis://127.0.0.1:6379/pern').get(),
  },
  // add more as you need ...
} as const

export default env
