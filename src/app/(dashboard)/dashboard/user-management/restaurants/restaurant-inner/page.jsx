"use client";
import React from "react";
import Image from "next/image";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outfit400, Outfit500, Outfit600, Poppins400, Poppins500, Outfit700, Poppins700 } from "@/fonts/index";

const foodOrders = [
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Deliverd",
    },
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Rejected",
    },
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Deliverd",
    },
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Rejected",
    },
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Deliverd",
    },
    {
        orderId: "0214",
        ordertime: "05:30PM",
        orderName: "Leonelle Ferguson",
        orderPrice: "$32 • Wallet",
        orderStatus: "Rejected",
    },
];

export default function FoodPage() {
    return (
        <div className="main-content-area" style={{ background: "#fffaf9" }}>
            <h3 className={`dashboard-heading ${Outfit600.className}`}>Food Orders</h3>

            <div className="food-card-prnt">
                <div className="row gy-4">
                    {foodOrders.map((foodOrder) => (
                        <div key={foodOrder.id} className="col-xxl-4 col-xl-4 col-md-6 col-12">
                            <Card className="food-card">
                                <div class="order-card">
                                    <div class="order-header">
                                        <div class="order-id-time d-flex align-items-center gap-3">
                                            <span class={`order-id ${Poppins700.className}`}>{foodOrder.orderId}</span>
                                            <span class={`order-time ${Poppins700.className}`}>{foodOrder.ordertime}</span>
                                        </div>
                                        <div className="order-name-prnt d-flex align-items-center justify-content-between">
                                            <div class={`order-name ${Poppins700.className}`}>{foodOrder.orderName}</div>
                                            <div class={`order-price ${Poppins700.className}`}>{foodOrder.orderPrice}</div>
                                        </div>
                                    </div>
                                    <div
                                        className={`order-status ${Poppins700.className} ${foodOrder.orderStatus === "Delivered"
                                                ? "delivered"
                                                : foodOrder.orderStatus === "Rejected"
                                                    ? "rejected"
                                                    : ""
                                            }`}
                                    >
                                        {foodOrder.orderStatus}
                                    </div>

                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
