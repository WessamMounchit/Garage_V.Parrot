import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

//ADD SERVICE
export async function onAddService(formData) {
  return await axios.post(`${apiBaseUrl}/api/addServices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET SERVICES
export async function onGetServices() {
  return await axios.get(`${apiBaseUrl}/api/getServices`);
}

//UPTADE SERVICE
export async function onUpdateService(ServiceId, formData) {
  return await axios.put(
    `${apiBaseUrl}/api/updateService/${ServiceId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

//DELETE SERVICE
export async function onDeleteService(ServiceId) {
  return await axios.delete(`${apiBaseUrl}/api/deleteService/${ServiceId}`);
}
