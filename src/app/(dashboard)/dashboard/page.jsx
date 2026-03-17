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
import RevenueTypeChart from "@/app/components/revenue-type-chart";
import EarningsOverTimeChart from "@/app/components/earnings-over-time-chart";
import { getStats, getUserOnboarding } from "@/services/userService";
import {
  getRevenueSummary,
  getRevenueByType,
  getAdminEarnings,
  downloadRevenueSummaryCsv,
  downloadRevenueByTypeCsv,
  downloadAdminEarningsCsv,
  downloadUserOnboardingCsv,
} from "@/services/analyticsService";
import { useToast } from "@/hooks/useToast";
import Loading from "@/app/components/Loading";

const FILTERS = ["Weekly", "Monthly", "Yearly"];

function AnimatedCounter({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const from = 0;
    const to = Number(value) || 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(from + (to - from) * progress);
      setDisplay(current);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}

export default function HomePage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error: toastError } = useToast();
  const [activeFilter, setActiveFilter] = useState("Monthly");

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const [revenueSummary, setRevenueSummary] = useState(null);
  const [revenueByType, setRevenueByType] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [earningsFilter, setEarningsFilter] = useState("monthly");

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
      const [userStatsRes, revenueSummaryRes, revenueByTypeRes, earningsRes] =
        await Promise.all([
          getUserOnboarding(),
          getRevenueSummary(),
          getRevenueByType(),
          getAdminEarnings("monthly"),
        ]);

      if (userStatsRes) setApiData(userStatsRes);
      if (revenueSummaryRes) setRevenueSummary(revenueSummaryRes);
      if (revenueByTypeRes) setRevenueByType(revenueByTypeRes);
          if (earningsRes) setEarnings(earningsRes);
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
    <div
      className="main-content-area"
      style={{
        background: "#fffaf9",
        minHeight: "100vh",
        padding: "32px 32px 48px",
      }}
    >
      <Loading loading={loading} text="Loading dashboard..." />

      {!loading && (
        <>
          <div
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <h3 className={`dashboard-heading ${Outfit600.className}`}>
              Analytics Dashboard
            </h3>
            <span
              className={Outfit400.className}
              style={{ fontSize: 13, color: "#6b7280" }}
            >
              High‑level view of revenue, users & earnings.
            </span>
          </div>

          <div className="dashboard-card-wrapper mb-4">
            {Object.entries(stats).map(([title, { count, icon }]) => (
              <div key={title} className="dashboard-card">
                <Card
                  className="card-dashboad"
                  style={{
                    borderRadius: 18,
                    border: "1px solid #f3e5ff",
                    background: "#ffffff",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.04)",
                  }}
                >
                  <div
                    className="card-divison"
                    style={{
                      padding: "18px 20px 20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "999px",
                        background:
                          "linear-gradient(135deg, rgba(15,23,42,0.02), rgba(107,114,128,0.05))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={icon}
                        alt={title}
                        className="img-fluid"
                        style={{ width: 80, height: 80, objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <h6
                        className={Outfit400.className}
                        style={{
                          fontSize: 16,
                          letterSpacing: 0.28,
                          textTransform: "uppercase",
                          color: "#6b7280",
                          marginBottom: 4,
                        }}
                      >
                        {title}
                      </h6>
                      <h3
                        className={Outfit600.className}
                        style={{
                          fontSize: 32,
                          margin: 0,
                          color: "#111827",
                        }}
                      >
                        <AnimatedCounter value={count} />
                      </h3>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* TOP REVENUE CARDS */}
          {revenueSummary && (
            <section className="mt-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className={Outfit500.className}>Revenue Overview</h5>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => downloadRevenueSummaryCsv()}
                >
                  Download summary CSV
                </button>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Card
                    className="card-dashboad"
                    style={{ borderRadius: 16, border: "1px solid #f3e5ff" }}
                  >
                    <div className="card-divison">
                      <div>
                        <h6 className={`text-muted ${Outfit400.className}`}>
                          Total Gross Revenue
                        </h6>
                        <h4 className={`count-hd ${Outfit600.className}`}>
                          ₦{revenueSummary.totalGross?.toLocaleString()}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-md-6 mb-3">
                  <Card
                    className="card-dashboad"
                    style={{ borderRadius: 16, border: "1px solid #f3e5ff" }}
                  >
                    <div className="card-divison">
                      <div>
                        <h6 className={`text-muted ${Outfit400.className}`}>
                          Total Platform Commission
                        </h6>
                        <h4 className={`count-hd ${Outfit600.className}`}>
                          ₦{revenueSummary.totalCommission?.toLocaleString()}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* GRAPHS SECTION */}
          <section className="order-sec">
            {/* User Onboarding (full row) */}
            <div className="row mb-4">
              <div className="col-12">
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
                <div className="d-flex justify-content-end mt-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() =>
                      downloadUserOnboardingCsv(activeFilter.toLowerCase())
                    }
                  >
                    Download CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Revenue by Type (full row) */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className={`order-hd ${Outfit500.className}`}>
                    Revenue by Type
                  </h2>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => downloadRevenueByTypeCsv()}
                  >
                    Download CSV
                  </button>
                </div>
                <RevenueTypeChart data={revenueByType} />
              </div>
            </div>

            {/* Earnings over time (full row) */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className={`order-hd ${Outfit500.className}`}>
                    Earnings Over Time
                  </h2>
                  <div className="d-flex gap-2">
                    <Dropdown className="dropdown-prnt me-2">
                      <Dropdown.Toggle
                        variant="outline-dark"
                        size="sm"
                        className={`dropdown-para ${Outfit400.className}`}
                      >
                        {earnings?.period
                          ? earnings.period.charAt(0).toUpperCase() +
                            earnings.period.slice(1)
                          : "Monthly"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {["weekly", "monthly", "yearly"].map((p) => (
                          <Dropdown.Item
                            key={p}
                            active={earnings?.period === p}
                            onClick={async () => {
                              try {
                                setLoading(true);
                                const data = await getAdminEarnings(p);
                                setEarnings(data);
                              } catch (err) {
                                console.error(err);
                                toastError(
                                  err?.message ||
                                    "Failed to fetch earnings analytics"
                                );
                              } finally {
                                setLoading(false);
                              }
                            }}
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        downloadAdminEarningsCsv(earnings?.period || "monthly")
                      }
                    >
                      Download CSV
                    </button>
                  </div>
                </div>
                <EarningsOverTimeChart data={earnings} />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
