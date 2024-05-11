import { Router } from 'express'
import authController, {
  loginDto,
  registerDto,
} from '@app/controllers/auth.controller'
import jwtGuard from './middlewares/jwt'
import dtoGuard from './middlewares/dto'

const apiRouter = Router()

// --- API routes registry --- //

apiRouter.post(
  '/auth/register',
  [dtoGuard(registerDto)],
  authController.register,
) // Register user

// Login user
apiRouter.post('/auth/login', [dtoGuard(loginDto)], authController.login)

// WhoamI
apiRouter.get(
  '/auth/whoami',
  [jwtGuard], // JWT Guard middleware
  authController.whoami,
)

// --------------------------- //

export default apiRouter
