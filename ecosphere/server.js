import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const dbDir = join(rootDir, 'data')
const dbPath = join(dbDir, 'db.json')
const distDir = join(rootDir, 'dist')
const port = Number(process.env.PORT || 4000)
const secret = process.env.JWT_SECRET || 'ecosphere-demo-secret'

const seedData = {
  users: [
    { id: 'u1', name: 'Admin User', email: 'admin@ecosphere.test', password: 'admin123', role: 'admin' },
  ],
  company: {
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
  },
  departments: [
    { id: 'd1', name: 'Operations', code: 'OPS', head: 'Nisha Rao', employees: 142, environmental: 82, social: 74, governance: 78 },
    { id: 'd2', name: 'IT', code: 'IT', head: 'Arjun Mehta', employees: 86, environmental: 76, social: 88, governance: 84 },
    { id: 'd3', name: 'HR', code: 'HR', head: 'Farah Khan', employees: 32, environmental: 68, social: 94, governance: 86 },
    { id: 'd4', name: 'Finance', code: 'FIN', head: 'Meera Iyer', employees: 41, environmental: 71, social: 80, governance: 91 },
  ],
  emissionFactors: [
    { id: 'ef1', category: 'Purchase', factor: 0.12, unit: 'kgCO2e / INR', status: 'Active' },
    { id: 'ef2', category: 'Manufacturing', factor: 0.25, unit: 'kgCO2e / unit', status: 'Active' },
    { id: 'ef3', category: 'Fleet', factor: 0.22, unit: 'kgCO2e / km', status: 'Active' },
  ],
  carbonTransactions: [
    { id: 'ct1', source: 'Fleet', department: 'Operations', amount: 1200, factor: 0.22, emissions: 264, mode: 'Auto' },
    { id: 'ct2', source: 'Purchase', department: 'Finance', amount: 5000, factor: 0.12, emissions: 600, mode: 'Auto' },
  ],
  csrActivities: [
    { id: 'csr1', title: 'Tree Plantation Drive', category: 'Environment', department: 'HR', status: 'Active', participants: 42 },
    { id: 'csr2', title: 'E-waste Collection', category: 'Community', department: 'IT', status: 'Active', participants: 35 },
  ],
  complianceIssues: [
    { id: 'ci1', issue: 'Supplier policy evidence missing', severity: 'High', owner: 'Procurement Lead', due: '2026-07-12', status: 'Overdue' },
    { id: 'ci2', issue: 'Fleet emission proof pending', severity: 'Medium', owner: 'Operations Head', due: '2026-07-18', status: 'Open' },
  ],
  challenges: [
    { id: 'ch1', title: 'No Plastic Week', category: 'Lifestyle', xp: 120, difficulty: 'Easy', status: 'Active', deadline: 'Jul 20' },
    { id: 'ch2', title: 'Energy Saver Sprint', category: 'Environment', xp: 180, difficulty: 'Medium', status: 'Under Review', deadline: 'Jul 24' },
  ],
}

const collections = new Set([
  'departments',
  'emissionFactors',
  'carbonTransactions',
  'csrActivities',
  'complianceIssues',
  'challenges',
])

function ensureDb() {
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir)
  }

  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, JSON.stringify(seedData, null, 2))
  }
}

function readDb() {
  ensureDb()
  return JSON.parse(readFileSync(dbPath, 'utf8'))
}

