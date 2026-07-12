import React from "react";
import { carbonTransactions, emissionFactors, sustainabilityGoals } from "../data/mockData";

export default function EnvironmentalPage() {
  return (
    <div>
      <h1>Environmental Module</h1>
      <p>Carbon accounting, emission factors, and sustainability goals.</p>

      <div className="card">
        <h3>Emission Factors</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Factor</th>
            </tr>
          </thead>
          <tbody>
            {emissionFactors.map((item, idx) => (
              <tr key={idx}>
                <td>{item.category}</td>
                <td>{item.factor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Carbon Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Department</th>
              <th>Amount</th>
              <th>Factor</th>
              <th>Emissions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {carbonTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.type}</td>
                <td>{tx.department}</td>
                <td>{tx.amount}</td>
                <td>{tx.factor}</td>
                <td>{tx.emissions}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Sustainability Goals</h3>
        {sustainabilityGoals.map((goal, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{goal.title}</strong>
              <span>{goal.progress}%</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${goal.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}