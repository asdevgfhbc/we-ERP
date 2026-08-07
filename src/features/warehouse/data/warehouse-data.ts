import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const warehouseKpis = [
  { label: 'Inventory Value', value: 4812000, hint: '+6.2% vs last month' },
  { label: 'Low Stock', value: 37, hint: '12 critical items' },
  { label: 'Out of Stock', value: 9, hint: '3 blocked orders' },
  { label: 'Recent Goods Receiving', value: 24, hint: 'Last 7 days' },
  { label: 'Recent Transfers', value: 18, hint: 'Inter-warehouse moves' },
]

export const inventoryTrend = [
  { month: 'Jan', value: 3410000, inQty: 1240, outQty: 1110 },
  { month: 'Feb', value: 3520000, inQty: 1330, outQty: 1204 },
  { month: 'Mar', value: 3650000, inQty: 1405, outQty: 1290 },
  { month: 'Apr', value: 3890000, inQty: 1488, outQty: 1362 },
  { month: 'May', value: 4170000, inQty: 1604, outQty: 1427 },
  { month: 'Jun', value: 4430000, inQty: 1720, outQty: 1538 },
]

export const stockByWarehouse = [
  { warehouse: 'Main Warehouse', value: 1920000 },
  { warehouse: 'Transit Warehouse', value: 1080000 },
  { warehouse: 'North Warehouse', value: 860000 },
  { warehouse: 'South Warehouse', value: 952000 },
]

export const warehouseActivities = [
  'GRN-2026-0102 posted with 42 accepted items and 2 rejected items',
  'Stock transfer TRF-2026-0066 dispatched from Main to North Warehouse',
  'Cycle count CYC-2026-0015 completed with 1.8% variance',
  'Low stock alert triggered for Precision Valve V18 in Transit Warehouse',
]

export const stockRows = Array.from({ length: 18 }).map((_, index) => ({
  id: `STK-${String(index + 1).padStart(4, '0')}`,
  sku: `SKU-${String(5000 + index)}`,
  product: ['Hydraulic Pump H220', 'Precision Valve V18', 'Seal Kit SK-44', 'Filter Cartridge FC-70'][index % 4],
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index % 4],
  bin: ['A-12', 'B-04', 'C-18', 'D-22'][index % 4],
  rack: ['R-01', 'R-03', 'R-06', 'R-08'][index % 4],
  onHand: 80 + index * 6,
  reserved: 8 + (index % 7),
  status: ['Available', 'Low Stock', 'Available', 'Out of Stock'][index % 4],
}))

export const stockLedgerRows = Array.from({ length: 16 }).map((_, index) => ({
  id: `LED-${String(index + 1).padStart(4, '0')}`,
  reference: `LED-2026-${String(index + 1).padStart(4, '0')}`,
  product: stockRows[index % stockRows.length].product,
  txnType: ['GRN', 'Transfer Out', 'Transfer In', 'Adjustment'][index % 4],
  qty: 5 + index * 2,
  balance: 240 + index * 3,
  date: day(index),
  status: ['Posted', 'Posted', 'Pending', 'Posted'][index % 4],
}))

export const grnRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `GRN-${String(index + 1).padStart(4, '0')}`,
  number: `GRN-2026-${String(index + 1).padStart(4, '0')}`,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse'][index % 3],
  pendingItems: 1 + (index % 4),
  rejectedItems: index % 3,
  receivedQuantity: 24 + index * 3,
  batchNumbers: `B-${String(740 + index).padStart(4, '0')}`,
  serialNumbers: `S-${String(9600 + index).padStart(5, '0')}`,
  inspectionStatus: ['Pending', 'Passed', 'Rejected', 'Passed'][index % 4],
  status: ['Pending', 'Completed', 'Inspection', 'Completed'][index % 4],
}))

export const movementRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `MOV-${String(index + 1).padStart(4, '0')}`,
  reference: `MOV-2026-${String(index + 1).padStart(4, '0')}`,
  product: stockRows[index % stockRows.length].product,
  from: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index % 4],
  to: ['Transit Warehouse', 'North Warehouse', 'South Warehouse', 'Main Warehouse'][index % 4],
  qty: 10 + index,
  date: day(index),
  status: ['Completed', 'Pending', 'Completed', 'In Transit'][index % 4],
}))

