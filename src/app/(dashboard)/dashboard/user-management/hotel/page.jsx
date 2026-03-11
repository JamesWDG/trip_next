"use client";

import { useEffect, useState } from "react";
import Management_table from "@/app/components/Management_table";
import { getUsers } from "@/services/userService";
import { useToast } from "@/hooks/useToast";
import { format_phone, format_date } from "@/utils/helpers";

const page = () => {
    const headings = [
        "Hotels",
        "Mobile Number",
        "Email Address",
        "Date",
        "Status",
        "Action",
    ];

    const data = [
        {
            name: "Hotel Name",
            phone: "+92 122 343 4059",
            email: "infoexample@gmail.com",
            date: "02-04-2025",
            status: "Completed",
        },
        {
            name: "Hotel Name",
            phone: "+92 122 343 4059",
            email: "infoexample@gmail.com",
            date: "02-04-2025",
            status: "Pending",
        },
        {
            name: "Hotel Name",
            phone: "+92 122 343 4059",
            email: "infoexample@gmail.com",
            date: "02-04-2025",
            status: "Cancelled",
        }
    ];
    return (
        <>
            <section className="main-content-area">
                <h1 className="dashboard-hd">Hotels Management</h1>
                <Management_table heading={headings} data={data} />
            </section>
        </>
    )
}

export default page
