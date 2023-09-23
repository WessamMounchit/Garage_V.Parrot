import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

// GET OPENING HOURS
export async function onGetOpeningHours() {
  return await axios.get(`${apiBaseUrl}/api/getOpeningHours`);
}

// UPDATE OPENING HOURS
export async function onUpdateOpeningHours(openingHoursData) {
  return await axios.put(
    `${apiBaseUrl}/api/updateOpeningHours`,
    openingHoursData
  );
}
