export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  errors: any
  user: {
    id: number
    email: string
    username: string
    role: 'user' | 'admin' | 'vendor'
  } | null
  token: string | null
}
