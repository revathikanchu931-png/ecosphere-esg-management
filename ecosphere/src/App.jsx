import { useMemo, useState } from 'react'
import './App.css'

const summary = {
  esgScore: 84,
  carbonSaved: 18.6,
  peopleReached: 12480,
  compliance: 92,
  dataQuality: 96,
}

const departments = [
  { name: 'Operations', environmental: 82, social: 74, governance: 78, emissions: 42, change: '+8' },
  { name: 'IT', environmental: 76, social: 88, governance: 84, emissions: 18, change: '+5' },
  { name: 'HR', environmental: 68, social: 94, governance: 86, emissions: 9, change: '+11' },
  { name: 'Finance', environmental: 71, social: 80, governance: 91, emissions: 14, change: '+4' },
]

const initiatives = [
  {
    title: 'Solar roof phase 2',
    owner: 'Operations',
    impact: '9.2 tCO2e reduction',
    progress: 72,
    status: 'On track',
  },
  {
    title: 'Inclusive hiring sprint',
    owner: 'HR',
    impact: '34 candidates supported',
    progress: 64,
    status: 'Mentor review',
  },
  {
    title: 'Vendor ethics refresh',
    owner: 'Procurement',
    impact: '51 vendors screened',
    progress: 83,
    status: 'On track',
  },
]

const activities = [
  { employee: 'Asha', action: 'Tree plantation proof uploaded', points: 80, state: 'Approved' },
  { employee: 'Rahul', action: 'E-waste collection drive', points: 65, state: 'Pending' },
  { employee: 'Meera', action: 'Policy acknowledgement completed', points: 45, state: 'Approved' },
  { employee: 'Kabir', action: 'Accessibility audit volunteer', points: 70, state: 'Verified' },
]

const risks = [
  { label: 'High-emission logistics invoices', owner: 'Operations', severity: 'High', due: 'Jul 18' },
  { label: 'Supplier policy evidence missing', owner: 'Procurement', severity: 'Medium', due: 'Jul 21' },
  { label: 'Quarterly board ESG review', owner: 'Governance', severity: 'Low', due: 'Jul 30' },
]

const evidence = [
  { name: 'Solar purchase invoices', type: 'Carbon', status: 'Verified', confidence: 98 },
  { name: 'CSR attendance proofs', type: 'Social', status: 'Needs review', confidence: 81 },
  { name: 'Vendor code acknowledgements', type: 'Governance', status: 'Verified', confidence: 94 },
]

const milestones = [
  { date: 'Jul 15', title: 'Carbon baseline locked', detail: 'Scope 1 and 2 evidence finalized' },
  { date: 'Jul 22', title: 'Supplier review', detail: 'Procurement audit packet ready' },
  { date: 'Jul 30', title: 'Board summary', detail: 'Auto-generated ESG brief prepared' },
]

const reportTemplates = [
  'Investor ESG summary',
  'Carbon audit pack',
  'CSR participation report',
  'Governance compliance brief',
]

const navItems = [
  ['overview', 'Overview'],
  ['environment', 'Environment'],
  ['social', 'Social'],
  ['governance', 'Governance'],
  ['reports', 'Reports'],
]

