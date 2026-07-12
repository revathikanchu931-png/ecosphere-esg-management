import React from "react";
import { NavLink } from "react-router-dom";
import { FaLeaf, FaChartLine, FaUsers, FaGavel, FaFileAlt } from "react-icons/fa";

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    background: isActive ? "#16a34a" : "transparent",
    color: isActive ? "white" : "#111827",
  });

  return (
    <aside className="sidebar">
      <div className="logo">
        <FaLeaf /> EcoSphere
      </div>

      <nav>
        <NavLink to="/" style={linkStyle}>
          <FaChartLine /> Dashboard
        </NavLink>
        <NavLink to="/environmental" style={linkStyle}>
          <FaLeaf /> Environmental
        </NavLink>
        <NavLink to="/social" style={linkStyle}>
          <FaUsers /> Social
        </NavLink>
        <NavLink to="/governance" style={linkStyle}>
          <FaGavel /> Governance
        </NavLink>
        <NavLink to="/reports" style={linkStyle}>
          <FaFileAlt /> Reports
        </NavLink>
      </nav>
    </aside>
  );
}