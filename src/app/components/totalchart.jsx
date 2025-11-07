"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", blue: 450, orange: 320 },
  { name: "Feb", blue: 600, orange: 400 },
  { name: "Mar", blue: 800, orange: 700 },
  { name: "Apr", blue: 300, orange: 500 },
  { name: "May", blue: 1000, orange: 850 },
  { name: "Jun", blue: 750, orange: 650 },
  { name: "Jul", blue: 1200, orange: 900 },
];

export default function TotalRevenueChart() {
  return (
    <div
      style={{
        width: "100%",
        height: 360,
        background: "#fff",
        borderRadius: "12px",
        padding: "25px 42px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h5
        style={{
          fontWeight: 600,
          fontSize: "18px",
          marginBottom: "18px",
          color: "#111827",
        }}
      >
      </h5>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 1200]}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="blue" fill="#1d4ed8" radius={[6, 6, 0, 0]} barSize={25} />
          <Bar dataKey="orange" fill="#f97316" radius={[6, 6, 0, 0]} barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
