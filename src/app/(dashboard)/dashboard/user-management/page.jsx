// "use client";
import React from 'react'
import Image from 'next/image';
import profileImage from "@/app/(dashboard)/assets/images/profile-img.png"
const page = () => {
  return (
    <>
      <section className="main-content-area">
        <h1 className="dashboard-hd">Leads</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th>Sr.No</th> */}
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email Address</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>01</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-completed">Completed</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>02</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-pending">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>03</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Cancelled</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr className="active">
                {/* <td>04</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Completed</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>05</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Cancelled</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>06</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>07</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Completed</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>08</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Cancelled</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>09</td> */}
                <td>Nike Johnson</td>
                <td>+92 122 343 4059</td>
                <td>infoexample@gmail.com</td>
                <td>02-04-2025</td>
                <td className="status-cancelled">Completed</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{cursor:"pointer"}}></i>

                  <div className="custom-dropdown-menu" style={{display:"none"}}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default page
