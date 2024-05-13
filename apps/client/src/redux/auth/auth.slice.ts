import { AuthState } from '@interfaces/auth/state.interface'
import { createSlice } from '@reduxjs/toolkit'
import { loginRequest } from '@rtk/auth/auth.api'

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  errors: null,
  user: null,
  token: null,
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
    })
    builder.addCase(loginRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
