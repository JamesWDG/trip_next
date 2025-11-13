"use client"
import BookingsChart from "@/app/components/booking-charts";
import TotalRevenueChart from "@/app/components/totalchart";
import Image from "next/image";
import React from 'react'
import dashboardBtnImg from "@/app/(dashboard)/assets/images/dashboard-btn-img.png"
import { Outfit500 } from "@/fonts";
import Double_table_data from "@/app/components/Double_table_data";
const page = () => {
    const headings2 = [
        "Report Type",
        "Entries",
        "Last Updated",
        "Action",
    ];
    const data2 = [
        {
            name: "Bookings Analytics",
            phone: "125",
            email: "Oct 21, 2025",
        },
        {
            name: "Bookings Analytics",
            phone: "Driving License",
            email: "Oct 21, 2025",
        },
        {
            name: "Bookings Analytics",
            phone: "125",
            email: "Oct 21, 2025",
        },
        {
            name: "Bookings Analytics",
            phone: "125",
            email: "Oct 21, 2025",
        },
    ];
    return (
        <>
            <section className="main-content-area">
                <h1 className="dashboard-hd">Analytics & Reports</h1>
                <div className="filter-mega-wrapper">
                    <div className="date-range-wrapper">
                        <p>Date Range</p>
                        <input type="text" name="" id="" className="range-input range-input-2" placeholder="10-23-2025" />
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
                            <h3 className='dashboard-hd-mini dashboard-hd-mini2-trends'>Revenue Trends</h3>
                            <TotalRevenueChart />
                        </div>
                    </div>
                </div>
                <h3 className='dashboard-hd-mini'>Reports Summary</h3>
                <Double_table_data Doubletable_heading2={headings2} Doubletable_data2={data2} />
            </section>
        </>
    )
}

export default page
