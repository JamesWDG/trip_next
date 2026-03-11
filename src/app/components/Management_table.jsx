import { Roboto500 } from "@/fonts";
import React from "react";

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const showPages = 2;
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (currentPage > showPages + 1) {
      pages.push('...');
    }
    
    let start = Math.max(2, currentPage - showPages + 1);
    let end = Math.min(totalPages - 1, currentPage + showPages - 1);
    
    if (currentPage <= showPages) {
      start = 2;
      end = showPages + 1;
    }
    
    if (currentPage > totalPages - showPages) {
      start = totalPages - showPages;
      end = totalPages - 1;
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - showPages) {
      pages.push('...');
    }

    pages.push(totalPages);
  }
  
  return pages;
}

const Management_table = ({
  heading = [],
  data = [],
  currentPage = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  onPageChange = () => {},
  loading = false,
}) => {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {heading.map((heading, i) => (
                <th className={`${Roboto500.className}`} key={i}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td className={`${Roboto500.className}`}>{item.name}</td>
                <td className={`${Roboto500.className}`}>{item.phone}</td>
                <td className={`${Roboto500.className}`}>{item.email}</td>
                <td className={`${Roboto500.className}`}>{item.date}</td>
                <td
                  className={`${Roboto500.className} ${
                    item.status === "Completed"
                      ? "status-completed"
                      : item.status === "Pending"
                        ? "status-pending"
                        : "status-cancelled"
                  }`}
                >
                  {item.status}
                </td>
                <td
                  className={`${Roboto500.className} position-relative custom-action-cell`}
                >
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div
                    className="custom-dropdown-menu"
                    style={{ display: "none" }}
                  >
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {currentPage} out of {totalPages} pages
          </div>
          <div className="pagination-controls">
            {/* PREVIOUS BUTTON */}
            <button 
              className="gradient-button pagination-btn"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* PAGE NUMBERS WITH ELLIPSIS */}
            {getPageNumbers(currentPage, totalPages).map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`page-btn ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              )
            ))}

            {/* NEXT BUTTON */}
            <button
              className="gradient-button pagination-btn"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Management_table;
