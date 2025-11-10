import React from 'react'

const Management_table = ({ heading = [], data = [] }) => {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {heading.map((heading, i) => (
                <th key={i}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td
                  className={
                    item.status === "Completed"
                      ? "status-completed"
                      : item.status === "Pending"
                        ? "status-pending"
                        : "status-cancelled"
                  }
                >
                  {item.status}
                </td>
                <td className="position-relative custom-action-cell">
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Management_table
