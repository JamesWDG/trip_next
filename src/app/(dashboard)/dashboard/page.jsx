"use client";

import Image from "next/image";
import { Outfit600 } from "@/fonts/index";
import { Outfit400 } from "@/fonts/index";
import { Outfit500 } from "@/fonts/index";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import homeCardIMg from "@/app/(dashboard)/assets/images/home-card-1.png";
// import dashboardBtnImg from "@/app/(dashboard)/assets/images/dashboard-btn-img.png";
import { Dropdown } from "react-bootstrap";
// import BookingsChart from "@/app/components/booking-charts";
import UserOnboardingChart from "@/app/components/totalchart";
import { getStats, getUserOnboarding } from "@/services/userService";
import { useToast } from "@/hooks/useToast";
import Loading from "@/app/components/Loading";

const FILTERS = ["Weekly", "Monthly", "Yearly"];

export default function HomePage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error: toastError } = useToast();
  const [activeFilter, setActiveFilter] = useState("Monthly");

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getStats();

      const statsData = {
        "Total Users": { count: res?.totalUserCount || 0, icon: homeCardIMg },
        "Car Vendors": { count: res?.carOwnerCount || 0, icon: homeCardIMg },
        "Accommodation Vendors": {
          count: res?.accommodationOwnerCount || 0,
          icon: homeCardIMg,
        },
        "Restaurant Vendors": {
          count: res?.restaurantOwnerCount || 0,
          icon: homeCardIMg,
        },
      };
      setStats(statsData);
    } catch (error) {
      toastError(error?.message || "Failed to fetch stats");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUserOnboarding();

      if (res) {
        setApiData(res);
      }
    } catch (err) {
      console.error("Failed to fetch user onboarding data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    await Promise.all([fetchStats(), fetchData()]);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="main-content-area" style={{ background: "#fffaf9" }}>
      <Loading loading={loading} text="Loading dashboard..." />

      {!loading && (
        <>
          <h3 className={`dashboard-heading ${Outfit600.className}`}>
            Dashboard
          </h3>
          <div className="dashboard-card-wrapper">
            {Object.entries(stats).map(([title, { count, icon }]) => (
              <div key={title} className="dashboard-card">
                <Card className="card-dashboad">
                  <div className="card-divison">
                    <div>
                      <h6 className={`text-muted ${Outfit400.className}`}>
                        {title}
                      </h6>
                      <h4 className={`count-hd ${Outfit600.className}`}>
                        {count.toLocaleString()}
                      </h4>
                    </div>
                    <div>
                      <Image
                        src={icon}
                        alt={title}
                        className="img-fluid rounded-circle"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* GRAPHS SECTION */}
          <section className="order-sec">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                
                <div className="d-flex justify-content-between align-items-center total-chart-2">
                  <h2 className={`order-hd ${Outfit500.className}`}>
                    User Onboarding
                  </h2>

                  <Dropdown className="dropdown-prnt">
                    <Dropdown.Toggle
                      variant="outline-dark"
                      size="sm"
                      className={`dropdown-para ${Outfit400.className}`}
                    >
                      {activeFilter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {FILTERS.map((period) => (
                        <Dropdown.Item
                          key={period}
                          active={activeFilter === period}
                          onClick={() => setActiveFilter(period)}
                        >
                          {period}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="total-chart">
                  <UserOnboardingChart
                    error={error}
                    apiData={apiData}
                    filter={activeFilter}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
