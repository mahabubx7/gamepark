import { AuthState } from './state.interface'

export interface ILoginBody {
  email: string
  password: string
}

export interface ILoginResponse {
  message: string
  data: AuthState['user']
  token: string
}
