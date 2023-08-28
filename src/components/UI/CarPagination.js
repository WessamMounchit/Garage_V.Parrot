import React from 'react';

const CarPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
<div className="pagination justify-content-center">
  <ul className="pagination">
    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(1)}>
        &laquo;
      </button>
    </li>
    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
        &lt;
      </button>
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
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
        &gt;
      </button>
    </li>
    <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
        &raquo;
      </button>
    </li>
  </ul>
</div>  );
};

export default CarPagination;
