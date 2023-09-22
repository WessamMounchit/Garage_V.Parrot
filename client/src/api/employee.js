import axios from 'axios';
axios.defaults.withCredentials = true;

// Obtenez la liste des employés
export async function onGetEmployees() {
  return await axios.get('http://localhost:5000/api/getEmployee');
}

// Mettez à jour les informations d'un employé
export async function onUpdateEmployee(id, employeeData) {
  return await axios.put(`http://localhost:5000/api/updateEmployee/${id}`, employeeData);
}

// Supprimez un employé
export async function onDeleteEmployee(id) {
  return await axios.delete(`http://localhost:5000/api/deleteEmployee/${id}`);
}
