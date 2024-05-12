import { z } from 'zod'
import { Request, Response } from 'express'
import { generateUid } from '@utils/uid'
import Venue from '@app/models/venue'
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
      // only verfied vendors can add a venue
      const vendor = await User.findByPk(+Number(req.user!.id))
      if (!vendor) return res.status(404).json({ message: 'Vendor not found!' })
      if (!vendor.isApproved)
        return res
          .status(403)
          .json({ message: 'Vendor account not approved yet!' })
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
}

// DTO for incoming request validation //

// apply venue Dto
export const addVenueDto = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name must be given!' }),
    address: z.string({ required_error: 'Address must be given!' }),
  }),
})

export default new VenueController()
