import { apiBaseUrl } from "../config";
import axiosInstance from "../utils/axiosInstance";

//ADD TESTIMONIAL
export async function onAddTestimonial(formData) {
  return await axiosInstance.post(
    `${apiBaseUrl}/api/addTestimonials`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

//GET TESTIMONIALS
export async function onGetTestimonials() {
  return await axiosInstance.get(`${apiBaseUrl}/api/getTestimonials`);
}

//UPTADE TESTIMONIAL
export async function onUpdateTestimonial(TestimonialId, formData) {
  return await axiosInstance.put(
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
  return await axiosInstance.delete(
    `${apiBaseUrl}/api/deleteTestimonial/${TestimonialId}`
  );
}

//VALIDATE TESTIMONIAL
export async function onValidateTestimonial(TestimonialId, validated) {
  return await axiosInstance.put(
    `${apiBaseUrl}/api/validateTestimonial/${TestimonialId}`,
    { validated }
  );
}
