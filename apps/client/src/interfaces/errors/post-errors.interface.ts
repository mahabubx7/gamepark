export interface IPostReqError {
  message?: string
  errors?: Record<string, unknown>
  issues?: Record<string, unknown>
}
