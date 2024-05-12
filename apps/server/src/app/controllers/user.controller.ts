import { z } from 'zod'
import { Request, Response } from 'express'
import { generateUsernameHash } from '@utils/uid'
import Profile from '@app/models/profile'
import User from '@app/models/user'

class UserController {
  /*----------------------------------------------
   * @user apply for vendor account
   *---------------------------------------------*/
  async applyForVendorAccount(req: Request, res: Response) {
    try {
      const {
        body: { email, password, fname, lname },
      } = (await applyAsVendor.parseAsync(req)) as z.infer<typeof applyAsVendor>
      // create a new user
      await User.create({
        email,
        password,
        role: 'vendor', // set user role to vendor
        username: generateUsernameHash('vendor_'), // generate a unique username
      })
        .then((u) => {
          // create a new profile for the user
          Profile.create({
            userId: u.id,
            fname,
            lname,
          }).catch((err) => {
            return res
              .status(400)
              .json({ message: 'An error occured!', error: err })
          })
          // response back
          const { password, ..._u } = u.toJSON()
          return res.status(201).json({
            message: 'Vendor account created successfully!',
            data: _u,
          })
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: 'An error occured!', error: err })
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /*----------------------------------------------
   * @user vendor account approval [by admins]
   *---------------------------------------------*/
  async approveVendorAccount(req: Request, res: Response) {
    try {
      const { id } = req.params as z.infer<
        typeof approveVendorAccountDto
      >['params']
      // find vendor by id
      const vendor = await User.findByPk(+id)
      if (!vendor || vendor.role !== 'vendor')
        return res.status(404).json({ message: 'Vendor not found!' })
      // update vendor account as approved
      vendor.isApproved = true
      await vendor
        .save()
        .then((v) => {
          const { password, ..._v } = v.toJSON()
          return res.status(200).json({
            message: 'Vendor account approved!',
            data: _v,
          })
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: 'An error occured!', error: err })
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /*----------------------------------------------
   * @user get vendors [pending for approval]
   *---------------------------------------------*/
  async getVendorApplicants(_req: Request, res: Response) {
    try {
      // find all vendors
      const vendors = await User.findAll({
        where: { role: 'vendor', isApproved: false },
        limit: 100, // default limit for now
      })
      if (!vendors || vendors.length === 0)
        return res.status(404).json({ message: 'No vendors found!' })
      // filter vendors who are not approved
      return res.status(200).json({
        message: 'List of vendor applicants',
        data: vendors.map((v) => {
          const { password, ..._v } = v.toJSON() // remove password from user object
          return _v
        }),
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /*----------------------------------------------
   * @user get vendors list
   *---------------------------------------------*/
  async getVendors(req: Request, res: Response) {}

  /*----------------------------------------------
   * @user get vendor details
   *---------------------------------------------*/
  async getVendorDetails(req: Request, res: Response) {}

  /*----------------------------------------------
   * @user get profile
   *---------------------------------------------*/
  async getProfile(req: Request, res: Response) {}

  /*----------------------------------------------
   * @user update profile
   *---------------------------------------------*/
  async updateProfile(req: Request, res: Response) {}

  /*----------------------------------------------
   * @user delete profile
   *---------------------------------------------*/
  async deleteProfile(req: Request, res: Response) {}
}

// DTO for incoming request validation //

// approve vendor account
export const approveVendorAccountDto = z.object({
  params: z.object({
    id: z.string({ required_error: 'Vendor ID must be given!' }),
  }),
})

// apply for vendor
export const applyAsVendor = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!' }).email(),
    password: z.string({ required_error: 'Password must be given!' }),
    fname: z.string({ required_error: 'First Name must be given!' }),
    lname: z.string({ required_error: 'Last Name must be given!' }),
  }),
})

export default new UserController()
