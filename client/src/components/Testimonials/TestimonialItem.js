import React from 'react'
import "../../styles/testimonial-item.css";


const TestimonialItem = ({ testimonial, handleModalOpen, handleDeleteCar }) => {

  const {
    first_name,
    last_name,
    job,
    description,
    mark,
    image_path
  } = testimonial;


  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <img src={image_path} alt="" className="testimonial-image" />
        <h6 className="testimonial-name">{first_name} {last_name}</h6>
        <p className="testimonial-job">{job}</p>
      </div>
      <p className="testimonial-description mx-2">
        {description}
      </p>
      <div className="testimonial-rating">
        {Array.from({ length: mark }).map((_, index) => (
          <i key={index} className="ri-star-s-fill ri-xl"></i>
        ))}
      </div>
    </div>
  )
}

export default TestimonialItem