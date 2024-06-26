/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  errors: string | Record<string, any> | null
  user: {
    id: number
    email: string
    username: string
    role: 'user' | 'admin' | 'vendor'
    isApproved: boolean
    createdAt: string
    updatedAt: string | null
  } | null
  token: string | null
}
