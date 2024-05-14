import { Request, Response } from 'express'
import User from '@app/models/user'
import Profile from '@app/models/profile'
import logger from '@config/logger'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { makeJwtToken } from '@utils/jwt'
import { generateUsernameHash } from '@utils/uid'
import { Team } from '@app/models/team'
import { TeamMembers } from '@app/models/teammembers'

class AuthController {
  /*----------------------------------------------
   * @auth login user
   *---------------------------------------------*/
  async login(req: Request, res: Response) {
    try {
      const {
        body: { email, password },
      } = req.parsed as unknown as z.infer<typeof loginDto>

      // Check if user exists
      const user = await User.findOne({ where: { email } })

      if (!user) return res.status(404).json({ message: 'User not found' })

      // Check if password is correct
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials!' })
      }

      // remove password from user object
      const { password: pwd, ..._user } = user.toJSON()

      // success return 200
      return res.status(200).json({
        message: 'User logged in successfully',
        data: _user,
        token: makeJwtToken({
          id: _user.id,
          email: _user.email,
          role: _user.role,
        }),
      })
    } catch (err) {
      // internal server error return 500
      logger.error(err)
      return res.status(500).json({ message: 'Internal Server Error!' })
    }
  }

  /*----------------------------------------------
   * @auth register user
   *---------------------------------------------*/
  async register(req: Request, res: Response) {
    try {
      const {
        body: { email, password, fname, lname },
      } = req.parsed as unknown as z.infer<typeof registerDto>

      // Check if user already exists
      const user = await User.findOne({ where: { email } })

      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // create user
      await User.create({
        email,
        password,
        username: generateUsernameHash(),
      })
        .then(async (user) => {
          // remove password from user object
          const { password: pwd, ..._user } = user.toJSON()

          // create profile
          await Profile.create({
            fname,
            lname,
            userId: _user.id!,
          })
            .then(async (p) => {
              // create the solo team
              await Team.create({
                code: 'solo_' + _user.username,
                ownerId: _user.id!,
                createdAt: new Date(),
                teamSize: 1,
              }).then(async (team) => {
                // add user to the team member
                await TeamMembers.create({
                  teamId: team.id!,
                  memberId: _user.id!,
                }).catch((err) => {
                  logger.error(err)
                })
              })

              // success return 201
              return res.status(201).json({
                message: 'User created successfully',
                data: {
                  ..._user,
                  profile: {
                    fname: p.fname,
                    lname: p.lname,
                    address: p.address,
                  },
                },
                token: makeJwtToken({
                  id: _user.id,
                  email: _user.email,
                  role: _user.role,
                }),
              })
            })
            .catch((err) => {
              // error return 400
              return res
                .status(400)
                .json({ message: 'Something went wrong!', errors: err })
            })
        })
        .catch((err) => {
          // error return 400
          return res
            .status(400)
            .json({ message: 'Something went wrong!', errors: err })
        })
    } catch (err) {
      // internal server error return 500
      logger.error(err)
      return res.status(500).json({ message: 'Internal Server Error!' })
    }
  }

  /*----------------------------------------------
   * @auth whoami user
   *---------------------------------------------*/
  async whoami(req: Request, res: Response) {
    try {
      const user = req.user
      return res.status(200).json({ message: 'User found', data: user })
    } catch (err) {
      // internal server error return 500
      logger.error(err)
      return res.status(500).json({ message: 'Internal Server Error!' })
    }
  }
}

// DTO for incoming request validation //

// login dto
export const loginDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!' }).email(),
    password: z
      .string({ required_error: 'Password must be given!' })
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
  }),
})

// register dto
export const registerDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!' }).email(),
    password: z
      .string({ required_error: 'Password must be given!' })
      .min(6)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    fname: z.string({ required_error: 'First Name must be given!' }).min(3),
    lname: z.string({ required_error: 'Last Name must be given!' }).min(3),
  }),
})

export default new AuthController()
