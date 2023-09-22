import React from 'react';
import '../../styles/Cars/car-pagination.css'

const CarPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination justify-content-center">
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <i className="page-link ri-lg ri-arrow-left-double-line" onClick={() => setCurrentPage(1)}></i>
        </li>
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <i className="page-link ri-xl ri-arrow-drop-left-line" onClick={() => setCurrentPage(currentPage - 1)}></i>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? ' active' : ''}`}
            onClick={() => setCurrentPage(number)}
          >
            <button className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <i className="page-link ri-xl ri-arrow-drop-right-line" onClick={() => setCurrentPage(currentPage + 1)}></i>
        </li>
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <i className="page-link ri-lg ri-arrow-right-double-line" onClick={() => setCurrentPage(totalPages)}></i>
        </li>
      </ul>
    </div>);
};

export default CarPagination;
