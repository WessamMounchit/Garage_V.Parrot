import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

//ADD SERVICE
export async function onAddService(formData) {
  return await axiosInstance.post(`${apiBaseUrl}/api/addServices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET SERVICES
export async function onGetServices() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getServices`);
}

//UPTADE SERVICE
export async function onUpdateService(ServiceId, formData) {
  return await axiosInstance.put(
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
  return await axiosInstance.delete(
    `${apiBaseUrl}/api/deleteService/${ServiceId}`
  );
}
