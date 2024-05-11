import env from '@config/env'
import jwt from 'jsonwebtoken'

/*
|============================================
| @JWT configurations
| * JsonWebToken configurations
| * Add more configurations as you need
|============================================
*/

function makeJwtToken(
  payload: Record<string, any>,
  secret: string = env.jwt.jwtSecret,
  expire: string = env.jwt.jwtExpire,
) {
  return jwt.sign(payload, secret, { expiresIn: expire })
}

function verifyJwtToken(token: string, secret: string = env.jwt.jwtSecret) {
  return jwt.verify(token, secret)
}

export { makeJwtToken, verifyJwtToken }
