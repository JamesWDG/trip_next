"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

import sidebarLogo from "@/app/(dashboard)/assets/images/sidebar-logo.png";
import sidebarImg1 from "@/app/(dashboard)/assets/images/side-bar-img-1.png";
import sidebarImg2 from "@/app/(dashboard)/assets/images/side-bar-img-2.png";
// import sidebarImg3 from "@/app/(dashboard)/assets/images/side-bar-img3.png";
// import sidebarImg4 from "@/app/(dashboard)/assets/images/side-bar-img-4.png";
// import sidebarImg5 from "@/app/(dashboard)/assets/images/side-bar-img-5.png";
// import sidebarImg6 from "@/app/(dashboard)/assets/images/side-bar-img-77.png";
// import sidebarImg7 from "@/app/(dashboard)/assets/images/side-bar-img-7.png";
import sidebarImg8 from "@/app/(dashboard)/assets/images/side-bar-img8.png";
import { SideBarContext } from "@/context/sideBarContextProvider";
import { logout } from "@/services/authService";


const Sidebar2 = () => {
  // const [openMenu, setOpenMenu] = useState(null);
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);
  const { success, error } = useToast();
  const router = useRouter();
  // const toggleDropdown = (menuName) => {
  //   setOpenMenu(openMenu === menuName ? null : menuName);
  // };

  // HANDLE LOGOUT
  const handleLogout = async () => {
    try {
      await logout();
      success("Logged out successfully");
      router.push("/login");

    } catch (err) {
      error(err?.message || "Logout failed");
    }
  };

  return (
    <section className={`sidebar-panel ${sideBarOpen ? "active" : ""}`}>
      <button className="close-sidebar" onClick={() => setSideBarOpen(true)}>
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      
      <div className="side-bar-logo">
        <Link href={"/dashboard"}>
          <Image src={sidebarLogo} alt="" className="img-fluid" />
        </Link>
      </div>

      <ul className="sidebar-links">
        <div>
          <Link href={"/dashboard"}>
            <li>
              <Image src={sidebarImg1} alt="" className="img-fluid" />
              <p className="sidebar-hd">Dashboard</p>
            </li>
          </Link>

          {/* <li onClick={() => toggleDropdown("user")}> */}
          <li>
            <Link href={"/dashboard/user-management"}>
              <div className="custom-flex">
                <Image src={sidebarImg2} alt="" className="img-fluid" />
                <p className="sidebar-hd">User Management</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href={"/dashboard/food-promos"}>
              <div className="custom-flex">
                <Image src={sidebarImg2} alt="" className="img-fluid" />
                <p className="sidebar-hd">Promo codes</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href={"/dashboard/checkouts"}>
              <div className="custom-flex">
                <Image src={sidebarImg2} alt="" className="img-fluid" />
                <p className="sidebar-hd">Checkouts</p>
              </div>
            </Link>
            {/* <i
              className={`fa-solid fa-play ${
                openMenu === "user" ? "rotate" : ""
              }`}
            ></i> */}
          </li>

          {/* {openMenu === "user" && (
            <ul className="dropdown-submenu">
              <li>
                <Link href={"/dashboard/user-management/hotel"}>Hotels</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/drivers"}>Drivers</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/restaurants"}>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/food-delivery"}>
                  Food Delivery
                </Link>
              </li>
            </ul>
          )} */}

            {/* WILL WORK */}
          {/* <li>
            <Link href={"/dashboard/Onboarding-verification"}>
              {" "}
              <div className="custom-flex">
                <Image src={sidebarImg3} alt="" className="img-fluid" />
                <p className="sidebar-hd">Onboarding & Verification</p>
              </div>
            </Link>
          </li> */}
          {/* <i className={`fa-solid fa-play ${openMenu === "onboarding" ? "rotate" : ""}`}></i> */}

          {/* {openMenu === "onboarding" && (
                        <ul className="dropdown-submenu">
                            <li><Link href={"/dashboard/user-management/hotel"}>Hotels</Link></li>
                            <li><Link href={"/dashboard/user-management/drivers"}>Drivers</Link></li>
                            <li><Link href={"/dashboard/user-management/restaurants"}>Restaurants</Link></li>
                            <li><Link href={"/dashboard/user-management/food-delivery"}>Food Delivery</Link></li>
                        </ul>
                    )} */}

          {/* WILL WORK */}
          {/* <li>
            <Link href={"/dashboard/transaction-monitization"}>
              <div className="custom-flex">
                <Image src={sidebarImg4} alt="" className="img-fluid" />
                <p className="sidebar-hd">Transactions & Monetization</p>
              </div>
            </Link>
          </li> */}
              {/* <i
                className={`fa-solid fa-play ${
                  openMenu === "transactions" ? "rotate" : ""
                }`}
              ></i> */}
          {/* {openMenu === "transactions" && (
            <ul className="dropdown-submenu">
              <li>
                <Link href={"/dashboard/user-management/hotel"}>Hotels</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/drivers"}>Drivers</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/restaurants"}>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/food-delivery"}>
                  Food Delivery
                </Link>
              </li>
            </ul>
          )} */}

          {/* WILL WORK */}
          {/* <li className="reports-li">
            <Link href={"/dashboard/analytics-reports"}>
              <div className="custom-flex">
                <Image src={sidebarImg5} alt="" className="img-fluid" />
                <p className="sidebar-hd">Analytics Reports</p>
              </div>
            </Link>
          </li> */}
            {/* <i
            className={`fa-solid fa-play ${
              openMenu === "analytics" ? "rotate" : ""
            }`}
          ></i> */}

          {/* {openMenu === "analytics" && (
            <ul className="dropdown-submenu">
              <li>
                <Link href={"/dashboard/user-management/hotel"}>Hotels</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/drivers"}>Drivers</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/restaurants"}>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/food-delivery"}>
                  Food Delivery
                </Link>
              </li>
            </ul>
          )} */}

          {/* WILL WORK */}
          {/* <li>
            <Link href={"/dashboard/email-notifications"}>
              <div className="custom-flex">
                <Image src={sidebarImg6} alt="" className="img-fluid" />
                <p className="sidebar-hd">Email Notifications</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href={"/dashboard/setting-dashboard"}>
              <div className="custom-flex">
                <Image src={sidebarImg7} alt="" className="img-fluid" />
                <p className="sidebar-hd">Settings</p>
              </div>
            </Link>
          </li> */}
              {/* <i
              className={`fa-solid fa-play ${
                openMenu === "settings" ? "rotate" : ""
              }`}
            ></i> */}

          {/* {openMenu === "settings" && (
            <ul className="dropdown-submenu">
              <li>
                <Link href={"/dashboard/user-management/hotel"}>Hotels</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/drivers"}>Drivers</Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/restaurants"}>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/user-management/food-delivery"}>
                  Food Delivery
                </Link>
              </li>
            </ul>
          )} */}

        </div>

        <div className="w-100 custom-link" onClick={handleLogout}>
          <li>
            <Image src={sidebarImg8} alt="" className="img-fluid" />
            <p className="sidebar-hd">Logout</p>
          </li>
        </div>

      </ul>
    </section>
  );
};
export default Sidebar2;
