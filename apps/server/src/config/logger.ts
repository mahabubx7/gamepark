import pino from 'pino'
import env from '@config/env'

/*
|============================================
| @Logger configurations
| * Pino logger with pretty print
| * Log level based on env variable
| * Add more configurations as you need
|============================================
*/
const logger = pino({
  level: env.logLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
})

export default logger
