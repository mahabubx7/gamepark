import { IVenue } from '@interfaces/venue/venue.interface'
import { createSlice } from '@reduxjs/toolkit'
import {
  createVenueRequest,
  deleteVenueRequest,
  getOwnVenueRequest,
  updateVenueRequest,
} from '@rtk/venue/venue.api'

interface InitialVenueState {
  venues: IVenue[]
  isLoaded: boolean
  isLoading: boolean
  errors: string | Record<string, unknown> | null
}

const initialState: InitialVenueState = {
  venues: [],
  isLoaded: false,
  isLoading: false,
  errors: null,
}

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get [owner] venue as list
    builder.addCase(getOwnVenueRequest.pending, (state) => {
      state.isLoading = true
      state.errors = null
      state.venues = [] // reset
    })
    builder.addCase(getOwnVenueRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isLoaded = true // request completed
      state.errors = payload as string | Record<string, unknown>
    })
    builder.addCase(getOwnVenueRequest.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.venues = payload // data from server
      state.isLoaded = true // data is ready to display
    })

    // create venue
    builder.addCase(createVenueRequest.pending, (state) => {
      state.isLoading = true
      state.errors = null
      state.isLoaded = false // reset
    })
    builder.addCase(createVenueRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload as string | Record<string, unknown>
      state.isLoaded = true // request completed
    })
    builder.addCase(createVenueRequest.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.venues.push(payload) // add new venue to list
      state.isLoaded = true // data is ready to display
    })
    // Delete venue
    builder.addCase(deleteVenueRequest.pending, (state) => {
      state.isLoading = true
      state.errors = null
      state.isLoaded = false // reset
    })
    builder.addCase(deleteVenueRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload as string | Record<string, unknown>
      state.isLoaded = true // request completed
    })
    builder.addCase(deleteVenueRequest.fulfilled, (state, { meta }) => {
      state.isLoading = false
      state.venues = state.venues.filter((venue) => venue.uid !== meta.arg) // remove venue from list
      state.isLoaded = true // data is ready to display
    })

    // update venue [by owner]
    builder.addCase(updateVenueRequest.pending, (state) => {
      state.isLoading = true
      state.errors = null
      state.isLoaded = false // reset
    })
    builder.addCase(updateVenueRequest.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload as string | Record<string, unknown>
      state.isLoaded = true // request completed
    })
    builder.addCase(updateVenueRequest.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.venues = state.venues.map((venue) => {
        if (venue.uid === payload.uid) {
          return payload
        }
        return venue
      })
      state.isLoaded = true // data is ready to display
    })
  },
})

// export {  } = venueSlice.actions

export default venueSlice.reducer
