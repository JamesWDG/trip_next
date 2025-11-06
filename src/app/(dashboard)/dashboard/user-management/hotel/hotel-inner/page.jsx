"use client";
import React from "react";
import Image from "next/image";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import hotelImg from "@/app/(dashboard)/assets/images/bed-bedroom.png";
import bedImg from "@/app/(dashboard)/assets/images/bed1.png";
import bathImg from "@/app/(dashboard)/assets/images/bath1.png";
import parkingImg from "@/app/(dashboard)/assets/images/parking1.png";
import { Outfit400, Outfit500, Outfit600, Poppins400, Poppins500 } from "@/fonts/index";

const hotels = [
    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },
    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },
    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },

    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },
    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },
    {
        name: "Lux Hotel Casino",
        price: "$180/night",
        rating: 4.5,
        beds: "3 Bed",
        bath: "2 Bath",
        parking: "2 Parking",
        location: "Kingdom Tower, Brazil",
        image: hotelImg,
    },
];

export default function HotelsPage() {
    return (
        <div className="dashboard-content hotels-dashboard" style={{ background: "#fffaf9" }}>
            <h3 className={`dashboard-heading ${Outfit600.className}`}>Hotels</h3>

            <div className="hotels-card-prnt">
                <div className="row gy-3">
                    {hotels.map((hotel,i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <Card className="hotel-card">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="hotel-img-wrap">
                                        <Image
                                            src={hotel.image}
                                            alt={hotel.name}
                                            className="rounded-start hotel-img"
                                        />
                                    </div>
                                    <div className="card-body-1">
                                        <h5 className={`hotel-title ${Poppins500.className}`}>{hotel.name}</h5>
                                        <div className="d-flex gap-2">
                                            <p className={`hotel-price ${Poppins500.className}`}>
                                                {hotel.price}
                                            </p>

                                            <span >
                                                <i className="fa-solid fa-star"></i>
                                                {hotel.rating}
                                            </span>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="d-flex align-items-center gap-1">
                                                <Image
                                                src={bedImg}
                                                alt=""
                                                className="img-fluid"
                                                />
                                                <p className={`bed-para ${Poppins500.className}`}>{hotel.beds}</p>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                               <Image
                                                src={bathImg}
                                                alt=""
                                                className="img-fluid"
                                                />
                                                <p className={`bed-para ${Poppins500.className}`}>{hotel.bath}</p>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <Image
                                                src={parkingImg}
                                                alt=""
                                                className="img-fluid"
                                                />
                                                <p className={`bed-para ${Poppins500.className}`}>{hotel.parking}</p>
                                            </div>
                                        </div>
                                        <p className={`hotel-location text-muted ${Poppins400.className}`}>
                                            {hotel.location}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
