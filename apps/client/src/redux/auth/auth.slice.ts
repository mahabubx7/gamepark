import { AuthState } from '@interfaces/auth/state.interface'
import { createSlice } from '@reduxjs/toolkit'
import { loginRequest } from '@rtk/auth/auth.api'

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    return token
  }
  return null
}

const getAuthStateFromLocalStorage = (): {
  isAuthenticated: boolean
  user: AuthState['user'] | null
  token: string | null
} => {
  return {
    isAuthenticated: localStorage.getItem('is_authenticated') ? true : false,
    user: JSON.parse(localStorage.getItem('user_metadata') as string) as
      | AuthState['user']
      | null,
    token: getTokenFromLocalStorage(),
  }
}

const { isAuthenticated, user, token } = getAuthStateFromLocalStorage()

const initialState: AuthState = {
  isAuthenticated,
  isLoading: false,
  errors: null,
  user,
  token,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.isLoading = false
      state.errors = null
      state.user = null
      state.token = null
      localStorage.removeItem('access_token') // revoke token
      localStorage.removeItem('is_authenticated') // revoke auth state
      localStorage.removeItem('user_metadata') // revoke user metadata
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginRequest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.errors = null
      state.user = payload.data as AuthState['user']
      state.token = payload.token
      localStorage.setItem('access_token', payload.token)
      localStorage.setItem('is_authenticated', 'true')
      localStorage.setItem('user_metadata', JSON.stringify(payload.data))
    })
    builder.addCase(loginRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
