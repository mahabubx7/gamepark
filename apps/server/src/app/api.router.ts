import { Router } from 'express'
import authController from '@app/controllers/auth.controller'
import jwtGuard from './middlewares/jwt'

const apiRouter = Router()

// --- API routes registry --- //

apiRouter.post('/auth/register', authController.register)
apiRouter.post('/auth/login', authController.login)
apiRouter.get(
  '/auth/whoami',
  [jwtGuard], // JWT Guard middleware
  authController.whoami,
)

// --------------------------- //

export default apiRouter
