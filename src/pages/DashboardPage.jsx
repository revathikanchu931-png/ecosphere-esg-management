import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../components/StatCard";
import { summary, departmentScores, notifications } from "../data/mockData";

const pieData = [
  { name: "Environmental", value: summary.environmental },
  { name: "Social", value: summary.social },
  { name: "Governance", value: summary.governance },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

export default function DashboardPage() {
  return (
    <div>
      <h1>ESG Dashboard</h1>
      <p>Overall sustainability performance overview.</p>

      <div className="grid-4">
        <StatCard title="Overall ESG Score" value={summary.overall} color="#22c55e" />
        <StatCard title="Environmental" value={summary.environmental} color="#22c55e" />
        <StatCard title="Social" value={summary.social} color="#3b82f6" />
        <StatCard title="Governance" value={summary.governance} color="#f59e0b" />
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>ESG Split</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Department Scores</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentScores}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="environmental" fill="#22c55e" />
              <Bar dataKey="social" fill="#3b82f6" />
              <Bar dataKey="governance" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Recent Notifications</h3>
        <ul className="list">
          {notifications.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}