"use client";
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Sector,
} from "recharts";

const data = [
    { name: "Orange", value: 85, color: "#1d4ed8" }, // orange
    { name: "Blue", value: 15, color: "#f97316" },   // blue
];

// Custom label (to draw line + value outside)
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25; // line length
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const color = data[index].color;
    const value = data[index].value;

    // line start and end points
    const lineStartX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const lineStartY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            {/* connector line */}
            <line
                x1={lineStartX}
                y1={lineStartY}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={2}
            />
            {/* label text */}
            <text
                x={x + (x > cx ? 8 : -8)}
                y={y}
                textAnchor={x > cx ? "start" : "end"}
                fill={color}
                fontSize={22}
                fontWeight={700}
                dominantBaseline="middle"
            >
                {value}
            </text>
        </g>
    );
};

export default function BookingsChart() {
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
            
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={130}
                        dataKey="value"
                        startAngle={290}     // 👈 changed
                        endAngle={-180}      // 👈 changed
                        labelLine={false}
                        label={renderCustomizedLabel}
                        stroke="#fff"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
