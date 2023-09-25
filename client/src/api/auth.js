import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

//REGISTRATION

export async function onEmployeeRegistration(registrationData) {
  return await axiosInstance.post(
    `${apiBaseUrl}/api/addEmployee`,
    registrationData
  );
}

//LOGIN

export async function onLogin(registrationData) {
  return await axiosInstance.post(`${apiBaseUrl}/api/login`, registrationData);
}

//LOGOUT

export async function onLogout() {
  return await axiosInstance.get(`${apiBaseUrl}/api/logout`);
}
