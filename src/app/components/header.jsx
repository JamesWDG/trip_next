"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import profileImage from "@/app/(dashboard)/assets/images/profile-img.png"
import { SideBarContext } from '@/context/sideBarContextProvider';
import { Dropdown } from 'react-bootstrap/Dropdown';
const header = () => {
    const { setSideBarOpen, sideBarOpen } = useContext(SideBarContext);
    const [openBell, setOpenBell] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

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
    return (
        <>
            <header className="header">
                <div className="search-area">
                    <div className="hamburger sidebarOpner" onClick={() => {
                        setSideBarOpen(!sideBarOpen);
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="search-form">
                        <form action="">
                            <input type="search" placeholder="Searching..." />
                            <button>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="profile-det-area" style={{ display: "flex", gap: "20px" }}>

                    {/* 🔔 Bell Dropdown */}
                    <div className="dropdown" ref={bellRef} style={{ position: "relative" }}>
                        <button
                            className="btn position-relative"
                            onClick={() => {
                                setOpenBell(!openBell);
                                setOpenProfile(false);
                            }}
                        >
                            <i className="fa-solid fa-bell"></i>
                            <span className="badge"><i className="fa-solid fa-circle"></i></span>
                        </button>

                        {openBell && (
                            <ul className="dropdown-menu" style={{ display: "block" }}>
                                <li className="d-flex justify-content-between">
                                    <p><span>12</span> Unread messages</p>
                                    <a className="clear-btn" href="#">Clear All</a>
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
                    <div className="dropdown" ref={profileRef} style={{ position: "relative" }}>
                        <button
                            className="btn position-relative profile-btn"
                            onClick={() => {
                                setOpenProfile(!openProfile);
                                setOpenBell(false);
                            }}
                        >
                            <Image src={profileImage} alt="" className="profile-image img-fluid" />
                            <div>
                                <h5>Augustine Okp</h5>
                                <h6>Vendor Profile</h6>
                            </div>
                        </button>

                        {openProfile && (
                            <ul className="dropdown-menu profile-menu profile-area" style={{ display: "block" }}>
                                <li className="prof-li">
                                    <a href="#"><i className="fa-solid fa-circle-user"></i> Profile</a>
                                </li>
                                <li className="prof-li">
                                    <a href="#"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</a>
                                </li>
                            </ul>
                        )}
                    </div>

                </div>

                {/* <script>
        const hamburger = document.querySelector('.hamburger');         // for mobile
        const sidebar = document.querySelector('.side-bar');
        const closeBtn = document.querySelector('.close-sidebar');

        const hamburger2 = document.querySelector('.sidebarOpner');     // for desktop
        const sidebar2 = document.querySelector('.smallBar');

        let currentMode = null;

        function activateMobileSidebar() {
            if (currentMode === 'mobile') return;
            currentMode = 'mobile';

            // Remove previous listeners
            if (hamburger2) hamburger2.onclick = null;

            if (hamburger) {
                hamburger.onclick = () => sidebar.classList.add('active');
            }

            if (closeBtn) {
                closeBtn.onclick = () => sidebar.classList.remove('active');
            }
        }

        function activateDesktopSidebar() {
            if (currentMode === 'desktop') return;
            currentMode = 'desktop';

            // Remove previous listeners
            if (hamburger) hamburger.onclick = null;
            if (closeBtn) closeBtn.onclick = null;

            if (hamburger2) {
                hamburger2.onclick = () => sidebar2.classList.toggle('collapsed');
            }

            // Mobile sidebar should be hidden if open
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }

        function handleSidebarToggle() {
            if (window.innerWidth <= 991) {
                activateMobileSidebar();
            } else {
                activateDesktopSidebar();
            }
        }

        // Run on load
        handleSidebarToggle();

        // Run on window resize
        window.addEventListener('resize', handleSidebarToggle);
    </script> */}

            </header>
        </>
    )
}

export default header
