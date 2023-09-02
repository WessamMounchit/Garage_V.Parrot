import { createSlice } from "@reduxjs/toolkit";
import { onGetOpeningHours, onUpdateOpeningHours } from "../../api/openingHours";

const hoursSlice = createSlice({
  name: "hours",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    hoursLoaded: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    hoursLoading: (state) => {
      state.loading = true;
    },
    hoursError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export function fetchHours(action) {
  return async function (dispatch, getState) {
    dispatch(hoursLoading());

    try {
      const response = await onGetOpeningHours();
      const data = response.data;

      dispatch(hoursLoaded(data));
    } catch (error) {
      dispatch(hoursError());
    }
  };
}


 export function updateHours(hourUpdated) {
  return async function (dispatch, getState) {
    dispatch(hoursLoading());
    
    try {
      const response = await onUpdateOpeningHours(hourUpdated);
      
      if (response.status === 200) {
        dispatch(fetchHours());
      } else {
        dispatch(hoursError())
        console.error("La modification des horraires a échoué.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la modification des horraires :", error);
    }
  };
};
 

export const { hoursLoading, hoursLoaded, hoursError } = hoursSlice.actions;
export default hoursSlice.reducer;
