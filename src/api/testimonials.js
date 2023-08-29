import axios from 'axios'
axios.defaults.withCredentials = true

//ADD Testimonial
export async function onAddTestimonial(formData) {
  
  return await axios.post('http://localhost:5000/api/addTestimonials', formData , {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
} )};

//GET Testimonials
export async function onGetTestimonials() {
  return await axios.get(
    'http://localhost:5000/api/getTestimonials',
  )
}

//UPTADE Testimonial
export async function onUpdateTestimonial(TestimonialId, formData) {
  return await axios.put(`http://localhost:5000/api/updateTestimonial/${TestimonialId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//DELETE Testimonial
export async function onDeleteTestimonial(TestimonialId) {
  return await axios.delete(`http://localhost:5000/api/deleteTestimonial/${TestimonialId}`)
}

//Validate Testimonial
export async function onValidateTestimonial(TestimonialId, validated) {
  return await axios.put(`http://localhost:5000/api/validateTestimonial/${TestimonialId}`, { validated }
  );
}