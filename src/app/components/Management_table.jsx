import { Roboto500 } from '@/fonts'
import React from 'react'

const Management_table = ({ heading = [], data = [] }) => {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {heading.map((heading, i) => (
                <th className={`${Roboto500.className}`} key={i}>{heading}</th>
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
                <td className={`${Roboto500.className} ${item.status === "Completed"
                      ? "status-completed"
                      : item.status === "Pending"
                        ? "status-pending"
                        : "status-cancelled"}`}
                >
                  {item.status}
                </td>
                <td className={`${Roboto500.className} position-relative custom-action-cell`}>
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
