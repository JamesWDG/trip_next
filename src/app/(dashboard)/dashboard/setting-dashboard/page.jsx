"use client";
import React from "react";
import Image from "next/image";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import alertsImg from "@/app/(dashboard)/assets/images/profile-img.png";
import { Outfit300, Outfit400, Outfit500, Outfit600, Poppins400, Poppins500 } from "@/fonts/index";

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
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    {/* <th>Sr.No</th> */}
                                    <th>Role</th>
                                    <th>Analytics</th>
                                    <th>CMS</th>
                                    <th>Approvals</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Super Admin</td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="status-completed td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="position-relative custom-action-cell">
                                        <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                                        <div className="custom-dropdown-menu" style={{ display: "none" }}>
                                            <div className="custom-dropdown-item">View</div>
                                            <div className="custom-dropdown-item text-danger">Delete</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Finance Admin</td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="td-icon x-icon"><i class="fa-solid fa-xmark"></i></td>
                                    <td className="status-completed td-icon x-icon"><i class="fa-solid fa-xmark"></i></td>
                                    <td className="position-relative custom-action-cell">
                                        <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                                        <div className="custom-dropdown-menu" style={{ display: "none" }}>
                                            <div className="custom-dropdown-item">View</div>
                                            <div className="custom-dropdown-item text-danger">Delete</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Super Admin</td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="status-completed td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="position-relative custom-action-cell">
                                        <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                                        <div className="custom-dropdown-menu" style={{ display: "none" }}>
                                            <div className="custom-dropdown-item">View</div>
                                            <div className="custom-dropdown-item text-danger">Delete</div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Content Admin</td>
                                    <td className="td-icon x-icon"><i class="fa-solid fa-xmark"></i></td>
                                    <td className="td-icon"><i class="fa-solid fa-check"></i></td>
                                    <td className="status-completed td-icon x-icon"><i class="fa-solid fa-xmark"></i></td>
                                    <td className="position-relative custom-action-cell">
                                        <i className="fa-solid fa-ellipsis-vertical custom-toggle" style={{ cursor: "pointer" }}></i>
                                        <div className="custom-dropdown-menu" style={{ display: "none" }}>
                                            <div className="custom-dropdown-item">View</div>
                                            <div className="custom-dropdown-item text-danger">Delete</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


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
                        <button className={`gradient-button profile-btn ${Outfit500.className}`}>Update Profile</button>
                    </form>



                </div>
            </section>


        </>



    )

}
