import axiosInstance from "../utils/axiosInstance";

//ADD TESTIMONIAL
export async function addTestimonial(formData) {
  return await axiosInstance.post(`/testimonials/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//GET TESTIMONIALS
export async function getTestimonials() {
  return await axiosInstance.get(`/testimonials/get`);
}

//UPTADE TESTIMONIAL
export async function updateTestimonial(TestimonialId, formData) {
  return await axiosInstance.put(
    `/testimonials/update/${TestimonialId}`,
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
  return await axiosInstance.delete(`/testimonials/delete/${TestimonialId}`);
}

//VALIDATE TESTIMONIAL
export async function validateTestimonial(TestimonialId, validated) {
  return await axiosInstance.put(`/testimonials/validate/${TestimonialId}`, {
    validated,
  });
}
