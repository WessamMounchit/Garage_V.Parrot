import axiosInstance from "../utils/axiosInstance";

// GET EMPLOYEES
export async function getEmployees() {
  return await axiosInstance.get(`/employee/get`);
}

// UPDATE EMPLOYEES INFOS
export async function updateEmployee(id, employeeData) {
  return await axiosInstance.put(`/employee/update/${id}`, employeeData);
}

// DELETE EMPLOYEE
export async function deleteEmployee(id) {
  return await axiosInstance.delete(`/employee/delete/${id}`);
}
