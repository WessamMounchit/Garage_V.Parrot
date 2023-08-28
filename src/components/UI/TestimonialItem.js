import React from 'react'
import { useSelector } from 'react-redux';
import "../../styles/testimonial-item.css";


const TestimonialItem = ({ testimonial, handleModalOpen, handleDeleteCar }) => {
  const { isAuth } = useSelector((state) => state.auth);

  const {
    first_name,
    last_name,
    job,
    description,
    mark,
    image_path
  } = testimonial;

  const editIcon = isAuth && (
    <i
      className="btn ri-edit-box-fill edit__icon ri-lg my-2 p-0 "
      onClick={() => handleModalOpen()}>
    </i>
  )

  const deleteIcon = isAuth && (
    <i
      className="btn ri-delete-bin-fill delete__icon ri-lg my-2 p-0 "
      onClick={() => handleDeleteCar()}>
    </i>
  )


  return (
    <div className="testimonial-card">
      <span className="w-100 text-end">{editIcon} {deleteIcon}</span>
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