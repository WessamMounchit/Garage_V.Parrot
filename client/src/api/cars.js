import axiosInstance from "../utils/axiosInstance";

// ADD CAR
export async function addCar(formData) {
  return await axiosInstance.post(`/cars/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// GET CARS
export async function getCars() {
  return await axiosInstance.get(`/cars/get`);
}

// GET SELECTED CAR
export async function getSelectedCar(carId) {
  return await axiosInstance.get(`/cars/get/${carId}`);
}

// GET LATEST CARS
export async function getLatestCars() {
  return await axiosInstance.get(`/cars/get-latest`);
}

// UPDATE CAR
export async function updateCar(carId, formData) {
  return await axiosInstance.put(
    `/cars/update/${carId}`,
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
  return await axiosInstance.delete(`/cars/delete/${carId}`);
}
