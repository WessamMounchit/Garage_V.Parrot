import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

// GET EMPLOYEES
export async function onGetEmployees() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getEmployee`);
}

// UPDATE EMPLOYEES INFOS
export async function onUpdateEmployee(id, employeeData) {
  return await axiosInstance.put(
    `${apiBaseUrl}/api/updateEmployee/${id}`,
    employeeData
  );
}

// DELETE EMPLOYEE
export async function onDeleteEmployee(id) {
  return await axiosInstance.delete(`${apiBaseUrl}/api/deleteEmployee/${id}`);
}
