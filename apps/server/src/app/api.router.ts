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
  getOneDto,
  getVendorDetailsDto,
} from '@app/controllers/user.controller'
import venueController, {
  addVenueDto,
  getOneVenueDto,
  updateVenueDto,
} from '@app/controllers/venue.controller'

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
apiRouter.get('/user/:id', [dtoGuard(getOneDto)], userController.getProfile) // Get user profile

apiRouter.put('/user/:id', [dtoGuard(getOneDto)], userController.updateProfile) // Update user profile

apiRouter.delete('/user/:id', [dtoGuard(getOneDto)], userController.deleteUser) // Delete user & its profile
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

apiRouter.get(
  '/vendor/:id',
  [jwtGuard, dtoGuard(getVendorDetailsDto)],
  userController.getVendorDetails,
) // Get vendor details

apiRouter.get(
  '/vendor/applicants',
  [jwtGuard, roleGuard(['admin'])],
  userController.getVendorApplicants,
) // Get all vendor applicants

/*=== \Vendor ===*/

/*=== Venue ===*/

apiRouter.get(
  '/sports',
  [jwtGuard, roleGuard(['admin', 'vendor'])],
  venueController.getSportTypes,
) // Get all sports

apiRouter.post(
  '/venue',
  [jwtGuard, roleGuard(['vendor']), dtoGuard(addVenueDto)],
  venueController.addVenue,
) // Add new venue

apiRouter.get('/venue', venueController.getVenues) // Get all venues [approved only]

apiRouter.get(
  '/venue/own',
  [jwtGuard, roleGuard(['vendor'])],
  venueController.getVenuesByOwner,
) // Get all venues by the owner (vendor)

apiRouter.get(
  '/venue/pending',
  [jwtGuard, roleGuard(['admin'])],
  venueController.getPendingVenues,
) // Get all venues that are pending for approval

apiRouter.get(
  '/venue/:uid',
  [dtoGuard(getOneVenueDto)],
  venueController.getVenue,
) // Get venue details

apiRouter.put(
  '/venue/:uid',
  [jwtGuard, roleGuard(['admin', 'vendor']), dtoGuard(updateVenueDto)],
  venueController.updateVenue,
) // Update venue

apiRouter.delete(
  '/venue/:uid',
  [jwtGuard, roleGuard(['admin', 'vendor']), dtoGuard(getOneVenueDto)],
  venueController.deleteVenue,
) // Update venue

/*=== \Venue ===*/

// --------------------------- //

export default apiRouter
