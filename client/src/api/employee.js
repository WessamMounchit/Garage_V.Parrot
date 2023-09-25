import axiosInstance from "../utils/axiosInstance";

// GET EMPLOYEES
export async function getEmployees() {
  return await axiosInstance.get(`/api/getEmployee`);
}

// UPDATE EMPLOYEES INFOS
export async function updateEmployee(id, employeeData) {
  return await axiosInstance.put(`/api/updateEmployee/${id}`, employeeData);
}

// DELETE EMPLOYEE
export async function deleteEmployee(id) {
  return await axiosInstance.delete(`/api/deleteEmployee/${id}`);
}
