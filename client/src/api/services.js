import axiosInstance from "../utils/axiosInstance";

//ADD SERVICE
export async function addService(formData) {
  return await axiosInstance.post(`/api/addServices`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET SERVICES
export async function getServices() {
  return await axiosInstance.get(`/api/getServices`);
}

//UPDADE SERVICE
export async function updateService(ServiceId, formData) {
  return await axiosInstance.put(`/api/updateService/${ServiceId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//DELETE SERVICE
export async function deleteService(ServiceId) {
  return await axiosInstance.delete(`/api/deleteService/${ServiceId}`);
}
