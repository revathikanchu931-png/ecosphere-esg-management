import { useMemo, useState } from 'react'
import './App.css'

const defaultCompany = {
  name: 'Demo Organization',
  industry: 'Multi-department enterprise',
  location: 'Global',
  employees: 301,
  reportingYear: '2026',
  logo: '',
  website: 'https://example.com',
  email: 'esg@example.com',
  carbonReductionTarget: '30% by 2030',
  netZeroTargetYear: '2040',
  renewableEnergy: 48,
  sustainabilityMission: 'Make sustainability measurable, inclusive, and accountable across every department.',
  reportingStandard: 'GRI',
}

const sampleCompanies = [
  {
    name: 'GreenSteel Manufacturing',
    industry: 'Manufacturing',
    location: 'Hyderabad',
    employees: 520,
    reportingYear: '2026',
    logo: '',
    website: 'https://greensteel.example',
    email: 'sustainability@greensteel.example',
    carbonReductionTarget: '35% by 2030',
    netZeroTargetYear: '2045',
    renewableEnergy: 52,
    sustainabilityMission: 'Decarbonize production while improving worker safety and supplier accountability.',
    reportingStandard: 'BRSR',
  },
  {
    name: 'CloudNova Technologies',
    industry: 'IT Services',
    location: 'Bengaluru',
    employees: 880,
    reportingYear: '2026',
    logo: '',
    website: 'https://cloudnova.example',
    email: 'esg@cloudnova.example',
    carbonReductionTarget: '50% by 2030',
    netZeroTargetYear: '2035',
    renewableEnergy: 71,
    sustainabilityMission: 'Run low-carbon digital operations and expand inclusive technology programs.',
    reportingStandard: 'GRI',
  },
  {
    name: 'MetroCare Hospitals',
    industry: 'Healthcare',
    location: 'Chennai',
    employees: 640,
    reportingYear: '2026',
    logo: '',
    website: 'https://metrocare.example',
    email: 'impact@metrocare.example',
    carbonReductionTarget: '25% by 2030',
    netZeroTargetYear: '2050',
    renewableEnergy: 39,
    sustainabilityMission: 'Deliver responsible healthcare with efficient facilities and community well-being programs.',
    reportingStandard: 'SASB',
  },
]

const departments = [
  { name: 'Operations', code: 'OPS', head: 'Nisha Rao', employees: 142, environmental: 82, social: 74, governance: 78, total: 79 },
  { name: 'IT', code: 'IT', head: 'Arjun Mehta', employees: 86, environmental: 76, social: 88, governance: 84, total: 82 },
  { name: 'HR', code: 'HR', head: 'Farah Khan', employees: 32, environmental: 68, social: 94, governance: 86, total: 81 },
  { name: 'Finance', code: 'FIN', head: 'Meera Iyer', employees: 41, environmental: 71, social: 80, governance: 91, total: 80 },
]

const emissionFactors = [
  { category: 'Purchase', factor: '0.12 kgCO2e / INR', status: 'Active' },
  { category: 'Manufacturing', factor: '0.25 kgCO2e / unit', status: 'Active' },
  { category: 'Fleet', factor: '0.22 kgCO2e / km', status: 'Active' },
  { category: 'Expense', factor: '0.08 kgCO2e / INR', status: 'Review' },
]

const carbonTransactions = [
  { source: 'Fleet', department: 'Operations', amount: '1,200 km', factor: 0.22, emissions: '264 kgCO2e', mode: 'Auto' },
  { source: 'Purchase', department: 'Finance', amount: 'INR 5,000', factor: 0.12, emissions: '600 kgCO2e', mode: 'Auto' },
  { source: 'Manufacturing', department: 'Operations', amount: '900 units', factor: 0.25, emissions: '225 kgCO2e', mode: 'Auto' },
]

const goals = [
  { title: 'Reduce carbon by 20%', owner: 'Operations', progress: 68 },
  { title: 'Green procurement 50%', owner: 'Finance', progress: 54 },
  { title: 'Energy efficiency 30%', owner: 'IT', progress: 80 },
]

const csrActivities = [
  { title: 'Tree Plantation Drive', category: 'Environment', department: 'HR', status: 'Active', participants: 42 },
  { title: 'Blood Donation Camp', category: 'Health', department: 'HR', status: 'Planned', participants: 28 },
  { title: 'E-waste Collection', category: 'Community', department: 'IT', status: 'Active', participants: 35 },
]

