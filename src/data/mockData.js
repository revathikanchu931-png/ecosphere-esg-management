export const summary = {
  overall: 82,
  environmental: 76,
  social: 88,
  governance: 79,
};

export const departmentScores = [
  { name: "HR", environmental: 70, social: 90, governance: 85 },
  { name: "Finance", environmental: 60, social: 78, governance: 92 },
  { name: "Operations", environmental: 84, social: 80, governance: 75 },
  { name: "IT", environmental: 72, social: 86, governance: 80 },
];

export const carbonTransactions = [
  { id: 1, type: "Purchase", department: "Operations", amount: 5000, factor: 0.12, emissions: 600, date: "2026-07-01" },
  { id: 2, type: "Fleet", department: "Logistics", amount: 1200, factor: 0.22, emissions: 264, date: "2026-07-02" },
  { id: 3, type: "Expense", department: "Finance", amount: 3000, factor: 0.08, emissions: 240, date: "2026-07-03" },
];

export const emissionFactors = [
  { category: "Purchase", factor: 0.12 },
  { category: "Manufacturing", factor: 0.25 },
  { category: "Expense", factor: 0.08 },
  { category: "Fleet", factor: 0.22 },
];

export const sustainabilityGoals = [
  { title: "Reduce Carbon by 20%", progress: 68 },
  { title: "Green Procurement 50%", progress: 54 },
  { title: "Energy Efficiency 30%", progress: 80 },
];

export const csrActivities = [
  { id: 1, title: "Tree Plantation Drive", category: "Environment", xp: 50, status: "Approved" },
  { id: 2, title: "Blood Donation Camp", category: "Health", xp: 70, status: "Pending" },
  { id: 3, title: "Donation Collection", category: "Community", xp: 40, status: "Approved" },
];

export const employeeParticipation = [
  { employee: "Asha", activity: "Tree Plantation Drive", proof: "photo.jpg", approval: "Approved", points: 50 },
  { employee: "Rahul", activity: "Donation Collection", proof: "receipt.pdf", approval: "Approved", points: 40 },
];

export const badges = [
  { name: "Green Starter", description: "Earn 100 XP", unlocked: true },
  { name: "CSR Hero", description: "Complete 3 CSR activities", unlocked: false },
  { name: "Eco Leader", description: "Earn 500 XP", unlocked: false },
];

export const rewards = [
  { name: "Gift Card", pointsRequired: 100, stock: 12, status: "Available" },
  { name: "Company Mug", pointsRequired: 50, stock: 5, status: "Available" },
  { name: "Lunch Coupon", pointsRequired: 80, stock: 0, status: "Out of Stock" },
];

export const policies = [
  { id: 1, title: "Code of Conduct", owner: "HR", status: "Active" },
  { id: 2, title: "Data Privacy Policy", owner: "IT", status: "Active" },
  { id: 3, title: "Anti-Bribery Policy", owner: "Legal", status: "Draft" },
];

export const audits = [
  { id: 1, name: "Internal Audit Q1", owner: "Compliance Team", status: "Completed" },
  { id: 2, name: "Vendor Audit", owner: "Procurement", status: "In Progress" },
];

export const complianceIssues = [
  { id: 1, audit: "Internal Audit Q1", severity: "High", description: "Policy missing", owner: "HR Head", dueDate: "2026-07-15", status: "Open" },
  { id: 2, audit: "Vendor Audit", severity: "Medium", description: "Incomplete documents", owner: "Procurement Lead", dueDate: "2026-07-12", status: "Overdue" },
];

export const notifications = [
  "New compliance issue raised",
  "CSR activity approved",
  "Badge unlocked: Green Starter",
  "Policy acknowledgement reminder",
];