import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import venueReducer from './venue/venue.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    venue: venueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat
      // Add middleware here
      (),
})

export type RtkRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RtkRootState,
  unknown,
  Action<string>
>

export default store
