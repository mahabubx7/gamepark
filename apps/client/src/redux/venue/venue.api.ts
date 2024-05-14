import { getHostAddress } from '@helpers'
import {
  IVenue,
  IVenueBody,
  // IVenue,
  // IVenueBody,
  IVenueListResponse,
  // IVenueWithDetails,
} from '@interfaces/venue/venue.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUri = getHostAddress()

// CREATE: Add a new venue
export const createVenueRequest = createAsyncThunk<IVenue, IVenueBody>(
  'venue/createVenue',
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUri + '/venue', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token') as string}`,
        },
      })
      const { data } = (await response.json()) as {
        data: IVenue
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// DELETE: Delete a venue
export const deleteVenueRequest = createAsyncThunk<void, string>(
  'venue/deleteVenue',
  async (uid, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUri + `/venue/${uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token') as string}`,
        },
      })
      if (!response.ok) {
        return rejectWithValue(response.statusText)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// GET: Get own venues
export const getOwnVenueRequest = createAsyncThunk<IVenue[]>(
  'venue/getOwnVenue',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUri + '/venue/own', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token') as string}`,
        },
      })
      const { data } = (await response.json()) as IVenueListResponse
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
