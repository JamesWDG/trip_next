import Double_table_data from '@/app/components/Double_table_data';
import { Outfit500 } from '@/fonts';
import React from 'react'

const page = () => {
  const headings2 = [
    "Order ID",
    "Customer",
    "Amount",
    "Status",
    "Action",
  ];
  const data2 = [
    {
      phone: "Driver",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
    {
      phone: "Host",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
    {
      phone: "Restaurant",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
    {
      phone: "Driver",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
    {
      phone: "Host",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
    {
      phone: "Restaurant",
      name: "Nike Johnson",
      email: "$582",
      status: "Pending",
    },
  ];
  const headings3 = [
    "Invoice ID",
    "Type",
    "Amount",
    "Status",
    "Renewal Date",
    "Action",
  ];
  const data3 = [
    {
      id: "INV-201",
      type: "Subscription",
      amount: "$50",
      status: "Paid",
      renewal: "Nov 10, 2025",
    },
    {
      id: "INV-201",
      type: "Subscription",
      amount: "$50",
      status: "Pending",
      renewal: "-",
    },
    {
      id: "INV-201",
      type: "Subscription",
      amount: "$50",
      status: "Pending",
      renewal: "Nov 10, 2025",
    },
    {
      id: "INV-201",
      type: "Subscription",
      amount: "$50",
      status: "Paid",
      renewal: "-",
    },


  ];
  return (
    <>
      <section className="main-content-area management">
        <h1 className="dashboard-hd">Transactions & Monetization</h1>

        <h3 className='dashboard-hd-mini'>Orders Overview</h3>

        <Double_table_data Doubletable_heading={headings2} Doubletable_data={data2} />

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
        <button className="gradient-button">
          <span className={`button-span ${Outfit500.className}`}>Save Settings</span>
        </button>
        <h3 className='dashboard-hd-mini mt-5'>Invoices & Subscriptions</h3>
        <Double_table_data Doubletable_heading3={headings3} Doubletable_data3={data3} />
      </section>
    </>
  )
}

export default page
