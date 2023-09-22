import axios from 'axios'
axios.defaults.withCredentials = true

//ADD CAR
export async function onAddCar(formData) {
  
  return await axios.post('http://localhost:5000/api/addCars', formData , {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
} )};

//GET CARS
export async function onGetCars() {
  return await axios.get(
    'http://localhost:5000/api/getCars',
  )
}

//GET SELECTED CAR
export async function onGetSelectedCar(carId) {
  return await axios.get(
    `http://localhost:5000/api/getSelectedCar/${carId}`,
    )
  }

  //GET LATESTCARS
  export async function onGetLatestCars() {
    return await axios.get(
      'http://localhost:5000/api/getLatestCars',
    )
  }

//UPTADE CAR
export async function onUpdateCar(carId, formData) {
  return await axios.put(`http://localhost:5000/api/updateCar/${carId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//DELETE CAR
export async function onDeleteCar(carId) {
  return await axios.delete(`http://localhost:5000/api/deleteCar/${carId}`)
}