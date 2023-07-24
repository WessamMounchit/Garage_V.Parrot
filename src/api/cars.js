import axios from 'axios'
axios.defaults.withCredentials = true

//ADD CAR
export async function onAddCar(formData) {
  
  return await axios.post('http://localhost:5000/api/cars', formData , {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
} )};
