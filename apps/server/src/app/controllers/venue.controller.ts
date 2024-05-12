import { z } from 'zod'
import { Request, Response } from 'express'
import { generateUid, generateUsernameHash } from '@utils/uid'
import Venue from '@app/models/venue'
import Profile from '@app/models/profile'
import User from '@app/models/user'

class VenueController {
  /*----------------------------------------------
   * @venue add a new venue
   *---------------------------------------------*/
  async addVenue(req: Request, res: Response) {
    try {
      const {
        body: { name, address },
      } = (await addVenueDto.parseAsync(req)) as z.infer<typeof addVenueDto>
      // create a new venue
      const venue = await Venue.create({
        name,
        address,
        adminId: +Number(req.user!.id),
        uid: generateUid(), // generating UID for the venue
      })
      return res.status(201).json({
        message: 'New venue added!',
        data: venue.toJSON(),
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /*----------------------------------------------
   * @venue apply for vendor account
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
        username: generateUsernameHash(), // generate a unique username
      })
        .then(async (u) => {
          // create a new profile
          const { password, ..._user } = u.toJSON()
          await Profile.create({
            userId: _user.id!,
            fname,
            lname,
          })
            .then((p) => {
              return res.status(201).json({
                message: 'Vendor account created!',
                data: {
                  ..._user,
                  profile: {
                    fname: p.fname,
                    lname: p.lname,
                    address: p.address,
                  },
                },
              })
            })
            .catch((err) => {
              return res
                .status(400)
                .json({ message: 'An error occured!', error: err })
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
}

// DTO for incoming request validation //

// apply venue Dto
export const addVenueDto = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name must be given!' }),
    address: z.string({ required_error: 'Address must be given!' }),
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

export default new VenueController()
