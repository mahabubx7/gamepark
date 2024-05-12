import { NextFunction, Request, Response } from 'express'

type Roles = 'admin' | 'vendor' | 'user' // defined roles only

export default function roleGuard(allowed: Roles[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      if (!user) return res.status(401).json({ message: 'Unauthorized!' })

      if (!allowed.includes(user.role as string as Roles))
        return res.status(403).json({ message: 'Forbidden access!' })

      return next()
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error!' })
    }
  }
}