function writeDb(db) {
  writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })
  })
}

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${signature}`
}

function verifyToken(token) {
  const [header, body, signature] = token.split('.')
  if (!header || !body || !signature) {
    return null
  }

  const expected = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)

  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null
  }

  return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
}

function requireAuth(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  const user = token ? verifyToken(token) : null

  if (!user) {
    json(res, 401, { error: 'Authentication required' })
    return null
  }

  return user
}

function calculateScores(departments) {
  const scoredDepartments = departments.map((dept) => ({
    ...dept,
    total: Math.round((dept.environmental * 0.4) + (dept.social * 0.3) + (dept.governance * 0.3)),
  }))
  const overall = Math.round(scoredDepartments.reduce((sum, dept) => sum + dept.total, 0) / scoredDepartments.length)

  return { departments: scoredDepartments, overall }
}

function serveStatic(req, res) {
  const cleanPath = req.url === '/' ? '/index.html' : req.url.split('?')[0]
  const filePath = join(distDir, cleanPath)
  const fallbackPath = join(distDir, 'index.html')
  const target = existsSync(filePath) ? filePath : fallbackPath
  const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  }

  res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream' })
  res.end(readFileSync(target))
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const db = readDb()

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    const body = await parseBody(req)
    const email = String(body.email || '').trim().toLowerCase()
    const user = db.users.find((item) => item.email === email && item.password === body.password)

    if (!user) {
      json(res, 401, { error: 'Invalid email or password' })
      return
    }

    json(res, 200, {
      token: signToken({ id: user.id, email: user.email, role: user.role }),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/register') {
    const body = await parseBody(req)
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    const name = String(body.name || '').trim()

    if (!name || !email || password.length < 6) {
      json(res, 400, { error: 'Name, email, and a password with at least 6 characters are required' })
      return
    }

    if (db.users.some((item) => item.email === email)) {
      json(res, 409, { error: 'An account with this email already exists' })
      return
    }

    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      role: body.role || 'manager',
    }

    db.users.push(user)
    writeDb(db)

    json(res, 201, {
      token: signToken({ id: user.id, email: user.email, role: user.role }),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/dashboard') {
    const scores = calculateScores(db.departments)
    json(res, 200, {
      company: db.company,
      departments: scores.departments,
      overallScore: scores.overall,
      carbonTracked: db.carbonTransactions.reduce((sum, item) => sum + Number(item.emissions || 0), 0),
      csrParticipation: db.csrActivities.reduce((sum, item) => sum + Number(item.participants || 0), 0),
      openIssues: db.complianceIssues.filter((item) => item.status !== 'Closed').length,
    })
    return
  }

  if (req.method === 'PUT' && url.pathname === '/api/company') {
    if (!requireAuth(req, res)) return
    db.company = { ...db.company, ...(await parseBody(req)) }
    writeDb(db)
    json(res, 200, db.company)
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/reports') {
    const scores = calculateScores(db.departments)
    json(res, 200, {
      company: db.company.name,
      module: url.searchParams.get('module') || 'All modules',
      department: url.searchParams.get('department') || 'All departments',
      format: url.searchParams.get('format') || 'PDF',
      overallScore: scores.overall,
      generatedAt: new Date().toISOString(),
      sections: ['Environmental Report', 'Social Report', 'Governance Report', 'ESG Summary Report'],
    })
    return
  }

  const [, api, collection, id] = url.pathname.split('/')

  if (api === 'api' && collections.has(collection)) {
    if (req.method === 'GET') {
      json(res, 200, db[collection])
      return
    }

    if (!requireAuth(req, res)) return

    if (req.method === 'POST') {
      const item = { id: randomUUID(), ...(await parseBody(req)) }
      db[collection].push(item)
      writeDb(db)
      json(res, 201, item)
      return
    }

    if (req.method === 'PUT' && id) {
      const body = await parseBody(req)
      db[collection] = db[collection].map((item) => item.id === id ? { ...item, ...body } : item)
      writeDb(db)
      json(res, 200, db[collection].find((item) => item.id === id))
      return
    }

    if (req.method === 'DELETE' && id) {
      db[collection] = db[collection].filter((item) => item.id !== id)
      writeDb(db)
      json(res, 200, { ok: true })
      return
    }
  }

  json(res, 404, { error: 'Not found' })
}

createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res).catch((error) => {
      json(res, 500, { error: error.message })
    })
    return
  }

  serveStatic(req, res)
}).listen(port, () => {
  console.log(`EcoSphere server running on http://localhost:${port}`)
})
