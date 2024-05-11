import express, { Express } from 'express'
import cors from 'cors'
import env from '@config/env'
import logger from '@config/logger'
import corsOptions from '@config/cors'
import globalRouter from '@app/router'
import { authenticatePostgresDb } from '@config/orm'

const app: Express = express() // Express app instance

app.use(cors({ ...corsOptions })) // Enable CORS
app.use(express.json()) // Enable JSON parsing
app.use(express.urlencoded({ extended: true })) // Enable URL-encoded parsing
app.use(globalRouter) // global registry for routes

async function bootstrap() {
  // Add your code here

  await authenticatePostgresDb() // Connect to Postgres DB

  app.listen(env.port, env.host, () => {
    logger.info(`⚡ Server is running on http://${env.host}:${env.port}`)
  })
}

export { app, bootstrap }
