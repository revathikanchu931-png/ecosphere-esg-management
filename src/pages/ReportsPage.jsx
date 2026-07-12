import React, { useState } from "react";

export default function ReportsPage() {
  const [module, setModule] = useState("All");
  const [department, setDepartment] = useState("All");

  return (
    <div>
      <h1>Reports</h1>
      <p>Generate ESG reports with filters.</p>

      <div className="card">
        <h3>Custom Report Builder</h3>
        <div className="filters">
          <select value={module} onChange={(e) => setModule(e.target.value)}>
            <option>All</option>
            <option>Environmental</option>
            <option>Social</option>
            <option>Governance</option>
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option>All</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>IT</option>
          </select>

          <button className="btn">Generate Report</button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Environmental Report</h3>
          <p>Carbon emissions, goals, and department tracking.</p>
        </div>
        <div className="card">
          <h3>Social Report</h3>
          <p>CSR activities, employee participation, and engagement.</p>
        </div>
        <div className="card">
          <h3>Governance Report</h3>
          <p>Policies, audits, and compliance issues.</p>
        </div>
        <div className="card">
          <h3>ESG Summary Report</h3>
          <p>Combined ESG score and department ranking.</p>
        </div>
      </div>
    </div>
  );
}