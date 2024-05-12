import { Router } from 'express'
import jwtGuard from './middlewares/jwt'
import dtoGuard from './middlewares/dto'
import authController, {
  loginDto,
  registerDto,
} from '@app/controllers/auth.controller'
import venueController, {
  applyAsVendor,
  addVenueDto,
} from '@app/controllers/venue.controller'
import roleGuard from './middlewares/role'

const apiRouter = Router()

// --- API routes registry --- //

/*=== Auth ===*/
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
/*=== \Auth ===*/

/*=== Venue ===*/
apiRouter.post(
  '/apply/vendor',
  [dtoGuard(applyAsVendor)],
  venueController.applyForVendorAccount,
) // Apply for vendor account

apiRouter.post(
  '/venue',
  [jwtGuard, roleGuard(['vendor']), dtoGuard(addVenueDto)],
  venueController.addVenue,
) // Add new venue
/*=== \Venue ===*/

// --------------------------- //

export default apiRouter
