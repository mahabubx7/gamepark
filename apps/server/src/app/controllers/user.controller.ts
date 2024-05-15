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
  async getVendors(_req: Request, res: Response) {
    try {
      // find all vendors [approved only]
      const vendors = await User.findAll({
        where: { role: 'vendor', isApproved: true },
        limit: 100, // default limit for now
      })
      return res.status(200).json({
        message: 'List of vendors',
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
   * @user get vendor details
   *---------------------------------------------*/
  async getVendorDetails(req: Request, res: Response) {
    try {
      const { id } = req.params as z.infer<typeof getVendorDetailsDto>['params']
      // find vendor by id
      const vendor = await User.findByPk(+id)
      if (!vendor || vendor.role !== 'vendor')
        return res.status(404).json({ message: 'Vendor not found!' })
      // response back
      const { password, ..._v } = vendor.toJSON() // remove password from user object
      return res.status(200).json({
        message: 'Vendor details',
        data: _v,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error })
    }
  }

  /*----------------------------------------------
   * @user get profile
   *---------------------------------------------*/
  async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params as z.infer<typeof getOneDto>['params']
      // find user by id
      const user = await User.findByPk(+id)
      if (!user) return res.status(404).json({ message: 'User not found!' })
      // find user profile
      const profile = await Profile.findOne({ where: { userId: user.id } })
      if (!profile)
        return res.status(404).json({ message: 'Profile not found!' })
      // response back
      const { password, ..._u } = user.toJSON() // remove password from user object
      return res.status(200).json({
        message: 'Profile details',
        data: {
          ..._u,
          profile: {
            fname: profile.fname,
            lname: profile.lname,
            address: profile.address,
          },
        },
      })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error })
    }
  }

  /*----------------------------------------------
   * @user update profile
   *---------------------------------------------*/
  async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.params as z.infer<typeof getOneDto>['params'] // get user id
      const { fname, lname, address } = (await updateProfileDto.parseAsync(
        req,
      )) as z.infer<typeof updateProfileDto>['body']
      // find user by id
      const user = await User.findByPk(+id)
      if (!user) return res.status(404).json({ message: 'User not found!' })
      // find user profile
      const profile = await Profile.findOne({ where: { userId: user.id } })
      if (!profile)
        return res.status(404).json({ message: 'Profile not found!' })
      // update profile
      profile.fname = fname || profile.fname
      profile.lname = lname || profile.lname
      profile.address = address || profile.address
      await profile
        .save()
        .then((p) => {
          return res.status(202).json({
            message: 'Profile updated successfully!',
            data: {
              fname: p.fname,
              lname: p.lname,
              address: p.address,
            },
          })
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: 'An error occured!', error: err })
        })
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err })
    }
  }

  /*----------------------------------------------
   * @user delete user & its profile
   *---------------------------------------------*/
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params as z.infer<typeof deleteUserDto>['params']
      // find user by id
      const user = await User.findByPk(+id)
      if (!user) return res.status(404).json({ message: 'User not found!' })
      // find user profile
      const profile = await Profile.findOne({ where: { userId: user.id } })
      if (!profile)
        return res.status(404).json({ message: 'Profile not found!' })
      // delete user profile
      await profile.destroy()
      // delete user
      await user
        .destroy()
        .then(() => {
          return res.status(202).json({ message: 'User deleted successfully!' })
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: 'An error occured!', error: err })
        })
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err })
    }
  }
}

// DTO for incoming request validation //

// update user profile
export const updateProfileDto = z.object({
  params: z.object({
    id: z.string({ required_error: 'User ID must be given!' }),
  }),
  body: z.object({
    fname: z.string().optional(),
    lname: z.string().optional(),
    address: z.string().optional(),
  }),
})

// delete user
export const deleteUserDto = z.object({
  params: z.object({
    id: z.string({ required_error: 'User ID must be given!' }),
  }),
})

// get user profile
export const getOneDto = z.object({
  params: z.object({
    id: z.string({ required_error: 'User ID must be given!' }),
  }),
})

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

// get vendor details
export const getVendorDetailsDto = z.object({
  params: z.object({
    id: z.string({ required_error: 'Vendor ID must be given!' }),
  }),
})

export default new UserController()
