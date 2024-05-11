import { Request, Response } from 'express'
import User from '@app/models/user'
import Profile from '@app/models/profile'
import logger from '@config/logger'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { makeJwtToken } from '@utils/jwt'

class AuthController {
  /*----------------------------------------------
   * @auth login user
   *---------------------------------------------*/
  async login(req: Request, res: Response) {
    try {
      const {
        body: { email, password },
      } = req.parsed as unknown as z.infer<typeof loginDto>

      // Check if required fields are provided
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Please provide all required fields' })
      }
      // Check if user exists
      const user = await User.findOne({ where: { email } })

      if (!user) return res.status(404).json({ message: 'User not found' })

      // Check if password is correct
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid password' })
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
      // Check if required fields are provided
      if (!email || !password || !fname || !lname) {
        return res
          .status(400)
          .json({ message: 'Please provide all required fields' })
      }
      // Check if user already exists
      const user = await User.findOne({ where: { email } })

      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      // create user
      await User.create({
        email,
        password,
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
            .then((p) => {
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

// DTO for incoming request validation
export const loginDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!' }).email(),
    password: z.string({ required_error: 'Password must be given!' }).min(6),
  }),
})

export const registerDto = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be given!' }).email(),
    password: z.string({ required_error: 'Password must be given!' }).min(6),
    fname: z.string({ required_error: 'First Name must be given!' }).min(3),
    lname: z.string({ required_error: 'Last Name must be given!' }).min(3),
  }),
})

export default new AuthController()