const participation = [
  { employee: 'Asha', activity: 'Tree Plantation Drive', proof: 'photo.jpg', approval: 'Approved', points: 80 },
  { employee: 'Rahul', activity: 'E-waste Collection', proof: 'receipt.pdf', approval: 'Under Review', points: 65 },
  { employee: 'Meera', activity: 'Policy Training', proof: 'certificate.pdf', approval: 'Approved', points: 45 },
]

const diversityMetrics = [
  { label: 'Women in leadership', value: 42 },
  { label: 'Training completion', value: 88 },
  { label: 'Engagement score', value: 81 },
]

const policies = [
  { name: 'Code of Conduct', owner: 'HR', acknowledgements: 98, status: 'Active' },
  { name: 'Data Privacy Policy', owner: 'IT', acknowledgements: 96, status: 'Active' },
  { name: 'Anti-Bribery Policy', owner: 'Legal', acknowledgements: 88, status: 'Review' },
]

const audits = [
  { name: 'Internal ESG Audit Q2', owner: 'Compliance Team', status: 'Completed', issues: 2 },
  { name: 'Vendor Evidence Audit', owner: 'Procurement', status: 'In Progress', issues: 4 },
]

const complianceIssues = [
  { issue: 'Supplier policy evidence missing', severity: 'High', owner: 'Procurement Lead', due: '2026-07-12', status: 'Overdue' },
  { issue: 'Fleet emission proof pending', severity: 'Medium', owner: 'Operations Head', due: '2026-07-18', status: 'Open' },
  { issue: 'Board ESG review minutes', severity: 'Low', owner: 'Governance Team', due: '2026-07-30', status: 'Open' },
]

const challenges = [
  { title: 'No Plastic Week', category: 'Lifestyle', xp: 120, difficulty: 'Easy', status: 'Active', deadline: 'Jul 20' },
  { title: 'Energy Saver Sprint', category: 'Environment', xp: 180, difficulty: 'Medium', status: 'Under Review', deadline: 'Jul 24' },
  { title: 'Commute Carbon Cut', category: 'Transport', xp: 220, difficulty: 'Hard', status: 'Draft', deadline: 'Aug 02' },
]

const leaderboard = [
  { name: 'Asha', xp: 820, badges: 5 },
  { name: 'Kabir', xp: 760, badges: 4 },
  { name: 'Rahul', xp: 690, badges: 4 },
  { name: 'Meera', xp: 610, badges: 3 },
]

const rewards = [
  { name: 'Eco Store Voucher', points: 500, stock: 12, status: 'Available' },
  { name: 'Learning Credit', points: 750, stock: 6, status: 'Available' },
  { name: 'Team Lunch Coupon', points: 300, stock: 0, status: 'Out of Stock' },
]

const notifications = [
  'New high-severity compliance issue assigned to Procurement Lead',
  'Rahul challenge proof is waiting for approval',
  'Asha unlocked Green Champion badge',
  'Policy acknowledgement reminder sent to Finance',
]

const businessRules = [
  ['Auto emission calculation', 'Enabled', 'ERP purchase, manufacturing, expense and fleet records calculate carbon automatically.'],
  ['Evidence requirement', 'Enabled', 'CSR and challenge participation cannot be approved without proof.'],
  ['Badge auto-award', 'Enabled', 'XP and completed-challenge rules unlock badges without manual admin action.'],
  ['Issue ownership', 'Required', 'Every compliance issue must have owner and due date; overdue items feed notifications.'],
]

const navItems = [
  ['company', 'Company Setup'],
  ['dashboard', 'Dashboard'],
  ['master', 'Master Data'],
  ['environmental', 'Environmental'],
  ['social', 'Social'],
  ['governance', 'Governance'],
  ['gamification', 'Gamification'],
  ['reports', 'Reports'],
  ['settings', 'Settings'],
]

