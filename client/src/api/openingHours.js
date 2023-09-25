import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

// GET OPENING HOURS
export async function onGetOpeningHours() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getOpeningHours`);
}

// UPDATE OPENING HOURS
export async function onUpdateOpeningHours(openingHoursData) {
  return await axiosInstance.put(
    `${apiBaseUrl}/api/updateOpeningHours`,
    openingHoursData
  );
}