function StatCard({ label, value, detail, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="progress" aria-label={`${value}% complete`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function ScoreRing({ value, label }) {
  return (
    <div className="score-ring" style={{ '--score': `${value * 3.6}deg` }}>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState('overview')
  const [reportModule, setReportModule] = useState('All modules')
  const [reportDept, setReportDept] = useState('All departments')
  const [reportStatus, setReportStatus] = useState('Draft preview ready')

  const selectedDepartment = useMemo(
    () => departments.find((dept) => dept.name === reportDept),
    [reportDept],
  )

  const predictedScore = selectedDepartment
    ? Math.round(
        (selectedDepartment.environmental + selectedDepartment.social + selectedDepartment.governance) /
          3,
      )
    : summary.esgScore

  function generateReport() {
    setReportStatus(`Report queued for ${reportDept} - ${reportModule}`)
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <strong>EcoSphere</strong>
            <small>ESG command center</small>
          </div>
        </div>

        <nav aria-label="Primary">
          {navItems.map(([view, label]) => (
            <button
              className={activeView === view ? 'active' : ''}
              key={view}
              onClick={() => setActiveView(view)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <span>Readiness</span>
          <strong>{summary.dataQuality}%</strong>
          <small>Data quality score</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="hero">
          <div>
            <h1>Measure impact, verify proof, and report ESG progress faster.</h1>
            <p>
              EcoSphere brings carbon data, CSR participation, governance risks, and evidence
              workflows into one executive-ready workspace.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => setActiveView('reports')}>Build report</button>
              <button type="button" onClick={() => setActiveView('governance')}>Review risks</button>
            </div>
          </div>
          <div className="hero-panel">
            <ScoreRing value={summary.esgScore} label="overall ESG" />
            <div>
              <strong>Recommended next action</strong>
              <p>Move logistics vendors with missing evidence into the July audit queue.</p>
              <span className="confidence">Impact estimate: +4 ESG points</span>
            </div>
          </div>
        </header>

        <section className="stats-grid" aria-label="Key metrics">
          <StatCard label="ESG score" value={`${summary.esgScore}/100`} detail="+6 this quarter" tone="green" />
          <StatCard label="Carbon saved" value={`${summary.carbonSaved} t`} detail="vs. baseline" tone="blue" />
          <StatCard label="People reached" value={summary.peopleReached.toLocaleString()} detail="CSR impact" tone="gold" />
          <StatCard label="Compliance" value={`${summary.compliance}%`} detail="evidence complete" tone="ink" />
        </section>

        {activeView === 'overview' && (
          <>
            <section className="content-grid">
              <article className="panel wide">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Department intelligence</p>
                    <h2>Performance by team</h2>
                  </div>
                  <span className="pill">Auto-ranked</span>
                </div>
                <div className="department-list">
                  {departments.map((dept) => (
                    <div className="department-row" key={dept.name}>
                      <strong>{dept.name}</strong>
                      <div>
                        <span>Environment</span>
                        <ProgressBar value={dept.environmental} />
                      </div>
                      <div>
                        <span>Social</span>
                        <ProgressBar value={dept.social} />
                      </div>
                      <div>
                        <span>Governance</span>
                        <ProgressBar value={dept.governance} />
                      </div>
                      <em>{dept.change}</em>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <p className="eyebrow">Priority work</p>
                <h2>Action queue</h2>
                <div className="initiative-list">
                  {initiatives.map((item) => (
                    <div className="initiative" key={item.title}>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.owner} - {item.impact}</span>
                      </div>
                      <ProgressBar value={item.progress} />
                      <small>{item.status}</small>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="content-grid compact">
              <article className="panel">
                <p className="eyebrow">Evidence vault</p>
                <h2>Proof quality</h2>
                <div className="evidence-list">
                  {evidence.map((item) => (
                    <div className="evidence-item" key={item.name}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.type} - {item.status}</span>
                      </div>
                      <b>{item.confidence}%</b>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <p className="eyebrow">Roadmap</p>
                <h2>Upcoming milestones</h2>
                <div className="timeline">
                  {milestones.map((item) => (
                    <div className="timeline-item" key={item.title}>
                      <span>{item.date}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {activeView === 'environment' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Carbon accounting</p>
              <h2>Emission hotspots</h2>
              <div className="bar-chart">
                {departments.map((dept) => (
                  <div key={dept.name}>
                    <span>{dept.name}</span>
                    <div><b style={{ height: `${dept.emissions * 4}px` }} /></div>
                    <strong>{dept.emissions}t</strong>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Scenario planner</p>
              <h2>Reduce 6.4 tCO2e</h2>
              <p className="panel-copy">
                Replace two high-emission supplier routes and attach invoice proof to the next
                audit report.
              </p>
              <div className="impact-stack">
                <span>Fuel route optimization <b>2.8t</b></span>
                <span>Solar procurement proof <b>2.1t</b></span>
                <span>Office energy controls <b>1.5t</b></span>
              </div>
              <button className="primary-action" type="button">Create action plan</button>
            </article>
          </section>
        )}

        {activeView === 'social' && (
          <section className="content-grid">
            <article className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">CSR engagement</p>
                  <h2>Employee participation</h2>
                </div>
                <span className="pill">1,280 points earned</span>
              </div>
              <div className="table">
                {activities.map((activity) => (
                  <div className="table-row" key={`${activity.employee}-${activity.action}`}>
                    <strong>{activity.employee}</strong>
                    <span>{activity.action}</span>
                    <span>{activity.points} XP</span>
                    <em>{activity.state}</em>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Community impact</p>
              <h2>Impact mix</h2>
              <div className="donut-list">
                <span><b /> Environment drives</span>
                <span><b /> Health camps</span>
                <span><b /> Accessibility audits</span>
              </div>
              <p className="panel-copy">Participation is highest in HR and IT. Operations needs two more team leads for the next drive.</p>
            </article>
          </section>
        )}

        {activeView === 'governance' && (
          <section className="content-grid">
            <article className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Governance risk</p>
                  <h2>Compliance watchlist</h2>
                </div>
                <span className="pill">3 open items</span>
              </div>
              <div className="risk-list">
                {risks.map((risk) => (
                  <div className={`risk ${risk.severity.toLowerCase()}`} key={risk.label}>
                    <div>
                      <strong>{risk.label}</strong>
                      <span>{risk.owner}</span>
                    </div>
                    <b>{risk.severity}</b>
                    <small>Due {risk.due}</small>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Controls</p>
              <h2>Policy coverage</h2>
              <div className="control-list">
                <span>Code of conduct <b>100%</b></span>
                <span>Data privacy <b>96%</b></span>
                <span>Anti-bribery <b>88%</b></span>
                <span>Vendor ethics <b>82%</b></span>
              </div>
            </article>
          </section>
        )}

        {activeView === 'reports' && (
          <section className="content-grid">
            <article className="panel">
              <p className="eyebrow">Report builder</p>
              <h2>Generate stakeholder output</h2>
              <label>
                Module
                <select value={reportModule} onChange={(event) => setReportModule(event.target.value)}>
                  <option>All modules</option>
                  <option>Environmental</option>
                  <option>Social</option>
                  <option>Governance</option>
                </select>
              </label>
              <label>
                Department
                <select value={reportDept} onChange={(event) => setReportDept(event.target.value)}>
                  <option>All departments</option>
                  {departments.map((dept) => <option key={dept.name}>{dept.name}</option>)}
                </select>
              </label>
              <button className="primary-action" type="button" onClick={generateReport}>Generate report</button>
              <p className="status-note">{reportStatus}</p>
            </article>
            <article className="panel wide report-preview">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Preview</p>
                  <h2>{reportModule} - {reportDept}</h2>
                </div>
                <ScoreRing value={predictedScore} label="report score" />
              </div>
              <div className="template-grid">
                {reportTemplates.map((template) => <span key={template}>{template}</span>)}
              </div>
            </article>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
