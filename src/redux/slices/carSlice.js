import { createSlice } from "@reduxjs/toolkit";
import { onAddCar, onDeleteCar, onGetCars, onGetLatestCars, onUpdateCar } from "../../api/cars";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    carsLoaded: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    carsLoading: (state) => {
      state.loading = true;
    },
    carsError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export function fetchCars(action) {
  return async function (dispatch, getState) {
    dispatch(carsLoading());

    try {
      const response = await onGetCars();
      const data = response.data;

      dispatch(carsLoaded(data));
    } catch (error) {
      dispatch(carsError());
    }
  };
}

export function addCar(newCar) {
  return async function (dispatch, getState) {
    dispatch(carsLoading());
    
    try {
      const response = await onAddCar(newCar);

      if (response.status === 201) {
        dispatch(fetchCars());
      } else {
        dispatch(carsError())
        console.error("L'ajout de la voiture a échoué.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout de la voiture :", error);
    }
  };
};

export function updateCar(carId, carUpdated) {
  return async function (dispatch, getState) {
    dispatch(carsLoading());
    
    try {
      const response = await onUpdateCar(carId, carUpdated);
      
      if (response.status === 200) {
        dispatch(fetchCars());
      } else {
        dispatch(carsError())
        console.error("La modification de la voiture a échoué.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la modification de la voiture :", error);
    }
  };
};

export function deleteCar(carId) {
  return async function (dispatch, getState) {
    dispatch(carsLoading());
    
    try {
      const response = await onDeleteCar(carId);
      
      if (response.status === 204) {
        dispatch(fetchCars());
      } else {
        dispatch(carsError())
        console.error("La suppression de la voiture a échoué.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression de la voiture :", error);
    }
  };
};

export function fetchLatestCars(action) {
  return async function (dispatch, getState) {
    dispatch(carsLoading());

    try {
      const response = await onGetLatestCars();
      const data = response.data;

      dispatch(carsLoaded(data));
    } catch (error) {
      dispatch(carsError());
    }
  };
}

export const { carsLoading, carsLoaded, carsError } = carsSlice.actions;
export default carsSlice.reducer;
