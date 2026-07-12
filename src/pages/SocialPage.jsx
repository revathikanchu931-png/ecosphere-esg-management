import React from "react";
import { csrActivities, employeeParticipation, badges, rewards } from "../data/mockData";

export default function SocialPage() {
  return (
    <div>
      <h1>Social + Gamification Module</h1>
      <p>CSR activities, employee participation, badges, and rewards.</p>

      <div className="card">
        <h3>CSR Activities</h3>
        <div className="grid-3">
          {csrActivities.map((a) => (
            <div className="mini-card" key={a.id}>
              <h4>{a.title}</h4>
              <p>Category: {a.category}</p>
              <p>XP: {a.xp}</p>
              <span className={`badge-status ${a.status.toLowerCase()}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Employee Participation</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Activity</th>
              <th>Proof</th>
              <th>Approval</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {employeeParticipation.map((item, idx) => (
              <tr key={idx}>
                <td>{item.employee}</td>
                <td>{item.activity}</td>
                <td>{item.proof}</td>
                <td>{item.approval}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Badges</h3>
          {badges.map((b, idx) => (
            <div key={idx} className="list-row">
              <strong>{b.name}</strong>
              <span>{b.description}</span>
              <span className={b.unlocked ? "green" : "gray"}>
                {b.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Rewards</h3>
          {rewards.map((r, idx) => (
            <div key={idx} className="list-row">
              <strong>{r.name}</strong>
              <span>{r.pointsRequired} points</span>
              <span>{r.stock} stock</span>
              <span className={r.stock > 0 ? "green" : "red"}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}