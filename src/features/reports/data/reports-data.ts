import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export type ReportMetric = { label: string; value: number; delta: string }
export type ReportPoint = { period: string; primary: number; secondary: number }
export type ReportRow = Record<string, string | number>

export type ReportBundle = {
  metrics: ReportMetric[]
  trend: ReportPoint[]
  breakdown: Array<{ name: string; value: number }>
  rows: ReportRow[]
}

function baseTrend(multiplier: number) {
  return [
    { period: 'Jan', primary: 120 * multiplier, secondary: 88 * multiplier },
    { period: 'Feb', primary: 136 * multiplier, secondary: 95 * multiplier },
    { period: 'Mar', primary: 149 * multiplier, secondary: 106 * multiplier },
    { period: 'Apr', primary: 162 * multiplier, secondary: 114 * multiplier },
    { period: 'May', primary: 178 * multiplier, secondary: 120 * multiplier },
    { period: 'Jun', primary: 191 * multiplier, secondary: 129 * multiplier },
  ]
}

function metric(label: string, value: number, delta: string) {
  return { label, value, delta }
}

function buildRows(prefix: string, type: string, multiplier: number): ReportRow[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    reference: `${prefix}-${String(i + 1).padStart(4, '0')}`,
    type,
    period: day(i),
    amount: 12000 * multiplier + i * 1400,
    status: ['Posted', 'Pending', 'Reviewed', 'Posted'][i % 4],
  }))
}

