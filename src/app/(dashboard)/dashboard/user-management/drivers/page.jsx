import React from 'react';
import Management_table from '@/app/components/Management_table';
const page = () => {
  const headings = [
    "Drivers",
    "Mobile Number",
    "Email Address",
    "Date",
    "Status",
    "Action",
  ];

  const data = [
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Completed",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Pending",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Completed",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },
    {
      name: "Nike Johnson",
      phone: "+92 122 343 4059",
      email: "infoexample@gmail.com",
      date: "02-04-2025",
      status: "Cancelled",
    },

  ];
  return (
    <>
      <section className="main-content-area">
        <h1 className="dashboard-hd">Drivers Management</h1>
        <Management_table heading={headings} data={data} />
      </section>
    </>
  )
}

export default page
