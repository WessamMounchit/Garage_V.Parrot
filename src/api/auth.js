import axios from 'axios'
axios.defaults.withCredentials = true

//REGISTRATION

export async function onEmployeeRegistration(registrationData) {
  return await axios.post(
    'http://localhost:5000/api/addEmployee',
    registrationData
  )
}

//LOGIN

export async function onLogin(registrationData) {
  return await axios.post(
    'http://localhost:5000/api/login',
    registrationData
  )
}