function ProgressBar({ value }) {
  return (
    <div className="progress" aria-label={`${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function StatCard({ label, value, detail, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
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

function DataTable({ columns, rows }) {
  return (
    <div className="data-table">
      <div className="data-row header">
        {columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      {rows.map((row, index) => (
        <div className="data-row" key={`${row[0]}-${index}`}>
          {row.map((cell) => <span key={`${cell}-${index}`}>{cell}</span>)}
        </div>
      ))}
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState('company')
  const [company, setCompany] = useState(defaultCompany)
  const [companyDraft, setCompanyDraft] = useState(defaultCompany)
  const [uploadStatus, setUploadStatus] = useState('Upload JSON/CSV or enter details manually.')
  const [reportModule, setReportModule] = useState('All modules')
  const [reportDept, setReportDept] = useState('All departments')
  const [reportFormat, setReportFormat] = useState('PDF')
  const [reportStatus, setReportStatus] = useState('Select filters to preview an ESG report.')

  const esgScore = useMemo(() => {
    const total = departments.reduce((sum, dept) => sum + dept.total, 0)
    return Math.round(total / departments.length)
  }, [])

  const selectedDept = departments.find((dept) => dept.name === reportDept)
  const previewScore = selectedDept ? selectedDept.total : esgScore

  function generateReport() {
    setReportStatus(`${reportFormat} export ready for ${company.name} - ${reportDept} - ${reportModule}`)
  }

  function updateCompanyField(field, value) {
    setCompanyDraft((current) => ({ ...current, [field]: value }))
  }

  function saveCompanyDetails() {
    setCompany({
      ...companyDraft,
      employees: Number(companyDraft.employees) || 0,
      renewableEnergy: Number(companyDraft.renewableEnergy) || 0,
    })
    setUploadStatus(`${companyDraft.name || 'Company'} profile applied to dashboard.`)
    setActiveView('dashboard')
  }

  function loadSampleCompany(nextCompany) {
    setCompany(nextCompany)
    setCompanyDraft(nextCompany)
    setUploadStatus(`${nextCompany.name} sample profile loaded.`)
    setActiveView('dashboard')
  }

  function parseCompanyCsv(text) {
    const [headerLine, valueLine] = text.trim().split(/\r?\n/)
    const headers = headerLine.split(',').map((item) => item.trim())
    const values = valueLine.split(',').map((item) => item.trim())

    return headers.reduce((profile, header, index) => {
      const key = header.toLowerCase().replace(/\s+/g, '')
        const fieldMap = {
          companyname: 'name',
          name: 'name',
          industry: 'industry',
          location: 'location',
          employees: 'employees',
          employeecount: 'employees',
          reportingyear: 'reportingYear',
          year: 'reportingYear',
          logo: 'logo',
          companylogo: 'logo',
          website: 'website',
          email: 'email',
          carbonreductiontarget: 'carbonReductionTarget',
          netzerotargetyear: 'netZeroTargetYear',
          renewableenergy: 'renewableEnergy',
          renewableenergypercent: 'renewableEnergy',
          sustainabilitymission: 'sustainabilityMission',
          esgreportingstandard: 'reportingStandard',
          reportingstandard: 'reportingStandard',
        }
      const field = fieldMap[key]
      return field ? { ...profile, [field]: values[index] } : profile
    }, {})
  }

  function uploadCompanyProfile(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = String(reader.result || '')
        const imported = file.name.toLowerCase().endsWith('.json')
          ? JSON.parse(text)
          : parseCompanyCsv(text)
        const nextCompany = {
          ...defaultCompany,
          ...imported,
          employees: Number(imported.employees) || defaultCompany.employees,
          renewableEnergy: Number(imported.renewableEnergy) || defaultCompany.renewableEnergy,
        }

        setCompany(nextCompany)
        setCompanyDraft(nextCompany)
        setUploadStatus(`${nextCompany.name} imported successfully.`)
        setActiveView('dashboard')
      } catch {
        setUploadStatus('Could not import file. Use JSON or CSV with company and ESG profile fields.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <div>
            <strong>EcoSphere</strong>
            <small>ESG Management Platform</small>
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
          <span>Active company</span>
          <strong>{company.name}</strong>
          <small>{company.industry} - {company.reportingYear}</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="hero">
          <div>
            <div className="company-identity">
              {company.logo ? <img src={company.logo} alt={`${company.name} logo`} /> : <span>{company.name.charAt(0)}</span>}
              <div>
                <p className="eyebrow">EcoSphere: ESG Management Platform</p>
                <small>{company.website} - {company.email}</small>
              </div>
            </div>
            <h1>Measure, manage, and improve ESG performance for any organization.</h1>
            <p>
              Upload or enter company details, then connect operational data, employee
              participation, compliance activity, gamification, and reporting in one workspace.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => setActiveView('company')}>Add company</button>
              <button type="button" onClick={() => setActiveView('reports')}>Build report</button>
            </div>
          </div>
          <div className="hero-panel">
            <ScoreRing value={esgScore} label="overall ESG" />
            <div>
              <strong>Score formula</strong>
              <p>{company.name} scores roll up using configurable E/S/G weights.</p>
              <span className="confidence">Net zero target: {company.netZeroTargetYear}</span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard label="Overall ESG score" value={`${esgScore}/100`} detail="Weighted department average" tone="green" />
          <StatCard label="Carbon tracked" value="1,089 kg" detail="Auto-calculated from ERP records" tone="blue" />
          <StatCard label="Company employees" value={company.employees.toLocaleString()} detail={`${company.industry} - ${company.location}`} tone="gold" />
          <StatCard label="Renewable energy" value={`${company.renewableEnergy}%`} detail={company.carbonReductionTarget} tone="ink" />
        </section>

        {activeView === 'company' && (
          <>
            <section className="content-grid">
              <article className="panel wide">
                <p className="eyebrow">Company setup</p>
                <h2>Upload or enter any company details</h2>
                <div className="form-grid">
                  <label>Company name
                    <input value={companyDraft.name} onChange={(event) => updateCompanyField('name', event.target.value)} />
                  </label>
                  <label>Industry
                    <input value={companyDraft.industry} onChange={(event) => updateCompanyField('industry', event.target.value)} />
                  </label>
                  <label>Location
                    <input value={companyDraft.location} onChange={(event) => updateCompanyField('location', event.target.value)} />
                  </label>
                  <label>Employee count
                    <input type="number" value={companyDraft.employees} onChange={(event) => updateCompanyField('employees', event.target.value)} />
                  </label>
                  <label>Reporting year
                    <input value={companyDraft.reportingYear} onChange={(event) => updateCompanyField('reportingYear', event.target.value)} />
                  </label>
                  <label>Import company profile
                    <input accept=".json,.csv" type="file" onChange={uploadCompanyProfile} />
                  </label>
                </div>
                <button className="primary-action" type="button" onClick={saveCompanyDetails}>Apply company profile</button>
                <p className="status-note">{uploadStatus}</p>
              </article>
              <article className="panel">
                <p className="eyebrow">Quick samples</p>
                <h2>Try different company types</h2>
                <div className="stack-list">
                  {sampleCompanies.map((item) => (
                    <button className="sample-button" key={item.name} type="button" onClick={() => loadSampleCompany(item)}>
                      <span>{item.name}</span>
                      <b>{item.industry}</b>
                    </button>
                  ))}
                </div>
                <p className="helper-copy">CSV headers supported: name, industry, location, employees, reportingYear, website, email, carbonReductionTarget, netZeroTargetYear, renewableEnergy, sustainabilityMission, reportingStandard.</p>
              </article>
            </section>

            <section className="panel">
              <p className="eyebrow">Company ESG Profile</p>
              <h2>Organization sustainability identity</h2>
              <div className="form-grid">
                <label>Company Logo URL
                  <input value={companyDraft.logo} onChange={(event) => updateCompanyField('logo', event.target.value)} placeholder="https://..." />
                </label>
                <label>Website
                  <input value={companyDraft.website} onChange={(event) => updateCompanyField('website', event.target.value)} />
                </label>
                <label>Email
                  <input type="email" value={companyDraft.email} onChange={(event) => updateCompanyField('email', event.target.value)} />
                </label>
                <label>Carbon Reduction Target
                  <input value={companyDraft.carbonReductionTarget} onChange={(event) => updateCompanyField('carbonReductionTarget', event.target.value)} />
                </label>
                <label>Net Zero Target Year
                  <input value={companyDraft.netZeroTargetYear} onChange={(event) => updateCompanyField('netZeroTargetYear', event.target.value)} />
                </label>
                <label>Renewable Energy %
                  <input type="number" value={companyDraft.renewableEnergy} onChange={(event) => updateCompanyField('renewableEnergy', event.target.value)} />
                </label>
                <label>ESG Reporting Standard
                  <select value={companyDraft.reportingStandard} onChange={(event) => updateCompanyField('reportingStandard', event.target.value)}>
                    <option>GRI</option>
                    <option>BRSR</option>
                    <option>SASB</option>
                    <option>TCFD</option>
                    <option>ISSB</option>
                    <option>Custom</option>
                  </select>
                </label>
                <label className="wide-field">Sustainability Mission
                  <textarea value={companyDraft.sustainabilityMission} onChange={(event) => updateCompanyField('sustainabilityMission', event.target.value)} />
                </label>
              </div>
              <button className="primary-action" type="button" onClick={saveCompanyDetails}>Save ESG profile</button>
            </section>
          </>
        )}

        {activeView === 'dashboard' && (
          <>
            <section className="content-grid">
              <article className="panel wide">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Organization dashboard</p>
                    <h2>{company.name} ESG rankings</h2>
                  </div>
                  <span className="pill">Live scoring</span>
                </div>
                <div className="department-list">
                  {departments.map((dept) => (
                    <div className="department-row" key={dept.code}>
                      <strong>{dept.name}</strong>
                      <div><span>Environmental</span><ProgressBar value={dept.environmental} /></div>
                      <div><span>Social</span><ProgressBar value={dept.social} /></div>
                      <div><span>Governance</span><ProgressBar value={dept.governance} /></div>
                      <em>{dept.total}</em>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <p className="eyebrow">Business workflow</p>
                <h2>From ERP to reports</h2>
                <div className="flow-list">
                  {['Master configuration', 'Daily operations', 'Carbon transactions', 'Participation and audits', 'Department scores', 'Dashboard and reports'].map((step, index) => (
                    <div className="flow-step" key={step}>
                      <b>{index + 1}</b>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="content-grid compact">
              <article className="panel">
                <p className="eyebrow">Company ESG profile</p>
                <h2>{company.reportingStandard} reporting profile</h2>
                <div className="profile-card">
                  {company.logo ? <img src={company.logo} alt={`${company.name} logo`} /> : <span>{company.name.charAt(0)}</span>}
                  <div>
                    <strong>{company.name}</strong>
                    <p>{company.sustainabilityMission}</p>
                  </div>
                </div>
                <div className="stack-list">
                  <span>Carbon reduction target<b>{company.carbonReductionTarget}</b></span>
                  <span>Net zero target year<b>{company.netZeroTargetYear}</b></span>
                  <span>Renewable energy<b>{company.renewableEnergy}%</b></span>
                </div>
              </article>
              <article className="panel">
                <p className="eyebrow">Notifications</p>
                <h2>Action alerts</h2>
                <div className="notice-list">
                  {notifications.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
              <article className="panel">
                <p className="eyebrow">Required scope</p>
                <h2>Included modules</h2>
                <div className="module-grid">
                  {['Environmental', 'Social', 'Governance', 'Gamification', 'Reports', 'Settings'].map((module) => (
                    <span key={module}>{module}</span>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {activeView === 'master' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Master data</p>
              <h2>Departments and ownership</h2>
              <DataTable
                columns={['Department', 'Code', 'Head', 'Employees', 'Status']}
                rows={departments.map((dept) => [dept.name, dept.code, dept.head, dept.employees, 'Active'])}
              />
            </article>
            <article className="panel">
              <p className="eyebrow">Configuration</p>
              <h2>Emission factors</h2>
              <div className="stack-list">
                {emissionFactors.map((item) => (
                  <span key={item.category}>{item.category}<b>{item.factor}</b></span>
                ))}
              </div>
            </article>
          </section>
        )}

        {activeView === 'environmental' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Environmental</p>
              <h2>Carbon transactions</h2>
              <DataTable
                columns={['Source', 'Department', 'Amount', 'Factor', 'Emissions', 'Mode']}
                rows={carbonTransactions.map((item) => [item.source, item.department, item.amount, item.factor, item.emissions, item.mode])}
              />
            </article>
            <article className="panel">
              <p className="eyebrow">Sustainability goals</p>
              <h2>Goal progress</h2>
              <div className="initiative-list">
                {goals.map((goal) => (
                  <div className="initiative" key={goal.title}>
                    <strong>{goal.title}</strong>
                    <span>{goal.owner}</span>
                    <ProgressBar value={goal.progress} />
                  </div>
                ))}
              </div>
            </article>
          </section>
        )}

        {activeView === 'social' && (
          <>
            <section className="content-grid">
              <article className="panel wide">
                <p className="eyebrow">Social</p>
                <h2>CSR activities and participation</h2>
                <DataTable
                  columns={['Employee', 'Activity', 'Proof', 'Approval', 'Points']}
                  rows={participation.map((item) => [item.employee, item.activity, item.proof, item.approval, item.points])}
                />
              </article>
              <article className="panel">
                <p className="eyebrow">Diversity and engagement</p>
                <h2>People metrics</h2>
                <div className="stack-list">
                  {diversityMetrics.map((metric) => (
                    <span key={metric.label}>{metric.label}<b>{metric.value}%</b></span>
                  ))}
                </div>
              </article>
            </section>

            <section className="panel">
              <p className="eyebrow">CSR activity management</p>
              <h2>Company initiatives</h2>
              <DataTable
                columns={['Activity', 'Category', 'Department', 'Status', 'Participants']}
                rows={csrActivities.map((item) => [item.title, item.category, item.department, item.status, item.participants])}
              />
            </section>
          </>
        )}

        {activeView === 'governance' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Governance</p>
              <h2>Compliance issue ownership</h2>
              <div className="risk-list">
                {complianceIssues.map((issue) => (
                  <div className={`risk ${issue.status === 'Overdue' ? 'high' : issue.severity.toLowerCase()}`} key={issue.issue}>
                    <div>
                      <strong>{issue.issue}</strong>
                      <span>{issue.owner} - due {issue.due}</span>
                    </div>
                    <b>{issue.severity}</b>
                    <small>{issue.status}</small>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Policies and audits</p>
              <h2>Governance reports</h2>
              <div className="stack-list">
                {policies.map((policy) => <span key={policy.name}>{policy.name}<b>{policy.acknowledgements}%</b></span>)}
                {audits.map((audit) => <span key={audit.name}>{audit.name}<b>{audit.status}</b></span>)}
              </div>
            </article>
          </section>
        )}

        {activeView === 'gamification' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Gamification</p>
              <h2>Challenges lifecycle</h2>
              <DataTable
                columns={['Challenge', 'Category', 'XP', 'Difficulty', 'Status', 'Deadline']}
                rows={challenges.map((item) => [item.title, item.category, item.xp, item.difficulty, item.status, item.deadline])}
              />
            </article>
            <article className="panel">
              <p className="eyebrow">XP economy</p>
              <h2>Leaderboard and rewards</h2>
              <div className="stack-list">
                {leaderboard.map((item) => <span key={item.name}>{item.name}<b>{item.xp} XP</b></span>)}
                {rewards.map((item) => <span key={item.name}>{item.name}<b>{item.stock} left</b></span>)}
              </div>
            </article>
          </section>
        )}

        {activeView === 'reports' && (
          <section className="content-grid">
            <article className="panel">
              <p className="eyebrow">Custom report builder</p>
              <h2>Export PDF, Excel, or CSV</h2>
              <label>Module
                <select value={reportModule} onChange={(event) => setReportModule(event.target.value)}>
                  <option>All modules</option>
                  <option>Environmental</option>
                  <option>Social</option>
                  <option>Governance</option>
                  <option>Gamification</option>
                </select>
              </label>
              <label>Department
                <select value={reportDept} onChange={(event) => setReportDept(event.target.value)}>
                  <option>All departments</option>
                  {departments.map((dept) => <option key={dept.name}>{dept.name}</option>)}
                </select>
              </label>
              <label>Format
                <select value={reportFormat} onChange={(event) => setReportFormat(event.target.value)}>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </label>
              <button className="primary-action" type="button" onClick={generateReport}>Generate report</button>
              <p className="status-note">{reportStatus}</p>
            </article>
            <article className="panel wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Report preview</p>
                  <h2>{company.name} - {reportModule} - {reportDept}</h2>
                </div>
                <ScoreRing value={previewScore} label="score" />
              </div>
              <div className="module-grid">
                {['Environmental Report', 'Social Report', 'Governance Report', 'ESG Summary Report', 'Employee Filter', 'Challenge Filter', 'Date Range', 'ESG Category'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </section>
        )}

        {activeView === 'settings' && (
          <section className="content-grid">
            <article className="panel wide">
              <p className="eyebrow">Settings and administration</p>
              <h2>Business rules</h2>
              <div className="rule-grid">
                {businessRules.map(([name, state, description]) => (
                  <div className="rule-card" key={name}>
                    <span>{state}</span>
                    <strong>{name}</strong>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Notification settings</p>
              <h2>Enabled triggers</h2>
              <div className="stack-list">
                <span>Compliance issue raised<b>On</b></span>
                <span>Approval decisions<b>On</b></span>
                <span>Policy reminders<b>On</b></span>
                <span>Badge unlocks<b>On</b></span>
              </div>
            </article>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
