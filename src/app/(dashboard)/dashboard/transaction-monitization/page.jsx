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
      <section className="main-content-area">
        <h1 className="dashboard-hd">Transactions & Monetization</h1>

        <h3 className='dashboard-hd-mini'>Orders Overview</h3>

        <Double_table_data Doubletable_heading={headings2} Doubletable_data={data2} />

        <h3 className='dashboard-hd-mini mt-5'>Orders Overview</h3>
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
              <h3>Fee Value</h3>
              <select name="" id="">
                <option value="">Enter Value...</option>
              </select>
            </div>
          </div>


        </div>
        <button className="gradient-button">
          <span className={`button-span save-sting-btn ${Outfit500.className}`}>Save Settings</span>
        </button>
        <h3 className='dashboard-hd-mini mt-5'>Invoices & Subscriptions</h3>
        <Double_table_data Doubletable_heading3={headings3} Doubletable_data3={data3} />
      </section>
    </>
  )
}

export default page
