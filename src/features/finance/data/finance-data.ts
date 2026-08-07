import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const financeKpis = [
  { label: 'Revenue', value: 9421000, hint: '+9.4% MTD' },
  { label: 'Expenses', value: 5217000, hint: '+4.1% MTD' },
  { label: 'Profit', value: 4204000, hint: '+15.2% MTD' },
  { label: 'Cash Flow', value: 1338000, hint: 'Net positive' },
  { label: 'Outstanding Receivables', value: 924000, hint: 'Above 30 days: 21%' },
  { label: 'Outstanding Payables', value: 712000, hint: 'Due this week: 18%' },
]

export const receivableRows = Array.from({ length: 14 }).map((_, i) => ({
  id: `AR-${String(i + 1).padStart(4, '0')}`,
  reference: `AR-2026-${String(i + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works'][i % 3],
  dueDate: day(i - 10),
  amount: 12000 + i * 2300,
  status: ['Pending', 'Overdue', 'Collected', 'Pending'][i % 4],
}))

export const payableRows = Array.from({ length: 14 }).map((_, i) => ({
  id: `AP-${String(i + 1).padStart(4, '0')}`,
  reference: `AP-2026-${String(i + 1).padStart(4, '0')}`,
  supplier: ['Global Industrial Source', 'Nova Parts Trading', 'Harborline Components'][i % 3],
  dueDate: day(i - 6),
  amount: 11000 + i * 2100,
  status: ['Pending', 'Overdue', 'Paid', 'Pending'][i % 4],
}))

export const expenseRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `EXP-${String(i + 1).padStart(4, '0')}`,
  reference: `EXP-2026-${String(i + 1).padStart(4, '0')}`,
  category: ['Logistics', 'Utilities', 'Salaries', 'Maintenance'][i % 4],
  approvedBy: ['Finance Manager', 'CFO', 'Controller'][i % 3],
  amount: 3000 + i * 980,
  status: ['Approved', 'Pending', 'Posted', 'Approved'][i % 4],
}))

export const bankAccountRows = [
  { id: 'BA-0001', reference: 'ACC-001', bank: 'Emirates NBD', type: 'Current', balance: 1820000, status: 'Active' },
  { id: 'BA-0002', reference: 'ACC-002', bank: 'ADCB', type: 'Current', balance: 1210000, status: 'Active' },
  { id: 'BA-0003', reference: 'ACC-003', bank: 'HSBC', type: 'Savings', balance: 690000, status: 'Active' },
]

export const bankTransactionRows = Array.from({ length: 15 }).map((_, i) => ({
  id: `BTX-${String(i + 1).padStart(4, '0')}`,
  reference: `BTX-2026-${String(i + 1).padStart(4, '0')}`,
  bank: bankAccountRows[i % bankAccountRows.length].bank,
  txnType: ['Credit', 'Debit'][i % 2],
  amount: 2800 + i * 740,
  status: ['Posted', 'Pending', 'Posted', 'Posted'][i % 4],
}))

export const journalRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `JRN-${String(i + 1).padStart(4, '0')}`,
  reference: `JRN-2026-${String(i + 1).padStart(4, '0')}`,
  date: day(i),
  account: ['Sales Revenue', 'COGS', 'VAT Payable', 'Cash'][i % 4],
  debit: 1400 + i * 300,
  credit: 1400 + i * 300,
  status: ['Posted', 'Posted', 'Draft', 'Posted'][i % 4],
}))

export const cashBookRows = Array.from({ length: 11 }).map((_, i) => ({
  id: `CSH-${String(i + 1).padStart(4, '0')}`,
  reference: `CSH-2026-${String(i + 1).padStart(4, '0')}`,
  date: day(i),
  description: ['Receipt', 'Payment', 'Refund', 'Transfer'][i % 4],
  amount: 900 + i * 260,
  status: ['Posted', 'Posted', 'Pending', 'Posted'][i % 4],
}))

export const ledgerRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `GL-${String(i + 1).padStart(4, '0')}`,
  reference: `GL-2026-${String(i + 1).padStart(4, '0')}`,
  account: ['Cash', 'AR', 'AP', 'Revenue', 'Expenses'][i % 5],
  debit: 1800 + i * 370,
  credit: 1400 + i * 320,
  balance: 400 + i * 50,
  status: ['Open', 'Posted', 'Posted', 'Open'][i % 4],
}))

export const trialBalanceRows = [
  { id: 'TB-1', account: 'Cash', debit: 1920000, credit: 0, status: 'Balanced' },
  { id: 'TB-2', account: 'Accounts Receivable', debit: 924000, credit: 0, status: 'Balanced' },
  { id: 'TB-3', account: 'Accounts Payable', debit: 0, credit: 712000, status: 'Balanced' },
  { id: 'TB-4', account: 'Revenue', debit: 0, credit: 9421000, status: 'Balanced' },
  { id: 'TB-5', account: 'Expenses', debit: 5217000, credit: 0, status: 'Balanced' },
]

export const balanceSheetRows = [
  { id: 'BS-1', section: 'Assets', account: 'Cash & Bank', amount: 3720000, status: 'Reported' },
  { id: 'BS-2', section: 'Assets', account: 'Receivables', amount: 924000, status: 'Reported' },
  { id: 'BS-3', section: 'Liabilities', account: 'Payables', amount: 712000, status: 'Reported' },
  { id: 'BS-4', section: 'Equity', account: 'Retained Earnings', amount: 3115000, status: 'Reported' },
]

export const profitLossRows = [
  { id: 'PL-1', account: 'Revenue', amount: 9421000, status: 'Reported' },
  { id: 'PL-2', account: 'COGS', amount: 3518000, status: 'Reported' },
  { id: 'PL-3', account: 'Operating Expenses', amount: 1699000, status: 'Reported' },
  { id: 'PL-4', account: 'Net Profit', amount: 4204000, status: 'Reported' },
]

export const taxSummaryRows = [
  { id: 'TX-1', reference: 'VAT-Q3', taxType: 'VAT Output', amount: 681000, status: 'Filed' },
  { id: 'TX-2', reference: 'VAT-Q3', taxType: 'VAT Input', amount: 402000, status: 'Filed' },
  { id: 'TX-3', reference: 'WHT-Aug', taxType: 'Withholding Tax', amount: 92000, status: 'Draft' },
]
