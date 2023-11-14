import axiosInstance from "../utils/axiosInstance";

// GET OPENING HOURS
export async function getOpeningHours() {
  return await axiosInstance.get(`/opening-hours/get`);
}

// UPDATE OPENING HOURS
export async function updateOpeningHours(openingHoursData) {
  return await axiosInstance.put(`/opening-hours/update`, openingHoursData);
}
