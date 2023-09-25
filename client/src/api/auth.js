import axiosInstance from "../utils/axiosInstance";

//REGISTRATION

export async function employeeRegistration(registrationData) {
  return await axiosInstance.post(`/api/addEmployee`, registrationData);
}

//LOGIN

export async function login(registrationData) {
  return await axiosInstance.post(`/api/login`, registrationData);
}
