import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const customerServiceKpis = [
  { label: 'Open Tickets', value: 46, hint: '11 high priority' },
  { label: 'Pending Returns', value: 19, hint: '7 awaiting pickup' },
  { label: 'Warranty Cases', value: 27, hint: '5 expiring this month' },
  { label: 'SLA Status', value: '93% On Time', hint: 'Improved by 3.2%' },
]

export const complaintRows = Array.from({ length: 14 }).map((_, i) => ({
  id: `CMP-${String(i + 1).padStart(4, '0')}`,
  reference: `CMP-2026-${String(i + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works'][i % 3],
  category: ['Late Delivery', 'Wrong Item', 'Damaged Goods', 'Billing Issue'][i % 4],
  status: ['Open', 'In Progress', 'Resolved', 'Open'][i % 4],
}))

export const returnRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `RTN-${String(i + 1).padStart(4, '0')}`,
  reference: `RTN-2026-${String(i + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works'][i % 3],
  reason: ['Damaged', 'Incorrect Item', 'Over Supply'][i % 3],
  status: ['Pending', 'Approved', 'Received', 'Pending'][i % 4],
}))

export const warrantyRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `WAR-${String(i + 1).padStart(4, '0')}`,
  reference: `WAR-2026-${String(i + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works'][i % 3],
  product: ['Hydraulic Pump H220', 'Precision Valve V18', 'Seal Kit SK-44'][i % 3],
  status: ['Open', 'Under Review', 'Approved', 'Closed'][i % 4],
}))

export const serviceRequestRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `SRV-${String(i + 1).padStart(4, '0')}`,
  reference: `SRV-2026-${String(i + 1).padStart(4, '0')}`,
  customer: ['Orbit Engineering LLC', 'Metro Build Systems', 'Prime Energy Works'][i % 3],
  serviceType: ['Installation', 'Inspection', 'Repair', 'Calibration'][i % 4],
  date: day(i),
  status: ['Scheduled', 'Completed', 'Pending', 'Completed'][i % 4],
}))

export function complaintDetail(id: string) {
  const row = complaintRows.find((item) => item.id === id) ?? complaintRows[0]
  return {
    ...row,
    timeline: [
      `${row.reference} created by customer support`,
      'Assigned to quality assurance specialist',
      'Root cause identified and corrective action initiated',
      'Customer follow-up scheduled',
    ],
  }
}

export function customerTimeline(id: string) {
  const row = complaintRows.find((item) => item.id === id) ?? complaintRows[0]
  return {
    customer: row.customer,
    timeline: [
      `Sales order confirmed on ${day(18)}`,
      `Delivery completed on ${day(12)}`,
      `Complaint ${row.reference} opened on ${day(10)}`,
      `Warranty case linked on ${day(7)}`,
      `Service request scheduled on ${day(3)}`,
    ],
  }
}
