import { verifyJwtToken } from '@utils/jwt'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

// extend express request interface for custom user object support
declare module 'express' {
  interface Request {
    user?: JwtPayload
  }
}

export default function jwtGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // parse token at first
  const token = req.headers.authorization?.split(' ')[1] // from bearer token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  // verify JWT token
  const decode = verifyJwtToken(token)
  if (!decode) return res.status(401).json({ message: 'Unauthorized' })

  // JWT verification successful!
  req.user = decode as JwtPayload
  next()
}
