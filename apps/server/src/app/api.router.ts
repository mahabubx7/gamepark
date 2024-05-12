import { Router } from 'express'
import jwtGuard from '@app/middlewares/jwt'
import dtoGuard from '@app/middlewares/dto'
import roleGuard from '@app/middlewares/role'
import authController, {
  loginDto,
  registerDto,
} from '@app/controllers/auth.controller'
import userController, {
  applyAsVendor,
  approveVendorAccountDto,
} from '@app/controllers/user.controller'
import venueController, { addVenueDto } from '@app/controllers/venue.controller'

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

/*=== Users ===*/
apiRouter.get('/user/:id', userController.getProfile) // Get user profile

apiRouter.put('/user/:id', userController.updateProfile) // Update user profile

apiRouter.delete('/user/:id', userController.deleteUser) // Delete user & its profile
/*=== \Users ===*/

/*=== Vendor ===*/
apiRouter.post(
  '/vendor',
  [dtoGuard(applyAsVendor)],
  userController.applyForVendorAccount,
) // Apply for vendor account

apiRouter.put(
  '/vendor/:id',
  [jwtGuard, roleGuard(['admin']), dtoGuard(approveVendorAccountDto)],
  userController.approveVendorAccount,
) // Approve vendor account

apiRouter.get(
  '/vendor',
  [jwtGuard, roleGuard(['admin'])],
  userController.getVendors,
) // Get all vendors

apiRouter.get('/vendor/detail/:id', [jwtGuard], userController.getVendorDetails) // Get vendor details

apiRouter.get(
  '/vendor/applicants',
  [jwtGuard, roleGuard(['admin'])],
  userController.getVendorApplicants,
) // Get all vendor applicants

/*=== \Vendor ===*/

/*=== Venue ===*/
apiRouter.post(
  '/venue',
  [jwtGuard, roleGuard(['vendor']), dtoGuard(addVenueDto)],
  venueController.addVenue,
) // Add new venue
/*=== \Venue ===*/

// --------------------------- //

export default apiRouter
