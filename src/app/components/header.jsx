"use client";
import React, { useContext } from 'react'
import Image from 'next/image'
import profileImage from "@/app/(dashboard)/assets/images/profile-img.png"
import { SideBarContext } from '@/context/sideBarContextProvider';
const header = () => {
    const { setSideBarOpen ,sideBarOpen} = useContext(SideBarContext);

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
                <div className="profile-det-area">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle position-relative" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className="fa-solid fa-bell"></i>
                            <span className="badge"><i className='fa-solid fa-circle'></i></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li className="d-flex justify-content-between">
                                <p><span>12</span> Unread messages</p>
                                <a className="clear-btn" href="#">Clear All</a>
                            </li>
                            <li className="notify-li">
                                <div className="d-flex align-items-start gap-2">
                                    <div>
                                        <Image src={profileImage} alt="" />
                                    </div>
                                    <a href="#">
                                        <h6>2min ago</h6>
                                        <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                                    </a>
                                </div>
                            </li>
                            <li className="notify-li">
                                <div className="d-flex align-items-start gap-2">
                                    <div>
                                        <Image src={profileImage} alt="" />
                                    </div>
                                    <a href="#">
                                        <h6>2min ago</h6>
                                        <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                                    </a>
                                </div>
                            </li>
                            <li className="notify-li">
                                <div className="d-flex align-items-start gap-2">
                                    <div>
                                        <Image src={profileImage} alt="" />
                                    </div>
                                    <a href="#">
                                        <h6>2min ago</h6>
                                        <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle position-relative profile-btn" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <Image src={profileImage} alt="" />
                            <div>
                                <h5>Augustine Okp</h5>
                                <h6>Vendor Profile</h6>
                            </div>
                        </button>
                        <ul className="dropdown-menu profile-menu">
                            <li className="prof-li">
                                <a className="" href="#"><i className="fa-solid fa-circle-user"></i> Profile</a>
                            </li>
                            <li className="prof-li">
                                <a className="" href="#"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</a>
                            </li>
                        </ul>
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
