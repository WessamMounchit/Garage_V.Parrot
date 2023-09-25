import axiosInstance from "../utils/axiosInstance";

// GET OPENING HOURS
export async function getOpeningHours() {
  return await axiosInstance.get(`/api/getOpeningHours`);
}

// UPDATE OPENING HOURS
export async function updateOpeningHours(openingHoursData) {
  return await axiosInstance.put(`/api/updateOpeningHours`, openingHoursData);
}
