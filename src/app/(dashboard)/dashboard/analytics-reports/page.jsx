"use client"
import BookingsChart from "@/app/components/booking-charts";
import TotalRevenueChart from "@/app/components/totalchart";
import Image from "next/image";
import React from 'react'
import dashboardBtnImg from "@/app/(dashboard)/assets/images/dashboard-btn-img.png"
import { Outfit500 } from "@/fonts";
// import totalchart from "@/app/components/totalchart.jsx"
const page = () => {
    return (
        <>
            <section className="main-content-area management">
                <h1 className="dashboard-hd">Analytics & Reports</h1>
                <div className="filter-mega-wrapper">
                    <div className="date-range-wrapper">
                        <p>Date Range</p>
                        <input type="text" name="" id="" className="range-input" placeholder="10-23-2025" />
                    </div>
                    <div className="date-range-wrapper">
                        <p>Module</p>
                        {/* <input type="text" name="" id="" className="range-input" placeholder="10-23-2025" /> */}
                        <select name="" id="" className="range-input">
                            <option value="">Bookings</option>
                        </select>
                    </div>
                    <div className="date-range-wrapper">
                        <p>City</p>
                        {/* <input type="text" name="" id="" className="range-input" placeholder="10-23-2025" /> */}
                        <select name="" id="" className="range-input">
                            <option value="">Enter City</option>
                        </select>
                    </div>
                    <div className="date-range-wrapper">
                        <button className="gradient-button">
                            <span className={`button-span ${Outfit500.className}`}>Apply Filter</span>
                        </button>
                    </div>
                </div>
                <div className="chart-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className='dashboard-hd-mini'>Bookings Distribution</h3>
                            <BookingsChart />
                        </div>
                        <div className="col-lg-6">
                            <h3 className='dashboard-hd-mini'>Revenue Trends</h3>
                            <TotalRevenueChart />
                        </div>
                    </div>
                </div>
                <h3 className='dashboard-hd-mini'>Reports Summary</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {/* <th>Sr.No</th> */}
                                <th>Report Type</th>
                                <th>Entries</th>
                                <th>Last Updated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>01</td> */}
                                <td>Bookings Analytics</td>
                                <td>125</td>
                                <td>Oct 21, 2025</td>
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
                                <td>Revenue Reports</td>
                                <td>48</td>
                                <td>Oct 20, 2025</td>
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
                                <td>Transactions Overview</td>
                                <td>85</td>
                                <td>Oct 19, 2025</td>
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
                                <td>Cancellation Metrics</td>
                                <td>16</td>
                                <td>Oct 18, 2025</td>
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
            </section>
        </>
    )
}

export default page
