import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const salesDashboardKpis = [
  { label: "Today's Sales", value: 184200, hint: '+12.6% vs yesterday' },
  { label: 'Monthly Sales', value: 2846000, hint: '+8.2% vs last month' },
  { label: 'Pending Orders', value: 42, hint: '8 high priority orders' },
  { label: 'Pending Deliveries', value: 17, hint: '5 due in 24 hours' },
  { label: 'Outstanding Payments', value: 641000, hint: '14 invoices above aging threshold' },
]

export const salesRevenueTrend = [
  { month: 'Jan', revenue: 320000, orders: 112, expenses: 188000 },
  { month: 'Feb', revenue: 365000, orders: 124, expenses: 204000 },
  { month: 'Mar', revenue: 392000, orders: 130, expenses: 211000 },
  { month: 'Apr', revenue: 415000, orders: 142, expenses: 225000 },
  { month: 'May', revenue: 436000, orders: 148, expenses: 237000 },
  { month: 'Jun', revenue: 462000, orders: 157, expenses: 244000 },
]

export const topSalesCustomers = [
  { name: 'Orbit Engineering LLC', value: 486000 },
  { name: 'Metro Build Systems', value: 391000 },
  { name: 'Prime Energy Works', value: 358000 },
  { name: 'Atlas Pump Services', value: 297000 },
]

export const topSalesProducts = [
  { name: 'Hydraulic Pump H220', units: 182 },
  { name: 'Precision Valve V18', units: 154 },
  { name: 'Seal Kit SK-44', units: 141 },
  { name: 'Filter Cartridge FC-70', units: 129 },
]

export const salesActivities = [
  'Invoice INV-2026-0142 printed and emailed to Orbit Engineering LLC',
  'Delivery DLV-2026-0087 rescheduled due to route congestion',
  'Sales order SO-2026-0194 approved and moved to picking',
  'Customer payment PAY-2026-0443 allocated to three invoices',
]

export const quotationRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `QTN-${String(index + 1).padStart(4, '0')}`,
  number: `QTN-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  date: day(index),
  validity: `${7 + (index % 10)} days`,
  amount: 22000 + index * 3600,
  status: ['Approved', 'Pending', 'Draft', 'Completed'][index % 4],
}))

export const salesOrderRows = Array.from({ length: 16 }).map((_, index) => ({
  id: `SO-${String(index + 1).padStart(4, '0')}`,
  number: `SO-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  date: day(index),
  amount: 34000 + index * 4200,
  deliveryStatus: ['Scheduled', 'Picking', 'In Transit', 'Delivered'][index % 4],
  status: ['Approved', 'Pending', 'In Transit', 'Completed'][index % 4],
}))

export const deliveryRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `DLV-${String(index + 1).padStart(4, '0')}`,
  number: `DLV-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  route: ['Route A', 'Route B', 'Route C', 'Route D'][index % 4],
  eta: day(-index + 2),
  status: ['In Transit', 'Scheduled', 'Completed', 'Pending'][index % 4],
}))

export const invoiceRows = Array.from({ length: 15 }).map((_, index) => ({
  id: `INV-${String(index + 1).padStart(4, '0')}`,
  number: `INV-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  date: day(index),
  dueDate: day(index - 9),
  amount: 28000 + index * 3900,
  discount: 1200 + index * 110,
  vat: 0.15,
  status: ['Approved', 'Pending', 'Completed', 'Overdue'][index % 4],
}))

export const customerPaymentRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `PAY-${String(index + 1).padStart(4, '0')}`,
  reference: `PAY-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  method: ['Bank Transfer', 'Cheque', 'Cash', 'Card'][index % 4],
  date: day(index),
  amount: 9000 + index * 1400,
  status: ['Completed', 'Approved', 'Pending', 'Completed'][index % 4],
}))

export const salesReturnRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `RET-${String(index + 1).padStart(4, '0')}`,
  reference: `RET-2026-${String(index + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works', 'Atlas Pump Services'][index % 4],
  reason: ['Damaged', 'Incorrect Item', 'Excess Supply', 'Late Delivery'][index % 4],
  date: day(index),
  amount: 3200 + index * 950,
  status: ['Pending', 'Approved', 'Completed', 'Pending'][index % 4],
}))

export function quotationDetail(id: string) {
  const row = quotationRows.find((item) => item.id === id) ?? quotationRows[0]
  return {
    ...row,
    revisionHistory: [
      `${row.number} revised pricing by +2.1% on ${day(2)}`,
      `${row.number} payment terms updated to 30 days on ${day(4)}`,
      `${row.number} approved by Sales Manager on ${day(5)}`,
    ],
  }
}

export function salesOrderDetail(id: string) {
  const row = salesOrderRows.find((item) => item.id === id) ?? salesOrderRows[0]
  return {
    ...row,
    items: [
      { name: 'Hydraulic Pump H220', qty: 12, unitPrice: 8200 },
      { name: 'Precision Valve V18', qty: 9, unitPrice: 5400 },
      { name: 'Seal Kit SK-44', qty: 20, unitPrice: 920 },
    ],
  }
}

export function invoiceDetail(id: string) {
  const row = invoiceRows.find((item) => item.id === id) ?? invoiceRows[0]
  const items = [
    { name: 'Hydraulic Pump H220', qty: 10, unitPrice: 8200 },
    { name: 'Precision Valve V18', qty: 8, unitPrice: 5400 },
    { name: 'Filter Cartridge FC-70', qty: 18, unitPrice: 750 },
  ]
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const discount = row.discount
  const taxable = subtotal - discount
  const vatValue = taxable * row.vat
  const grandTotal = taxable + vatValue

  return {
    ...row,
    items,
    subtotal,
    discount,
    taxable,
    vatValue,
    grandTotal,
  }
}
