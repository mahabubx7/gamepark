import { ILoginBody, ILoginResponse } from '@interfaces/auth/login.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUri = 'http://127.0.0.1:5000/api/auth'

export const loginRequest = createAsyncThunk<
  ILoginResponse,
  ILoginBody,
  { rejectValue: string }
>(baseUri + '/login', async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUri}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to login!')
    }
    const res = (await response.json()) as unknown as ILoginResponse
    return res
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    } else {
      return rejectWithValue('An unkonw error occurred')
    }
  }
})
