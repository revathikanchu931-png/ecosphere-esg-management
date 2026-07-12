# EcoSphere: ESG Management Platform

EcoSphere is an ESG Management Platform that helps organizations measure, manage, and improve Environmental, Social, and Governance performance from one dashboard.

## Problem

ESG reporting is often manual, disconnected from ERP operations, and hard to monitor in real time. EcoSphere connects operational data, employee participation, compliance activities, and reporting workflows.

## Core Modules

- Company Setup: enter or upload any organization profile before using the dashboard.
- Environmental: emission factors, carbon transactions, sustainability goals, and carbon reports.
- Social: CSR activities, employee participation, diversity metrics, training, and engagement.
- Governance: policies, acknowledgements, audits, compliance issues, owners, and due dates.
- Gamification: challenges, XP, badges, rewards, redemptions, and leaderboards.
- Reports: environmental, social, governance, ESG summary, and custom report builder.
- Settings: departments, categories, ESG configuration, notification settings, and business rules.

## Required Business Rules Covered

- Auto emission calculation from Purchase, Manufacturing, Expense, and Fleet records.
- Evidence requirement before CSR or challenge approval.
- Badge auto-award based on XP or completed challenge rules.
- Reward redemption with stock and point balance logic shown in the UI.
- Compliance issue ownership with due dates and overdue flagging.
- Notifications for compliance issues, approvals, policy reminders, and badge unlocks.

## Company Upload Format

EcoSphere can load any company profile from the Company Setup screen.

JSON example:

```json
{
  "name": "GreenSteel Manufacturing",
  "industry": "Manufacturing",
  "location": "Hyderabad",
  "employees": 520,
  "reportingYear": "2026",
  "logo": "https://example.com/logo.png",
  "website": "https://greensteel.example",
  "email": "sustainability@greensteel.example",
  "carbonReductionTarget": "35% by 2030",
  "netZeroTargetYear": "2045",
  "renewableEnergy": 52,
  "sustainabilityMission": "Decarbonize production while improving worker safety and supplier accountability.",
  "reportingStandard": "BRSR"
}
```

CSV example:

```csv
name,industry,location,employees,reportingYear,website,email,carbonReductionTarget,netZeroTargetYear,renewableEnergy,sustainabilityMission,reportingStandard
GreenSteel Manufacturing,Manufacturing,Hyderabad,520,2026,https://greensteel.example,sustainability@greensteel.example,35% by 2030,2045,52,Decarbonize production,BRSR
```

## Tech Stack

- React
- Vite
- CSS
- Node.js backend using built-in modules
- JSON file database for hackathon MVP persistence

## MVP Backend

The project includes a lightweight backend in `server.js`:

- Demo authentication: `POST /api/auth/login`
- User registration: `POST /api/auth/register`
- Dashboard live data: `GET /api/dashboard`
- Company profile update: `PUT /api/company`
- CRUD APIs for departments, emission factors, carbon transactions, CSR activities, compliance issues, and challenges
- ESG score calculation using Environmental 40%, Social 30%, Governance 30%
- Report endpoint: `GET /api/reports`

Users can register with any email and password from the UI. A seeded admin is also available if needed:

```json
{
  "email": "admin@ecosphere.test",
  "password": "admin123"
}
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173/`.

To run with backend APIs during development, open two terminals:

```bash
npm run api
npm run dev
```

The frontend proxies `/api` requests to `http://localhost:4000`.

## Build

```bash
npm run build
```

## Deploy With Backend

If deploying the backend MVP, use Render **Web Service**:

- Root Directory: `ecosphere/ecosphere`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

If deploying only the frontend, use Render **Static Site** with Publish Directory `dist`.
