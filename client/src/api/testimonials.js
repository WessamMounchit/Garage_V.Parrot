import axiosInstance from "../utils/axiosInstance";

//ADD TESTIMONIAL
export async function addTestimonial(formData) {
  return await axiosInstance.post(`/api/addTestimonials`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET TESTIMONIALS
export async function getTestimonials() {
  return await axiosInstance.get(`/api/getTestimonials`);
}

//UPTADE TESTIMONIAL
export async function updateTestimonial(TestimonialId, formData) {
  return await axiosInstance.put(
    `/api/updateTestimonial/${TestimonialId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

//DELETE TESTIMONIAL
export async function deleteTestimonial(TestimonialId) {
  return await axiosInstance.delete(`/api/deleteTestimonial/${TestimonialId}`);
}

//VALIDATE TESTIMONIAL
export async function validateTestimonial(TestimonialId, validated) {
  return await axiosInstance.put(`/api/validateTestimonial/${TestimonialId}`, {
    validated,
  });
}
