"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profileImage from "@/app/(dashboard)/assets/images/profile-img.png";
import { SideBarContext } from "@/context/sideBarContextProvider";
import { Dropdown } from "react-bootstrap/Dropdown";
import hamburgerImage from "@/app/(dashboard)/assets/images/hamburger-img.png";
import { useToast } from "@/hooks/useToast";
import { logout } from "@/services/authService";

const header = () => {
  const router = useRouter();

  const { setSideBarOpen, sideBarOpen } = useContext(SideBarContext);
  const [openBell, setOpenBell] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { success, error } = useToast();

  const bellRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpenBell(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
    <>
      <header className="header">
        <div className="search-area">
          {/* <div className="hamburger sidebarOpner" onClick={() => {
                        setSideBarOpen(!sideBarOpen);
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </div> */}
          <Image
            src={hamburgerImage}
            alt=""
            className="hamburger sidebarOpner img-fluid"
            onClick={() => {
              setSideBarOpen(!sideBarOpen);
            }}
          />
          {/* <div className="search-form">
            <form action="">
              <input type="search" placeholder="Searching..." />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div> */}
        </div>

        <div
          className="profile-det-area"
          style={{ display: "flex", gap: "20px" }}
        >
          {/* 🔔 Bell Dropdown */}
          <div
            className="dropdown"
            ref={bellRef}
            style={{ position: "relative" }}
          >
            <button
              className="btn position-relative"
              onClick={() => {
                setOpenBell(!openBell);
                setOpenProfile(false);
              }}
            >
              <i className="fa-solid fa-bell"></i>
              <span className="badge">
                <i className="fa-solid fa-circle"></i>
              </span>
            </button>

            {openBell && (
              <ul className="dropdown-menu" style={{ display: "block" }}>
                <li className="d-flex justify-content-between">
                  <p>
                    <span>12</span> Unread messages
                  </p>
                  <a className="clear-btn" href="#">
                    Clear All
                  </a>
                </li>

                <li className="notify-li">
                  <a href="#">
                    <h6>2min ago</h6>
                    <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                  </a>
                </li>

                <li className="notify-li">
                  <a href="#">
                    <h6>2min ago</h6>
                    <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                  </a>
                </li>

                <li className="notify-li">
                  <a href="#">
                    <h6>2min ago</h6>
                    <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* 👤 Profile Dropdown */}
          <div
            className="dropdown"
            ref={profileRef}
            style={{ position: "relative" }}
          >
            <button
              className="btn position-relative profile-btn"
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenBell(false);
              }}
            >
              <Image
                src={profileImage}
                alt=""
                className="profile-image img-fluid"
              />
              <div>
                <h5>Augustine Okp</h5>
                <h6>Admin Profile</h6>
              </div>
              <i className="fa-solid fa-play"></i>
            </button>

            {openProfile && (
              <ul
                className="dropdown-menu profile-menu profile-area"
                style={{ display: "block" }}
              >
                {/* <li className="prof-li">
                  <a href="#">
                    <i className="fa-solid fa-circle-user"></i> Profile
                  </a>
                </li> */}
                <li className="prof-li">
                  <a href="javascript:void(0);" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

      </header>
      
    </>
  );
};

export default header;
