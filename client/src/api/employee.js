import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

// GET EMPLOYEES
export async function onGetEmployees() {
  return await axios.get(`${apiBaseUrl}/api/getEmployee`);
}

// UPDATE EMPLOYEES INFOS
export async function onUpdateEmployee(id, employeeData) {
  return await axios.put(
    `${apiBaseUrl}/api/updateEmployee/${id}`,
    employeeData
  );
}

// DELETE EMPLOYEE
export async function onDeleteEmployee(id) {
  return await axios.delete(`${apiBaseUrl}/api/deleteEmployee/${id}`);
}
