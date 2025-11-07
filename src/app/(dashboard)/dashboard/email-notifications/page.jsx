"use client";
import React from "react";
import Image from "next/image";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import alertsImg from "@/app/(dashboard)/assets/images/profile-img.png";
import { Outfit300, Outfit400, Outfit500, Outfit600, Poppins400, Poppins500 } from "@/fonts/index";

const notificationsAlerts = [
    {
        alertHd: "Automated Alerts",
        alertDes: <>System-triggered emails and in-app notifications for registration,<br /> approvals, and transactions.</>,
        btnText: "Manage Automated Alerts"
    },
    {
        alertHd: "Manual Broadcasts",
        alertDes: <>Send custom announcements or alerts to all users, specific roles,<br /> or regions.</>,
        btnText: "Manage Manual Broadcasts"
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
                                <div key={i} className="col-lg-6 col-md-6">
                                    <Card className="alerts-card">
                                        <div className="alerts-div d-flex align-items-center gap-3">
                                            <Image src={alertsImg} alt="" className="img-fluid" />
                                            <h2 className={`alerts-hd ${Outfit600.className}`}>{notificationsAlert.alertHd}</h2>
                                        </div>
                                        <p className={`alert-para ${Outfit400.className}`}>{notificationsAlert.alertDes}</p>
                                        <button className={`gradient-button alert-button ${Outfit500.className}`}>{notificationsAlert.btnText}</button>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="dashboard-hd-mini dashboard-hd-mini-notification">Send Manual Notification</h3>
                    <form action="" className="form-section">
                        <div className="input-wrapper d-flex align-items-center gap-4">
                            <div className="input-div">
                                <label htmlFor="" className={`${Outfit300.className}`}>Recipient Group</label>
                                <select id="recipientGroup" className={`form-select ${Outfit400.className}`}>
                                    <option value="all">All Users</option>
                                    <option value="admins">Admins</option>
                                    <option value="members">Members</option>
                                </select>
                            </div>
                            <div className="input-div">
                                <label htmlFor="" className={`${Outfit300.className}`}>Subject</label>
                                <div>
                                    <input type="text" placeholder="Enter Subject" className={`${Outfit400.className}`} />
                                </div>
                            </div>
                        </div>
                        <div className="textarea-wrapper">
                            <label htmlFor="" className={`${Outfit300.className}`}>Subject</label>
                            <div>
                                <textarea name="" id="" placeholder="Write Your message Here..." rows={3} className={`${Outfit400.className}`}></textarea>
                            </div>
                        </div>
                        <button className={`gradient-button form-button ${Outfit500.className}`}>Send Notification</button>
                    </form>


                    <h3 className='dashboard-hd-mini dashboard-hd-mini-notification'>Manage Content</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    {/* <th>Sr.No</th> */}
                                    <th>Type</th>
                                    <th>Recipient Group</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Approval Email</td>
                                    <td>Drivers</td>
                                    <td>Sent</td>
                                    <td className="status-completed">Oct 21, 2025</td>
                                </tr>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Approval Email</td>
                                    <td>All Users</td>
                                    <td>Pending</td>
                                    <td className="status-completed">Oct 20, 2025</td>
                                </tr>
                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Broadcast Message</td>
                                    <td>Drivers</td>
                                    <td>Sent</td>
                                    <td className="status-completed">Oct 19, 2025</td>
                                </tr>

                                <tr>
                                    {/* <td>01</td> */}
                                    <td>Subscription Reminder</td>
                                    <td>Restaurants</td>
                                    <td>Pending</td>
                                    <td className="status-completed">Oct 18, 2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


        </>



    )

}
