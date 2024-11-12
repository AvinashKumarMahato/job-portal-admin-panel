import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Handle the "Next" and "Previous" button clicks
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => onPageChange(index + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
