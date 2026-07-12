import React from "react";
import { policies, audits, complianceIssues } from "../data/mockData";

export default function GovernancePage() {
  return (
    <div>
      <h1>Governance Module</h1>
      <p>Policies, audits, and compliance tracking.</p>

      <div className="card">
        <h3>Policies</h3>
        <table>
          <thead>
            <tr>
              <th>Policy</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.owner}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Audits</h3>
        <table>
          <thead>
            <tr>
              <th>Audit</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.owner}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Compliance Issues</h3>
        <table>
          <thead>
            <tr>
              <th>Audit</th>
              <th>Severity</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complianceIssues.map((c) => (
              <tr key={c.id}>
                <td>{c.audit}</td>
                <td>{c.severity}</td>
                <td>{c.description}</td>
                <td>{c.owner}</td>
                <td>{c.dueDate}</td>
                <td className={c.status === "Overdue" ? "red" : "green"}>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}