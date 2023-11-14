import axiosInstance from "../utils/axiosInstance";

//REGISTRATION

export async function employeeRegistration(registrationData) {
  return await axiosInstance.post(`/auth/register-employee`, registrationData);
}

//LOGIN

export async function login(registrationData) {
  return await axiosInstance.post(`/auth/login`, registrationData);
}
