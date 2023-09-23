import axios from "axios";
import { apiBaseUrl } from "../config";

axios.defaults.withCredentials = true;

//ADD TESTIMONIAL
export async function onAddTestimonial(formData) {
  return await axios.post(`${apiBaseUrl}/api/addTestimonials`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET TESTIMONIALS
export async function onGetTestimonials() {
  return await axios.get(`${apiBaseUrl}/api/getTestimonials`);
}

//UPTADE TESTIMONIAL
export async function onUpdateTestimonial(TestimonialId, formData) {
  return await axios.put(
    `${apiBaseUrl}/api/updateTestimonial/${TestimonialId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

//DELETE TESTIMONIAL
export async function onDeleteTestimonial(TestimonialId) {
  return await axios.delete(
    `${apiBaseUrl}/api/deleteTestimonial/${TestimonialId}`
  );
}

//VALIDATE TESTIMONIAL
export async function onValidateTestimonial(TestimonialId, validated) {
  return await axios.put(
    `${apiBaseUrl}/api/validateTestimonial/${TestimonialId}`,
    { validated }
  );
}
