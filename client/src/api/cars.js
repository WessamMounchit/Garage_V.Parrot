import axiosInstance from "../utils/axiosInstance";

// ADD CAR
export async function addCar(formData) {
  return await axiosInstance.post(`/api/addCars`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// GET CARS
export async function getCars() {
  return await axiosInstance.get(`/api/getCars`);
}

// GET SELECTED CAR
export async function getSelectedCar(carId) {
  return await axiosInstance.get(`/api/getSelectedCar/${carId}`);
}

// GET LATEST CARS
export async function getLatestCars() {
  return await axiosInstance.get(`/api/getLatestCars`);
}

// UPDATE CAR
export async function updateCar(carId, formData) {
  return await axiosInstance.put(
    `/api/updateCar/${carId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

// DELETE CAR
export async function deleteCar(carId) {
  return await axiosInstance.delete(`/api/deleteCar/${carId}`);
}
