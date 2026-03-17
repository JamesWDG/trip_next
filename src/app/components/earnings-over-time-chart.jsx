"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function EarningsOverTimeChart({ data }) {
  const series = data?.barChartData || [];

  if (!series.length) {
    return (
      <div
        style={{
          width: "100%",
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#ffffff",
          border: "1px dashed #e5e7eb",
        }}
      >
        <span style={{ color: "#6b7280", fontSize: 14 }}>
          No earnings data available yet.
        </span>
      </div>
    );
  }

  const maxVal = Math.max(
    ...series.map((item) =>
      Math.max(
        item.hotelBooking || 0,
        item.carRide || 0,
        item.restaurantOrder || 0,
        item.total || 0
      )
    )
  );
  const padding = Math.ceil(maxVal * 0.2);

  return (
    <div
      style={{
        width: "100%",
        height: 360,
        background: "#ffffff",
        borderRadius: 16,
        padding: "24px 28px",
        border: "1px solid #f3e5ff",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={series}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="period"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, maxVal + padding]}
          />
          <Tooltip
            formatter={(value) => `₦${Number(value).toLocaleString()}`}
            cursor={{ stroke: "rgba(0,0,0,0.06)", strokeWidth: 32 }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="hotelBooking"
            name="Hotel"
            stroke="#1d4ed8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="carRide"
            name="Rides"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="restaurantOrder"
            name="Food"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#111827"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

