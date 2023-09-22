import axios from 'axios'
axios.defaults.withCredentials = true

//ADD Service
export async function onAddService(formData) {
  
  return await axios.post('http://localhost:5000/api/addServices', formData , {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
} )};

//GET ServiceS
export async function onGetServices() {
  return await axios.get(
    'http://localhost:5000/api/getServices',
  )
}

//UPTADE Service
export async function onUpdateService(ServiceId, formData) {
  return await axios.put(`http://localhost:5000/api/updateService/${ServiceId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//DELETE Service
export async function onDeleteService(ServiceId) {
  return await axios.delete(`http://localhost:5000/api/deleteService/${ServiceId}`)
}