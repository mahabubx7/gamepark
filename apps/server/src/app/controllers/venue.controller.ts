import { z } from 'zod'
import { Request, Response } from 'express'
import { generateUid } from '@utils/uid'
import Venue from '@app/models/venue'
import User from '@app/models/user'
import logger from '@config/logger'
import Profile from '@app/models/profile'
import { Sport } from '@app/models/sport'
import { VenueSports } from '@app/models/venuesports'

class VenueController {
  /*----------------------------------------------
   * @venue add a new venue
   *---------------------------------------------*/
  async addVenue(req: Request, res: Response) {
    try {
      const {
        body: { name, address, coverImage, workDays, sportTypes },
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
        coverImage: coverImage ?? undefined,
        workingDays: workDays ?? [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Sunday',
          'Saturday',
        ],
        adminId: +Number(req.user!.id),
        uid: generateUid(), // generating UID for the venue
      })

      // attach sport types to the venue
      VenueSports.bulkCreate(
        sportTypes.map((sportId) => ({ sportId, venueId: venue.id })) as any,
      )

      return res.status(201).json({
        message: 'New venue added!',
        data: venue.toJSON(),
      })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue get list of venues [applied & not approved]
   *---------------------------------------------*/
  async getPendingVenues(_req: Request, res: Response) {
    try {
      // get all venues with their admin details
      const venues = await Venue.findAll({
        where: { isApproved: false },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'email'],
            subQuery: true,
            include: [
              {
                model: Profile,
                as: 'profile',
                attributes: ['fname', 'lname', 'address'],
              },
            ],
          },
        ],
      })
      return res.status(200).json({ data: venues })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }
  /*----------------------------------------------
   * @venue get list of venues
   *---------------------------------------------*/
  async getVenuesByOwner(req: Request, res: Response) {
    try {
      // get all venues with their admin details
      const venues = await Venue.findAll({
        where: { adminId: +Number(req.user!.id) },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'email'],
            subQuery: true,
            include: [
              {
                model: Profile,
                as: 'profile',
                attributes: ['fname', 'lname', 'address'],
              },
            ],
          },
        ],
      })
      return res.status(200).json({ data: venues })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue get list of venues
   *---------------------------------------------*/
  async getVenues(_req: Request, res: Response) {
    try {
      // get all venues with their admin details
      const venues = await Venue.findAll({
        where: { isApproved: true },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'email'],
            subQuery: true,
            include: [
              {
                model: Profile,
                as: 'profile',
                attributes: ['fname', 'lname', 'address'],
              },
            ],
          },
        ],
      })
      return res.status(200).json({ data: venues })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue get a venue details
   *---------------------------------------------*/
  async getVenue(req: Request, res: Response) {
    try {
      const { uid } = req.params as z.infer<typeof getOneVenueDto>['params'] // get user id
      // get the venue details including the admin details
      logger.info('uid => ', uid)
      const venue = await Venue.findOne({
        where: { uid },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'email', 'username', 'isApproved'],
            subQuery: true,
            include: [
              {
                model: Profile,
                as: 'profile',
                attributes: ['fname', 'lname', 'address'],
              },
            ],
          },
        ],
      })

      if (!venue) return res.status(404).json({ message: 'Venue not found!' })
      return res.status(200).json({ data: venue.toJSON() })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue update a venue information
   *---------------------------------------------*/
  async updateVenue(req: Request, res: Response) {
    const {
      params: { uid },
      body: { name, address },
    } = await updateVenueDto.parseAsync(req)
    try {
      // find the venue
      const venue = await Venue.findOne({ where: { uid } })
      if (!venue) return res.status(404).json({ message: 'Venue not found!' })
      // check the ownership
      if (
        req.user!.role !== 'admin' &&
        venue.adminId !== +Number(req.user!.id)
      ) {
        // only admin or the owner can update the venue
        return res.status(403).json({ message: 'Forbidden access!' })
      }
      // update the venue
      await venue
        .update({
          name: name ?? venue.name,
          address: address ?? venue.address,
        })
        .catch((error) => {
          logger.error(error)
          return res
            .status(400)
            .json({ message: 'Failed to update venue!', error })
        })
      return res.status(202).json({ message: 'Venue updated!', data: venue })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue delete a venue record
   *---------------------------------------------*/
  async deleteVenue(req: Request, res: Response) {
    try {
      const {
        params: { uid },
      } = await getOneVenueDto.parseAsync(req)
      // find the venue
      const venue = await Venue.findOne({ where: { uid } })
      if (!venue) return res.status(404).json({ message: 'Venue not found!' })
      // check the ownership
      if (
        req.user!.role !== 'admin' &&
        venue.adminId !== +Number(req.user!.id)
      ) {
        // only admin or the owner can update the venue
        return res.status(403).json({ message: 'Forbidden access!' })
      }
      // delete the venue
      await venue.destroy().catch((err) => {
        logger.error(err)
        return res
          .status(400)
          .json({ message: 'Failed to delete venue!', error: err })
      })
      return res.status(204).json({ message: 'Venue deleted!' })
    } catch (error) {
      logger.error(error)
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /*----------------------------------------------
   * @venue get avaliable sport types
   *---------------------------------------------*/
  async getSportTypes(_req: Request, res: Response) {
    try {
      // get all sport types
      const sportTypes = await Sport.findAll()
      return res.status(200).json({ data: sportTypes })
    } catch (err) {
      logger.error(err)
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err })
    }
  }
}

// DTO for incoming request validation //

// apply venue Dto
export const addVenueDto = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name must be given!' }),
    address: z.string({ required_error: 'Address must be given!' }),
    coverImage: z.optional(
      z.string({ required_error: 'Cover image must be given!' }).url(),
    ),
    workDays: z.optional(z.array(z.string())),
    sportTypes: z.array(z.number()),
  }),
})

export const updateVenueDto = z.object({
  params: z.object({
    uid: z.string({ required_error: 'Unique ID must be given!' }),
  }),
  body: z.object({
    name: z.string({ required_error: 'Name must be given!' }).optional(),
    address: z.string({ required_error: 'Address must be given!' }).optional(),
  }),
})

export const getOneVenueDto = z.object({
  params: z.object({
    uid: z.string({ required_error: 'Unique ID must be given!' }),
  }),
})

export default new VenueController()
