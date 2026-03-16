"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getUserOnboarding } from "@/services/userService";

// ─── Dummy Data Sets (fallback only) ──────────────────────

const fallbackData = {
  weekly: [
    { label: "Mon", registered: 42, completed: 31 },
    { label: "Tue", registered: 58, completed: 44 },
    { label: "Wed", registered: 35, completed: 27 },
    { label: "Thu", registered: 74, completed: 61 },
    { label: "Fri", registered: 91, completed: 78 },
    { label: "Sat", registered: 53, completed: 40 },
    { label: "Sun", registered: 29, completed: 19 },
  ],
  monthly: [
    { label: "Jan", registered: 534, completed: 412 },
    { label: "Feb", registered: 687, completed: 561 },
    { label: "Mar", registered: 702, completed: 589 },
    { label: "Apr", registered: 433, completed: 310 },
    { label: "May", registered: 845, completed: 721 },
    { label: "Jun", registered: 976, completed: 854 },
    { label: "Jul", registered: 612, completed: 508 },
    { label: "Aug", registered: 1090, completed: 957 },
    { label: "Sep", registered: 745, completed: 673 },
    { label: "Oct", registered: 898, completed: 821 },
    { label: "Nov", registered: 521, completed: 490 },
    { label: "Dec", registered: 1144, completed: 1012 },
  ],
  yearly: [
    { label: "2019", registered: 3200, completed: 2700 },
    { label: "2020", registered: 5800, completed: 4900 },
    { label: "2021", registered: 7400, completed: 6200 },
    { label: "2022", registered: 9100, completed: 7800 },
    { label: "2023", registered: 11500, completed: 9900 },
    { label: "2024", registered: 14200, completed: 12300 },
  ],
};

// ─── Y-Axis Domain per filter ────────────────────────

const domainMap = {
  Weekly: [0, 40],
  Monthly: [0, 200],
  Yearly: [0, 400],
};

// ─── Custom Tooltip ──────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "10px 16px",
          fontSize: "13px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 6, color: "#111827" }}>
          {label}
        </p>
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: entry.fill,
                display: "inline-block",
              }}
            />
            <span style={{ color: "#6b7280", textTransform: "capitalize" }}>
              {entry.dataKey}:
            </span>
            <span style={{ fontWeight: 600, color: "#111827" }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Dynamic Domain ──────────────────────────────────

const getDynamicDomain = (data) => {
  if (!data || data.length === 0) return [0, 10];

  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.registered || 0, item.completed || 0))
  );

  const padding = Math.ceil(maxValue * 0.2);
  const max = maxValue + padding;

  return [0, max];
};

// ─── Component ───────────────────────────────────────

export default function UserOnboardingChart({
  filter = "Monthly",
  apiData,
  loading,
  error
}) {
  // GET CHART DATA (API OR FALLBACK)
  const getChartData = () => {
    const filterKey = filter.toLowerCase();

    if (apiData && apiData[filterKey]) {
      return apiData[filterKey].map((item) => ({
        label: item.label,
        registered: item.registered || 0,
        completed: item.completed || 0,
      }));
    }
    
    return fallbackData[filterKey] || fallbackData.monthly;
  };

  const currentData = getChartData();
  const [yMin, yMax] = getDynamicDomain(currentData) || domainMap[filter];

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
      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "3px",
              background: "#1d4ed8",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 13, color: "#6b7280" }}>Registered</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "3px",
              background: "#f97316",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Completed Onboarding
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={270}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p>Loading chart data...</p>
          </div>
        ) : (
          <BarChart
            data={currentData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[yMin, yMax]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <Bar
              dataKey="registered"
              fill="#1d4ed8"
              radius={[6, 6, 0, 0]}
              barSize={22}
            />
            <Bar
              dataKey="completed"
              fill="#f97316"
              radius={[6, 6, 0, 0]}
              barSize={22}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
