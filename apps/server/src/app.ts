import express, { Express, Response, Request, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors' // Handle async errors in express
import env from '@config/env'
import logger from '@config/logger'
import corsOptions from '@config/cors'
import globalRouter from '@app/router'
import { authenticatePostgresDb } from '@config/orm'
import { ZodError } from 'zod'
import { DtoException } from '@app/middlewares/dto'

const app: Express = express() // Express app instance

app.use(cors({ ...corsOptions })) // Enable CORS
app.use(express.json()) // Enable JSON parsing
app.use(express.urlencoded({ extended: true })) // Enable URL-encoded parsing
app.use(globalRouter) // global registry for routes

// global error handler
app.use((err: any, __: Request, res: Response, next: NextFunction) => {
  const errCode = err.code ?? 500

  if (err instanceof ZodError || err instanceof DtoException) {
    return res.status(406).json({ errors: err.message, issues: err.issues })
  } else {
    res
      .status(errCode)
      .json({ message: err.message ?? 'Something went wrong!' })
  }

  if ([500, 501, 502].includes(errCode)) {
    logger.error('Internal Error: ', err)
  }

  return next(err)
})

// bootstrap the application
async function bootstrap() {
  // Add your code here

  await authenticatePostgresDb() // Connect to Postgres DB

  app.listen(env.port, env.host, () => {
    logger.info(`⚡ Server is running on http://${env.host}:${env.port}`)
  })
}

export { app, bootstrap }
