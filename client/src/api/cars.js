import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

// ADD CAR
export async function onAddCar(formData) {
  return await axiosInstance.post(`${apiBaseUrl}/api/addCars`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// GET CARS
export async function onGetCars() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getCars`);
}

// GET SELECTED CAR
export async function onGetSelectedCar(carId) {
  return await axiosInstance.get(`${apiBaseUrl}/api/getSelectedCar/${carId}`);
}

// GET LATEST CARS
export async function onGetLatestCars() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getLatestCars`);
}

// UPDATE CAR
export async function onUpdateCar(carId, formData) {
  return await axiosInstance.put(
    `${apiBaseUrl}/api/updateCar/${carId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

// DELETE CAR
export async function onDeleteCar(carId) {
  return await axiosInstance.delete(`${apiBaseUrl}/api/deleteCar/${carId}`);
}
