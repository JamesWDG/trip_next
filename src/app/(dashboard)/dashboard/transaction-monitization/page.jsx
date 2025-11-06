import React from 'react'

const page = () => {
  return (
    <>
      <section className="main-content-area management">
        <h1 className="dashboard-hd">Transactions & Monetization</h1>
        <h3 className='dashboard-hd-mini'>Orders Overview</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th>Sr.No</th> */}
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>01</td> */}
                <td>Driver</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-completed">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>02</td> */}
                <td>Host</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-pending">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>03</td> */}
                <td>Restaurant</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-cancelled">Verified</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>01</td> */}
                <td>Driver</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-completed">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>02</td> */}
                <td>Host</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-pending">Pending</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td>03</td> */}
                <td>Restaurant</td>
                <td>Nike Johnson</td>
                <td>Nov 10, 2025</td>
                <td className="status-cancelled">Verified</td>
                <td className="position-relative custom-action-cell">
                  <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className='dashboard-hd-mini'>Orders Overview</h3>
        <div className="row"> 
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="fee-wrapper">
              <h3>Fee Type</h3>
              <select name="" id="">
                <option value="">Percentage (%)</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="fee-wrapper">
              <h3>Fee Type</h3>
              <select name="" id="">
                <option value="">Percentage (%)</option>
              </select>
            </div>
          </div>
          {/* button area */}



          {/* button area */}
          <h3 className='dashboard-hd-mini'>Invoices & Subscriptions</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {/* <th>Sr.No</th> */}
                  <th>Invoice ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Renewal Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td>01</td> */}
                  <td>INV-201</td>
                  <td>Subscription</td>
                  <td>$50</td>
                  <td className="status-completed">Paid</td>
                  <td>Nov 10, 2025</td>
                  <td className="position-relative custom-action-cell">
                    <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                    <div className="custom-dropdown-menu" style={{ display: "none" }}>
                      <div className="custom-dropdown-item">View</div>
                      <div className="custom-dropdown-item text-danger">Delete</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/* <td>02</td> */}
                  <td>INV-202</td>
                  <td>Subscription</td>
                  <td>$54</td>
                  <td className="status-pending">Pending</td>
                  <td>-</td>
                  <td className="position-relative custom-action-cell">
                    <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                    <div className="custom-dropdown-menu" style={{ display: "none" }}>
                      <div className="custom-dropdown-item">View</div>
                      <div className="custom-dropdown-item text-danger">Delete</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/* <td>03</td> */}
                  <td>INV-204</td>
                  <td>Platform Fee</td>
                  <td>Apr 10, 2025</td>
                  <td className="status-cancelled">Pending</td>
                  <td>Nov 10, 2025</td>
                  <td className="position-relative custom-action-cell">
                    <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                    <div className="custom-dropdown-menu" style={{ display: "none" }}>
                      <div className="custom-dropdown-item">View</div>
                      <div className="custom-dropdown-item text-danger">Delete</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/* <td>01</td> */}
                  <td>INV-203</td>
                  <td>Subscription</td>
                  <td>$85</td>
                  <td className="status-completed">Paid</td>
                  <td>- </td>
                  <td className="position-relative custom-action-cell">
                    <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>

                    <div className="custom-dropdown-menu" style={{ display: "none" }}>
                      <div className="custom-dropdown-item">View</div>
                      <div className="custom-dropdown-item text-danger">Delete</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