export const batchRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `BAT-${String(index + 1).padStart(4, '0')}`,
  batchNo: `BAT-${String(3000 + index)}`,
  product: stockRows[index % stockRows.length].product,
  warehouse: stockRows[index % stockRows.length].warehouse,
  expiry: day(-(index + 60)),
  qty: 20 + index * 4,
  status: ['Active', 'Near Expiry', 'Active', 'Hold'][index % 4],
}))

export const serialRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `SER-${String(index + 1).padStart(4, '0')}`,
  serialNo: `SER-${String(88000 + index)}`,
  product: stockRows[index % stockRows.length].product,
  warehouse: stockRows[index % stockRows.length].warehouse,
  status: ['Available', 'Allocated', 'Under Inspection', 'Available'][index % 4],
}))

export const transferRows = Array.from({ length: 11 }).map((_, index) => ({
  id: `TRF-${String(index + 1).padStart(4, '0')}`,
  reference: `TRF-2026-${String(index + 1).padStart(4, '0')}`,
  from: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index % 4],
  to: ['Transit Warehouse', 'North Warehouse', 'South Warehouse', 'Main Warehouse'][index % 4],
  qty: 14 + index * 2,
  date: day(index),
  status: ['Pending', 'Approved', 'In Transit', 'Completed'][index % 4],
}))

export const adjustmentRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `ADJ-${String(index + 1).padStart(4, '0')}`,
  reference: `ADJ-2026-${String(index + 1).padStart(4, '0')}`,
  reason: ['Damage', 'Count Variance', 'Expiry', 'Misplacement'][index % 4],
  qty: 3 + index,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse'][index % 3],
  date: day(index),
  status: ['Pending', 'Approved', 'Posted', 'Approved'][index % 4],
}))

export const auditRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `AUD-${String(index + 1).padStart(4, '0')}`,
  reference: `AUD-2026-${String(index + 1).padStart(4, '0')}`,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse'][index % 3],
  auditor: ['M. Rahman', 'A. Patel', 'S. Omar'][index % 3],
  variance: 1.2 + index * 0.3,
  status: ['Open', 'Closed', 'Open', 'Closed'][index % 4],
}))

export const cycleCountRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `CYC-${String(index + 1).padStart(4, '0')}`,
  reference: `CYC-2026-${String(index + 1).padStart(4, '0')}`,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse'][index % 3],
  zone: ['Zone A', 'Zone B', 'Zone C'][index % 3],
  countedBy: ['J. Noor', 'P. Khan', 'R. Issa'][index % 3],
  status: ['Planned', 'In Progress', 'Completed', 'Completed'][index % 4],
}))

export const lowStockRows = stockRows.filter((row) => row.status === 'Low Stock' || row.status === 'Out of Stock').map((row) => ({
  id: `LOW-${row.id}`,
  sku: row.sku,
  product: row.product,
  warehouse: row.warehouse,
  onHand: row.onHand,
  reorder: 60,
  status: row.status,
}))

export const binLocationRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `BIN-${String(index + 1).padStart(4, '0')}`,
  code: `BIN-${String(100 + index)}`,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index % 4],
  rack: ['R-01', 'R-02', 'R-03', 'R-04'][index % 4],
  capacity: 120 + index * 8,
  utilization: 40 + index * 3,
  status: ['Active', 'Active', 'Maintenance', 'Active'][index % 4],
}))

export const rackRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `RCK-${String(index + 1).padStart(4, '0')}`,
  code: `RCK-${String(210 + index)}`,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index % 4],
  levels: 4 + (index % 3),
  capacity: 280 + index * 12,
  status: ['Active', 'Inspection', 'Active', 'Active'][index % 4],
}))

export const warehouseDetailRows = Array.from({ length: 4 }).map((_, index) => ({
  id: `WHS-${String(index + 1).padStart(4, '0')}`,
  code: `WHS-${String(11 + index).padStart(3, '0')}`,
  name: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse', 'South Warehouse'][index],
  manager: ['I. Kareem', 'A. Nasser', 'F. Malik', 'D. Saeed'][index],
  capacity: 4800 + index * 600,
  utilization: 71 + index * 4,
  status: ['Active', 'Active', 'Active', 'Maintenance'][index],
}))

export function warehouseTimeline(id: string) {
  const row = warehouseDetailRows.find((item) => item.id === id) ?? warehouseDetailRows[0]
  return {
    ...row,
    timeline: [
      `${row.name} cycle count planned for ${day(-3)}`,
      `${row.name} received inbound shipment on ${day(2)}`,
      `${row.name} transfer dispatched on ${day(1)}`,
      `${row.name} maintenance review scheduled for ${day(-5)}`,
    ],
  }
}
