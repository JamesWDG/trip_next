"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  hotel_booking: "#1d4ed8",
  ride: "#10b981",
  food_order: "#f97316",
};

export default function RevenueTypeChart({ data }) {
  const chartData = [
    {
      name: "Hotel / Accommodation",
      key: "hotel_booking",
      value: data?.hotel_booking || 0,
      color: COLORS.hotel_booking,
    },
    {
      name: "Rides",
      key: "ride",
      value: data?.ride || 0,
      color: COLORS.ride,
    },
    {
      name: "Restaurant / Food",
      key: "food_order",
      value: data?.food_order || 0,
      color: COLORS.food_order,
    },
  ].filter((d) => d.value > 0);

  if (!chartData.length) {
    return (
      <div
        style={{
          width: "100%",
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          background: "#ffffff",
          border: "1px dashed #e5e7eb",
        }}
      >
        <span style={{ color: "#6b7280", fontSize: 14 }}>
          No revenue data available yet.
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        background: "#ffffff",
        borderRadius: 16,
        padding: "20px 24px 16px",
        border: "1px solid #f3e5ff",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${entry.key}-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

