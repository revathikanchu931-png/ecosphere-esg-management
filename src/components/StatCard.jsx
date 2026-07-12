import React from "react";

export default function StatCard({ title, value, color }) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}