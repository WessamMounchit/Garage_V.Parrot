import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import carsSlice from './slices/carSlice'
import hoursSlice from './slices/hoursSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cars: carsSlice,
    hours: hoursSlice
  },
});
