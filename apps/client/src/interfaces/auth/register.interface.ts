import { AuthState } from './state.interface'

export interface IRegisterBody {
  email: string
  password: string
  fname: string
  lname: string
}

export interface IRegisterResponse {
  message: string
  data: AuthState['user']
  token: string
}
