"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    useEffect(() => {
        const hamburger = document.querySelector(".hamburger"); // for mobile
        const sidebar = document.querySelector(".side-bar");
        const closeBtn = document.querySelector(".close-sidebar");

        const hamburger2 = document.querySelector(".sidebarOpner"); // for desktop
        const sidebar2 = document.querySelector(".smallBar");

        let currentMode = null;

        function activateMobileSidebar() {
            if (currentMode === "mobile") return;
            currentMode = "mobile";

            if (hamburger2) hamburger2.onclick = null;

            if (hamburger) {
                hamburger.onclick = () => sidebar?.classList.add("active");
            }

            if (closeBtn) {
                closeBtn.onclick = () => sidebar?.classList.remove("active");
            }
        }

        function activateDesktopSidebar() {
            if (currentMode === "desktop") return;
            currentMode = "desktop";

            if (hamburger) hamburger.onclick = null;
            if (closeBtn) closeBtn.onclick = null;

            if (hamburger2) {
                hamburger2.onclick = () => sidebar2?.classList.toggle("collapsed");
            }

            if (sidebar) {
                sidebar.classList.remove("active");
            }
        }

        function handleSidebarToggle() {
            if (window.innerWidth <= 991) {
                activateMobileSidebar();
            } else {
                activateDesktopSidebar();
            }
        }

        handleSidebarToggle();
        window.addEventListener("resize", handleSidebarToggle);

        return () => {
            window.removeEventListener("resize", handleSidebarToggle);
        };
    }, []);

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="search-area">
                            <div className="hamburger sidebarOpner">
                                <i className="fa-solid fa-bars"></i>
                            </div>
                            <div className="search-form">
                                <form action="">
                                    <input type="search" placeholder="Search" />
                                    <button type="button">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="profile-det-area">

                            <div className="dropdown">
                                <Link href="#" className="btn dropdown-toggle position-relative cart-view">
                                    <i className="fa-regular fa-heart"></i>
                                    <span className="badge">38</span>
                                </Link>
                            </div>


                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle position-relative"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-regular fa-bell"></i>
                                    <span className="badge">12</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li className="d-flex justify-content-between">
                                        <p>
                                            <span>12</span> Unread messages
                                        </p>
                                        <a className="clear-btn" href="#">
                                            Clear All
                                        </a>
                                    </li>

                                    {[1, 2, 3].map((item) => (
                                        <li className="notify-li" key={item}>
                                            <div className="d-flex align-items-start gap-2">
                                                <div>
                                                    <Image
                                                        src="/assets/images/person-img.png"
                                                        alt="person"
                                                        width={30}
                                                        height={30}
                                                    />
                                                </div>
                                                <Link href="#">
                                                    <h6>2min ago</h6>
                                                    <p>Donec dapibus mauris id odio ornare tempus amet.</p>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Profile dropdown */}
                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle position-relative profile-btn"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <Image
                                        src="/assets/images/person-img.png"
                                        alt="profile"
                                        width={35}
                                        height={35}
                                    />
                                    <div>
                                        <h5>Alexis Anderson</h5>
                                        <h6>User Profile</h6>
                                    </div>
                                </button>
                                <ul className="dropdown-menu profile-menu">
                                    <li className="prof-li">
                                        <Link href="#">
                                            <i className="fa-solid fa-circle-user"></i> Profile
                                        </Link>
                                    </li>
                                    <li className="prof-li">
                                        <Link href="#">
                                            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
