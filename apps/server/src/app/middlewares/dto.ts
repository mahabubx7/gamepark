// import logger from '@config/logger'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodIssue } from 'zod'

// typescript type support for express request object
declare module 'express' {
  interface Request {
    parsed?: { [x: string]: any }
  }
}

// Special exception for DTO validation
export class DtoException extends Error {
  code: number
  issues: ZodIssue[]

  constructor(message: string, issues: ZodIssue[], code: number = 406) {
    super(message)
    this.issues = issues
    this.name = 'ZodError'
    this.code = code
  }
}

type Guard = (req: Request, res: Response, next: NextFunction) => void

// Special exception for DTO validation
export default function dtoGuard(schema: AnyZodObject): Guard {
  return async (req, _res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      }) // parse request data

      req.parsed = parsed // save parsed data to request object

      return next() // pass to next middleware
    } catch (err: any) {
      // logger.error(err)
      throw new DtoException('Invalid request!', err.issues)
    }
  }
}
