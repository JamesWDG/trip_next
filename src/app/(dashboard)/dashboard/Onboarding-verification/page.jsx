import Double_table_data from '@/app/components/Double_table_data'
import React from 'react'

const page = () => {
    const headings = [
        "Type",
        "Name",
        "I’d",
        "Status",
        "Action",
    ];
    const data = [
        {
            phone: "Driver",
            name: "Nike Johnson",
            email: "BRV-012",
            status: "Pending",
        },
        {
            phone: "Host",
            name: "Nike Johnson",
            email: "HRV-321",
            status: "Verified",
        },
        {
            phone: "Restaurant",
            name: "Nike Johnson",
            email: "CHR-332",
            status: "Pending",
        },
        {
            phone: "Driver",
            name: "Nike Johnson",
            email: "BRV-142",
            status: "Pending",
        },
        {
            phone: "Host",
            name: "Nike Johnson",
            email: "BRV-012",
            status: "Pending",
        },
        {
            phone: "Restaurant",
            name: "Nike Johnson",
            email: "BRV-321",
            status: "Verified",
        },
    ];
    const headings2 = [
        "Name",
        "Document Type",
        "Submit Date",
        "Action",
    ];
    const data2 = [
        {
            name: "Nike Johnson",
            phone: "CNIC",
            email: "02-04-2025",
        },
        {
            name: "Nike Johnson",
            phone: "Driving License",
            email: "02-04-2025",
        },
        {
            name: "Nike Johnson",
            phone: "CNIC",
            email: "02-04-2025",
        },
        {
            name: "Nike Johnson",
            phone: "CNIC",
            email: "02-04-2025",
        },
    ];
    return (
        <>
            <section className="main-content-area">
                <h1 className="dashboard-hd">Onboarding & Verification</h1>
                <h3 className='dashboard-hd-mini'>Invoices & Subscriptions</h3>
                <Double_table_data Doubletable_heading={headings} Doubletable_data={data} />
                <h3 className='dashboard-hd-mini mt-5'>Identity Verification Queue </h3>
                <Double_table_data Doubletable_heading2={headings2} Doubletable_data2={data2} />

            </section>
        </>
    )
}

export default page
