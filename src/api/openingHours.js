import axios from "axios";

//GET OPENING HOURS
export async function onGetOpeningHours() {
  return await axios.get(
    'http://localhost:5000/api/getOpeningHours',
  )
}

//UPDATE OPENING HOURS
export async function onUpdateOpeningHours(openingHoursData) {
  return await axios.put(
    'http://localhost:5000/api/UpdateOpeningHours', openingHoursData/* , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } */
  )
}
