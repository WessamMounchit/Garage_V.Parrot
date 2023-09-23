import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

// ADD CAR
export async function onAddCar(formData) {
  return await axios.post(`${apiBaseUrl}/api/addCars`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// GET CARS
export async function onGetCars() {
  return await axios.get(`${apiBaseUrl}/api/getCars`);
}

// GET SELECTED CAR
export async function onGetSelectedCar(carId) {
  return await axios.get(`${apiBaseUrl}/api/getSelectedCar/${carId}`);
}

// GET LATEST CARS
export async function onGetLatestCars() {
  return await axios.get(`${apiBaseUrl}/api/getLatestCars`);
}

// UPDATE CAR
export async function onUpdateCar(carId, formData) {
  return await axios.put(`${apiBaseUrl}/api/updateCar/${carId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// DELETE CAR
export async function onDeleteCar(carId) {
  return await axios.delete(`${apiBaseUrl}/api/deleteCar/${carId}`);
}
