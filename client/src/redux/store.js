import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import hoursSlice from "./slices/hoursSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    hours: hoursSlice,
  },
});
