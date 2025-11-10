"use client";
import React from "react";
import Image from "next/image";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import alertsImg from "@/app/(dashboard)/assets/images/profile-img.png";
import { Outfit300, Outfit400, Outfit500, Outfit600, Poppins400, Poppins500 } from "@/fonts/index";
import Double_table_data from "@/app/components/Double_table_data";

const notificationsAlerts = [
    {
        alertHd: "Role-based Access",
        alertDes: <>Manage sub-admin roles and assign access to <br />
            different modules.</>,
        btnText: "Manage Role-based Access"
    },
    {
        alertHd: "Static Pages",
        alertDes: <>Set module-level permissions for analytics, <br />
            CMS, and approvals.</>,
        btnText: "Manage Permissions"
    },
    {
        alertHd: "FAQs",
        alertDes: <>Update admin profile, email preferences, and <br />
            reset password.</>,
        btnText: "Manage Profile Settings"
    },
];

export default function HotelsPage() {
    const headings4 = [
        "Role",
        "Analytics",
        "CMS",
        "Approvals",
        "Action",
    ];
    const data4 = [
        {
            phone: "Super Admin",
            group: "",
            status: "",
            date_sent: "Oct 21, 2025",
        },
        {
            phone: "Super Admin",
            group: "Driving License",
            status: "",
            date_sent: "Oct 21, 2025",
        },
        {
            phone: "Super Admin",
            group: "",
            status: "",
            date_sent: "Oct 21, 2025",
        },
        {
            phone: "Super Admin",
            group: "",
            status: "",
            date_sent: "Oct 21, 2025",
        },
    ];
    return (
        <>
            <section>
                <div className="dashboard-content" style={{ background: "#fffaf9" }}>
                    <h3 className={`dashboard-heading ${Outfit600.className}`}>Notifications & Alerts</h3>

                    <div className="hotels-card-prnt">
                        <div className="row gy-3">
                            {notificationsAlerts.map((notificationsAlert, i) => (
                                <div key={i} className="col-lg-4 col-md-6">
                                    <Card className="alerts-card setting-card">
                                        <div className="alerts-div d-flex align-items-center gap-3">
                                            <Image src={alertsImg} alt="" className="img-fluid" />
                                            <h2 className={`alerts-hd ${Outfit600.className}`}>{notificationsAlert.alertHd}</h2>
                                        </div>
                                        <p className={`alert-para ${Outfit400.className}`}>{notificationsAlert.alertDes}</p>
                                        <button className={`gradient-button setting-button ${Outfit500.className}`}>{notificationsAlert.btnText}</button>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className='dashboard-hd-mini dashboard-hd-mini-notification'>Sub-admin Roles & Access</h3>
                    <Double_table_data Doubletable_heading={headings4} Doubletable_data={data4} />
                    <h3 className="dashboard-hd-mini dashboard-hd-mini-notification">Profile & Password Settings</h3>
                    <form action="" className="form-section">
                        <div className="row row-gap-4">
                            <div className="input-wrapper d-flex align-items-center gap-4">
                                <div className="input-div">
                                    <label htmlFor="" className={`${Outfit300.className}`}>Admin Name</label>
                                    <div>
                                        <input type="text" placeholder="Enter Your Name" className={`${Outfit400.className}`} />
                                    </div>
                                </div>
                                <div className="input-div">
                                    <label htmlFor="" className={`${Outfit300.className}`}>Email</label>
                                    <div>
                                        <input type="text" placeholder="Enter Your Email" className={`${Outfit400.className}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="input-wrapper d-flex align-items-center gap-4">
                                <div className="input-div">
                                    <label htmlFor="" className={`${Outfit300.className}`}>New Password</label>
                                    <div>
                                        <input type="text" placeholder="Enter New Password" className={`${Outfit400.className}`} />
                                    </div>
                                </div>
                                <div className="input-div">
                                    <label htmlFor="" className={`${Outfit300.className}`}>Confirm Password</label>
                                    <div>
                                        <input type="text" placeholder="Confirm New Password" className={`${Outfit400.className}`} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button className={`gradient-button profile-btn mt-4 ${Outfit500.className}`}>Update Profile</button>
                    </form>



                </div>
            </section>


        </>



    )

}
