"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import sidebarLogo from "@/app/(dashboard)/assets/images/sidebar-logo.png";
import sidebarImg1 from "@/app/(dashboard)/assets/images/side-bar-img-1.png";
import sidebarImg2 from "@/app/(dashboard)/assets/images/side-bar-img-2.png";
import sidebarImg3 from "@/app/(dashboard)/assets/images/side-bar-img3.png";
import sidebarImg4 from "@/app/(dashboard)/assets/images/side-bar-img-4.png";
import sidebarImg5 from "@/app/(dashboard)/assets/images/side-bar-img-5.png";
import sidebarImg6 from "@/app/(dashboard)/assets/images/side-bar-img-6.png";
import sidebarImg7 from "@/app/(dashboard)/assets/images/side-bar-img-7.png";
import sidebarImg8 from "@/app/(dashboard)/assets/images/side-bar-img8.png";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);

    // All menu items except logout
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: sidebarImg1, href: "/" },
        {
            id: "userManagement",
            label: "User Management",
            icon: sidebarImg2,
            children: [
                { label: "Hotels", href: "/user-management/hotels" },
                { label: "Restaurants", href: "/user-management/restaurants" },
                { label: "Customers", href: "/user-management/customers" },
                { label: "Staff", href: "/user-management/staff" },
            ],
        },
        {
            id: "Onboarding & Verification",
            label: "Onboarding & Verification",
            icon: sidebarImg3,
            children: [
                { label: "Hotels", href: "/user-management/hotels" },
                { label: "Restaurants", href: "/user-management/restaurants" },
                { label: "Customers", href: "/user-management/customers" },
                { label: "Staff", href: "/user-management/staff" },
            ],
        },
        {
            id: "Transactions & Monetization",
            label: "Transactions & Monetization",
            icon: sidebarImg4,
            children: [
                { label: "Hotels", href: "/user-management/hotels" },
                { label: "Restaurants", href: "/user-management/restaurants" },
                { label: "Customers", href: "/user-management/customers" },
                { label: "Staff", href: "/user-management/staff" },
            ],
        },
        {
            id: "Analytics Reports",
            label: "Analytics Reports",
            icon: sidebarImg5,
            children: [
                { label: "Hotels", href: "/user-management/hotels" },
                { label: "Restaurants", href: "/user-management/restaurants" },
                { label: "Customers", href: "/user-management/customers" },
                { label: "Staff", href: "/user-management/staff" },
            ],
        },
        {
            id: "Email Notifications",
            label: "Email Notifications",
            icon: sidebarImg6,
            href: "/Email Notifications",
        },
        {
            id: "Settings",
            label: "Settings",
            icon: sidebarImg7,
            href: "/Settings",
        },
    ];

    // Logout item (separate)
    const logoutItem = {
        id: "logout",
        label: "Logout",
        icon: sidebarImg8,
        href: "/logout",
    };

    return (
        <section
            className="sidebar"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div>
                {/* Logo */}
                <div className="logo-area" style={{ marginBottom: "30px" }}>
                    <Link href="/">
                        <Image
                            src={sidebarLogo}
                            alt="Logo"
                            className="img-fluid sidebar-logo"
                        />
                    </Link>
                </div>

                {/* Menu items */}
                <ul
                    className="sidebar-menu"
                    style={{ padding: 0, margin: 0, listStyle: "none" }}
                >
                    {menuItems.map((item) => (
                        <li key={item.id} style={{}}>
                            {item.children ? (
                                <>
                                    <button
                                        className="menu-button"
                                        onClick={() =>
                                            setOpenMenu(
                                                openMenu === item.id ? null : item.id
                                            )
                                        }
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            border: "none",
                                            background: "none",
                                            cursor: "pointer",
                                            padding: "5px 0",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            className="d-flex justify-content-center gap-2 align-items-center"
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                className="im-fluid"
                                            />
                                            <span>{item.label}</span>
                                        </div>
                                        <span>
                                            {openMenu === item.id ? "▲" : "▼"}
                                        </span>
                                    </button>

                                    {openMenu === item.id && (
                                        <ul
                                            className="sidebar-menu-list-open"
                                        >
                                            {item.children.map((child, index) => (
                                                <li key={index}
                                                    style={{
                                                        border: "none"
                                                    }}
                                                >

                                                    <Link
                                                        href={child.href}
                                                        style={{
                                                            display: "block",
                                                            padding: "5px 0",
                                                        }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link href={item.href}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "5px 0",
                                        }}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            className="img-fluid"
                                        />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout (Fixed at bottom & centered) */}
            <div
                className="logout-section"
                style={{
                    marginTop: "200px",
                }}
            >
                <Link
                    href={logoutItem.href}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                    }}
                >
                    <Image
                        src={logoutItem.icon}
                        alt={logoutItem.label}
                        width={34}
                        height={34}
                    />
                    <span>{logoutItem.label}</span>
                </Link>
            </div>
        </section>
    );
}
