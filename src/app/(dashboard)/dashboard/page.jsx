"use client";
import Image from "next/image";
import { Outfit600 } from "@/fonts/index";
import { Outfit400 } from "@/fonts/index";
import { Outfit500 } from "@/fonts/index";
import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import homeCardIMg from "@/app/(dashboard)/assets/images/home-card-1.png"
import dashboardBtnImg from "@/app/(dashboard)/assets/images/dashboard-btn-img.png"
import { Dropdown } from "react-bootstrap";
import BookingsChart from "@/app/components/booking-charts";
import TotalRevenueChart from "@/app/components/totalchart";



const stats = [
  { id: 1, title: "Total Users", count: 15565, icon: homeCardIMg },
  { id: 2, title: "Total Restaurants", count: 15565, icon: homeCardIMg },
  { id: 3, title: "Total Drivers", count: 15565, icon: homeCardIMg },
  { id: 4, title: "Total Orders", count: 15565, icon: homeCardIMg },
];

export default function HomePage() {
  return (
    <div className="main-content-area" style={{ background: "#fffaf9", }}>
      <h3 className={`dashboard-heading ${Outfit600.className}`}>Dashboard</h3>
      <div className="dashboard-card-wrapper">
        {stats.map((item) => (
          <div key={item.id} className="dashboard-card">
            <Card className="card-dashboad">
              <div className="card-divison">
                <div>
                  <h6 className={`text-muted ${Outfit400.className}`}>{item.title}</h6>
                  <h4 className={`count-hd ${Outfit600.className}`}>{item.count.toLocaleString()}</h4>
                </div>
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="img-fluid rounded-circle"
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>


      <section className="order-sec">


        <div className="row">
          <div className="col-lg-5">
            <div className="d-flex justify-content-between align-items-center total-chart-2">
              <h2 className={`order-hd ${Outfit500.className}`}>Order Summary</h2>
              <Dropdown className="dropdown-prnt">
                <Dropdown.Toggle variant="outline-dark" size="sm" className={`dropdown-para ${Outfit400.className}`}>
                  Date Range
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Today</Dropdown.Item>
                  <Dropdown.Item>This Week</Dropdown.Item>
                  <Dropdown.Item>This Month</Dropdown.Item>
                  <Dropdown.Item>Custom Range</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="booking-chart total-chart">
              <BookingsChart />
            </div>

          </div>
          <div className="col-lg-7">
            <div className="d-flex justify-content-between align-items-center total-chart-2">
              <h2 className={`order-hd ${Outfit500.className}`}>Total Revenuey</h2>
              <Dropdown className="dropdown-prnt">
                <Dropdown.Toggle variant="outline-dark" size="sm" className={`dropdown-para ${Outfit400.className}`}>
                  Date Range
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Today</Dropdown.Item>
                  <Dropdown.Item>This Week</Dropdown.Item>
                  <Dropdown.Item>This Month</Dropdown.Item>
                  <Dropdown.Item>Custom Range</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="total-chart">
              <TotalRevenueChart />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-button-container">


            <button className="gradient-button active">

              <Image src={dashboardBtnImg} alt="Users" className="img-fluid" />
              <span className={`button-span ${Outfit500.className}`}>Manage Users</span>
            </button>
            <button className="gradient-button">
              <Image src={dashboardBtnImg} alt="Approvals" className="img-fluid" />
              <span className={`button-span ${Outfit500.className}`}>Approvals Pending</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}