export const reportBundles: Record<string, ReportBundle> = {
  dashboard: {
    metrics: [
      metric('Total Reports Generated', 1284, '+12.4%'),
      metric('Shared with Stakeholders', 462, '+5.1%'),
      metric('Scheduled Reports', 94, '+8.0%'),
      metric('Failed Exports', 7, '-22.2%'),
    ],
    trend: baseTrend(10),
    breakdown: [
      { name: 'Sales', value: 34 },
      { name: 'Purchase', value: 23 },
      { name: 'Inventory', value: 19 },
      { name: 'Financial', value: 24 },
    ],
    rows: buildRows('RPT', 'Dashboard', 1),
  },
  sales: {
    metrics: [
      metric('Revenue', 9421000, '+9.4%'),
      metric('Orders', 2451, '+7.8%'),
      metric('Avg Order Value', 3843, '+2.1%'),
      metric('Returns', 92, '-3.5%'),
    ],
    trend: baseTrend(18),
    breakdown: [
      { name: 'Direct Sales', value: 52 },
      { name: 'Distributors', value: 28 },
      { name: 'Online', value: 20 },
    ],
    rows: buildRows('SLS', 'Sales', 2),
  },
  purchase: {
    metrics: [
      metric('Purchase Value', 6223000, '+6.7%'),
      metric('PO Count', 1240, '+5.2%'),
      metric('On-time Deliveries', 89, '+1.8%'),
      metric('Rejections', 47, '-4.2%'),
    ],
    trend: baseTrend(14),
    breakdown: [
      { name: 'Local', value: 41 },
      { name: 'Import', value: 39 },
      { name: 'Urgent', value: 20 },
    ],
    rows: buildRows('PUR', 'Purchase', 2),
  },
  inventory: {
    metrics: [
      metric('Inventory Value', 4812000, '+6.2%'),
      metric('Turns', 8, '+0.7%'),
      metric('Low Stock SKUs', 37, '-2.5%'),
      metric('Out of Stock', 9, '-10.0%'),
    ],
    trend: baseTrend(12),
    breakdown: [
      { name: 'Main WH', value: 42 },
      { name: 'Transit WH', value: 22 },
      { name: 'North WH', value: 18 },
      { name: 'South WH', value: 18 },
    ],
    rows: buildRows('INV', 'Inventory', 1),
  },
  financial: {
    metrics: [
      metric('Net Profit', 4204000, '+15.2%'),
      metric('Cash Flow', 1338000, '+8.9%'),
      metric('Receivables', 924000, '-1.3%'),
      metric('Payables', 712000, '-0.7%'),
    ],
    trend: baseTrend(16),
    breakdown: [
      { name: 'Revenue', value: 56 },
      { name: 'COGS', value: 21 },
      { name: 'Opex', value: 17 },
      { name: 'Tax', value: 6 },
    ],
    rows: buildRows('FIN', 'Financial', 2),
  },
  performance: {
    metrics: [
      metric('On-time Reports', 93, '+2.5%'),
      metric('Decision Cycle', 18, '-1.2%'),
      metric('KPI Attainment', 88, '+3.7%'),
      metric('Operational Efficiency', 91, '+2.1%'),
    ],
    trend: baseTrend(11),
    breakdown: [
      { name: 'Operations', value: 26 },
      { name: 'Sales', value: 28 },
      { name: 'Finance', value: 24 },
      { name: 'Service', value: 22 },
    ],
    rows: buildRows('PRF', 'Performance', 1),
  },
  stockAging: {
    metrics: [
      metric('0-30 Days', 3140, '+4.2%'),
      metric('31-60 Days', 920, '-1.1%'),
      metric('61-90 Days', 402, '-3.8%'),
      metric('90+ Days', 141, '-7.6%'),
    ],
    trend: baseTrend(7),
    breakdown: [
      { name: '0-30', value: 70 },
      { name: '31-60', value: 20 },
      { name: '61-90', value: 8 },
      { name: '90+', value: 2 },
    ],
    rows: buildRows('SAG', 'Stock Aging', 1),
  },
  customerAging: {
    metrics: [
      metric('Current', 612000, '+3.4%'),
      metric('30 Days', 201000, '-2.5%'),
      metric('60 Days', 76000, '-6.2%'),
      metric('90+ Days', 35000, '-8.1%'),
    ],
    trend: baseTrend(5),
    breakdown: [
      { name: 'Current', value: 66 },
      { name: '30 Days', value: 22 },
      { name: '60 Days', value: 8 },
      { name: '90+ Days', value: 4 },
    ],
    rows: buildRows('CAG', 'Customer Aging', 1),
  },
  supplierAging: {
    metrics: [
      metric('Current', 503000, '+2.1%'),
      metric('30 Days', 143000, '-1.5%'),
      metric('60 Days', 51000, '-4.8%'),
      metric('90+ Days', 15000, '-6.4%'),
    ],
    trend: baseTrend(4),
    breakdown: [
      { name: 'Current', value: 71 },
      { name: '30 Days', value: 20 },
      { name: '60 Days', value: 7 },
      { name: '90+ Days', value: 2 },
    ],
    rows: buildRows('SPA', 'Supplier Aging', 1),
  },
  revenue: {
    metrics: [
      metric('Gross Revenue', 9421000, '+9.4%'),
      metric('Net Revenue', 8862000, '+8.6%'),
      metric('Growth Rate', 9, '+1.2%'),
      metric('Target Attainment', 97, '+2.3%'),
    ],
    trend: baseTrend(19),
    breakdown: [
      { name: 'Region A', value: 34 },
      { name: 'Region B', value: 29 },
      { name: 'Region C', value: 24 },
      { name: 'Region D', value: 13 },
    ],
    rows: buildRows('REV', 'Revenue', 2),
  },
  expense: {
    metrics: [
      metric('Operating Expense', 1699000, '+3.2%'),
      metric('Admin Expense', 821000, '+1.8%'),
      metric('Logistics Expense', 713000, '+4.1%'),
      metric('Expense Ratio', 55, '-1.0%'),
    ],
    trend: baseTrend(11),
    breakdown: [
      { name: 'Admin', value: 24 },
      { name: 'Logistics', value: 32 },
      { name: 'Sales', value: 18 },
      { name: 'Other', value: 26 },
    ],
    rows: buildRows('EXP', 'Expense', 1),
  },
  cashFlow: {
    metrics: [
      metric('Operating CF', 1382000, '+8.2%'),
      metric('Investing CF', -221000, '+2.4%'),
      metric('Financing CF', 177000, '-1.7%'),
      metric('Net CF', 1338000, '+8.9%'),
    ],
    trend: baseTrend(9),
    breakdown: [
      { name: 'Operating', value: 73 },
      { name: 'Investing', value: 12 },
      { name: 'Financing', value: 15 },
    ],
    rows: buildRows('CSF', 'Cash Flow', 1),
  },
  inventoryValue: {
    metrics: [
      metric('Total Value', 4812000, '+6.2%'),
      metric('Fast Moving', 2712000, '+7.4%'),
      metric('Slow Moving', 1398000, '-1.9%'),
      metric('Obsolete', 702000, '-4.6%'),
    ],
    trend: baseTrend(13),
    breakdown: [
      { name: 'Fast', value: 56 },
      { name: 'Slow', value: 29 },
      { name: 'Obsolete', value: 15 },
    ],
    rows: buildRows('IVL', 'Inventory Value', 1),
  },
  topProducts: {
    metrics: [
      metric('Top Product Revenue', 1882000, '+11.2%'),
      metric('Top 5 Share', 43, '+2.7%'),
      metric('Units Sold', 4821, '+6.4%'),
      metric('Avg Margin', 28, '+1.1%'),
    ],
    trend: baseTrend(10),
    breakdown: [
      { name: 'Hydraulic Pump H220', value: 32 },
      { name: 'Precision Valve V18', value: 26 },
      { name: 'Seal Kit SK-44', value: 22 },
      { name: 'Filter Cartridge FC-70', value: 20 },
    ],
    rows: [
      { reference: 'PRD-0001', product: 'Hydraulic Pump H220', revenue: 812000, units: 1820, status: 'Top' },
      { reference: 'PRD-0002', product: 'Precision Valve V18', revenue: 623000, units: 1540, status: 'Top' },
      { reference: 'PRD-0003', product: 'Seal Kit SK-44', revenue: 481000, units: 1410, status: 'Top' },
      { reference: 'PRD-0004', product: 'Filter Cartridge FC-70', revenue: 392000, units: 1290, status: 'Top' },
    ],
  },
  topCustomers: {
    metrics: [
      metric('Top Customer Revenue', 1486000, '+8.9%'),
      metric('Top 5 Share', 38, '+1.6%'),
      metric('On-time Payment', 92, '+2.1%'),
      metric('Avg Order Frequency', 14, '+4.2%'),
    ],
    trend: baseTrend(8),
    breakdown: [
      { name: 'Orbit Engineering LLC', value: 31 },
      { name: 'Metro Build Systems', value: 27 },
      { name: 'Prime Energy Works', value: 24 },
      { name: 'Atlas Pump Services', value: 18 },
    ],
    rows: [
      { reference: 'CUS-0001', customer: 'Orbit Engineering LLC', revenue: 486000, orders: 41, status: 'Key' },
      { reference: 'CUS-0002', customer: 'Metro Build Systems', revenue: 391000, orders: 37, status: 'Key' },
      { reference: 'CUS-0003', customer: 'Prime Energy Works', revenue: 358000, orders: 33, status: 'Key' },
      { reference: 'CUS-0004', customer: 'Atlas Pump Services', revenue: 297000, orders: 29, status: 'Growth' },
    ],
  },
}
