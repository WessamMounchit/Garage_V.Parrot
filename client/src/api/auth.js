import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

//REGISTRATION

export async function onEmployeeRegistration(registrationData) {
  return await axios.post(`${apiBaseUrl}/api/addEmployee`, registrationData);
}

//LOGIN

export async function onLogin(registrationData) {
  return await axios.post(`${apiBaseUrl}/api/login`, registrationData);
}

//LOGOUT

export async function onLogout() {
  return await axios.get(`${apiBaseUrl}/api/logout`);
}
