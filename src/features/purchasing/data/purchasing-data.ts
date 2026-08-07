import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const purchasingKpis = [
  { label: "Today's Purchases", value: 142300, hint: '+9.8% vs yesterday' },
  { label: 'Monthly Purchases', value: 2247000, hint: '+7.1% vs last month' },
  { label: 'Pending Purchase Orders', value: 28, hint: '11 waiting approval' },
  { label: 'Pending Shipments', value: 13, hint: '4 delayed at origin' },
  { label: 'Pending GRNs', value: 9, hint: '3 require inspection' },
  { label: 'Outstanding Supplier Payments', value: 738000, hint: '18 invoices overdue' },
]

export const purchaseTrend = [
  { month: 'Jan', amount: 278000, orders: 94 },
  { month: 'Feb', amount: 302000, orders: 99 },
  { month: 'Mar', amount: 326000, orders: 108 },
  { month: 'Apr', amount: 352000, orders: 117 },
  { month: 'May', amount: 387000, orders: 124 },
  { month: 'Jun', amount: 412000, orders: 131 },
]

export const recentPurchaseActivities = [
  'PO-2026-0098 approved by Procurement Manager',
  'Shipment SHP-2026-0037 reached transshipment hub',
  'GRN-2026-0056 flagged for quality inspection',
  'Supplier payment PAY-2026-0214 posted and reconciled',
]

export const topSuppliers = [
  { name: 'Global Industrial Source', value: 618000, leadTime: '12 days', rating: 4.7 },
  { name: 'Nova Parts Trading', value: 532000, leadTime: '15 days', rating: 4.5 },
  { name: 'Harborline Components', value: 487000, leadTime: '18 days', rating: 4.2 },
  { name: 'Delta Machinery Imports', value: 421000, leadTime: '20 days', rating: 4.1 },
]

export const purchaseOrderRows = Array.from({ length: 16 }).map((_, index) => ({
  id: `PO-${String(index + 1).padStart(4, '0')}`,
  number: `PO-2026-${String(index + 1).padStart(4, '0')}`,
  supplier: topSuppliers[index % topSuppliers.length].name,
  date: day(index),
  amount: 28000 + index * 3900,
  approvalStatus: ['Pending', 'Approved', 'Rejected', 'Approved'][index % 4],
  status: ['Pending', 'Approved', 'In Transit', 'Completed'][index % 4],
}))

export const grnRows = Array.from({ length: 14 }).map((_, index) => ({
  id: `GRN-${String(index + 1).padStart(4, '0')}`,
  number: `GRN-2026-${String(index + 1).padStart(4, '0')}`,
  supplier: topSuppliers[index % topSuppliers.length].name,
  warehouse: ['Main Warehouse', 'Transit Warehouse', 'North Warehouse'][index % 3],
  pendingItems: 1 + (index % 5),
  rejectedItems: index % 3,
  receivedQuantity: 40 + index * 3,
  batchNumbers: `B-${String(700 + index).padStart(4, '0')}`,
  serialNumbers: `S-${String(9000 + index).padStart(5, '0')}`,
  inspectionStatus: ['Pending', 'Passed', 'Rejected', 'Passed'][index % 4],
  status: ['Pending', 'Completed', 'Inspection', 'Completed'][index % 4],
}))

export const supplierPaymentRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `SPY-${String(index + 1).padStart(4, '0')}`,
  reference: `SPY-2026-${String(index + 1).padStart(4, '0')}`,
  supplier: topSuppliers[index % topSuppliers.length].name,
  method: ['Bank Transfer', 'LC', 'Cheque', 'SWIFT'][index % 4],
  invoice: `INV-SUP-${String(index + 101).padStart(4, '0')}`,
  date: day(index),
  amount: 12000 + index * 2100,
  status: ['Pending', 'Approved', 'Completed', 'Overdue'][index % 4],
}))

export const purchaseReturnRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `PRT-${String(index + 1).padStart(4, '0')}`,
  reference: `PRT-2026-${String(index + 1).padStart(4, '0')}`,
  supplier: topSuppliers[index % topSuppliers.length].name,
  reason: ['Damaged packing', 'Wrong specification', 'Excess quantity', 'Expired batch'][index % 4],
  date: day(index),
  amount: 3600 + index * 1100,
  status: ['Pending', 'Approved', 'Completed', 'Pending'][index % 4],
}))

export const importDocumentRows = Array.from({ length: 11 }).map((_, index) => ({
  id: `DOC-${String(index + 1).padStart(4, '0')}`,
  reference: `DOC-2026-${String(index + 1).padStart(4, '0')}`,
  container: `CONT-${String(index + 4001)}`,
  documentType: ['Bill of Lading', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Insurance Documents'][index % 5],
  shipment: `SHP-2026-${String(index + 1).padStart(4, '0')}`,
  status: ['Verified', 'Pending', 'Submitted', 'Pending'][index % 4],
}))

export const shipmentRows = Array.from({ length: 12 }).map((_, index) => ({
  id: `SHP-${String(index + 1).padStart(4, '0')}`,
  reference: `SHP-2026-${String(index + 1).padStart(4, '0')}`,
  containerNumber: `CONT-${String(index + 4301)}`,
  shippingLine: ['Maersk', 'MSC', 'CMA CGM', 'Hapag-Lloyd'][index % 4],
  etd: day(index + 4),
  eta: day(index - 8),
  status: ['In Transit', 'At Port', 'Customs', 'Delivered'][index % 4],
}))

export const customsDutyRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `CUS-${String(index + 1).padStart(4, '0')}`,
  reference: `CUS-2026-${String(index + 1).padStart(4, '0')}`,
  shipment: `SHP-2026-${String(index + 1).padStart(4, '0')}`,
  broker: ['Alpine Brokers', 'Transit Gulf', 'PortClear Agency'][index % 3],
  dutyAmount: 5200 + index * 800,
  vat: 780 + index * 120,
  taxes: 430 + index * 80,
  status: ['Pending', 'Cleared', 'Pending', 'Submitted'][index % 4],
}))

export const supplierPerformanceRows = topSuppliers.map((supplier, index) => ({
  id: `SPR-${String(index + 1).padStart(4, '0')}`,
  supplier: supplier.name,
  purchaseValue: supplier.value,
  deliveryPerformance: `${92 - index * 4}%`,
  qualityRating: `${supplier.rating}/5`,
  leadTime: supplier.leadTime,
  outstandingBalance: 90000 + index * 13000,
  status: ['Excellent', 'Good', 'Average', 'Average'][index],
}))

export function purchaseOrderDetail(id: string) {
  const row = purchaseOrderRows.find((item) => item.id === id) ?? purchaseOrderRows[0]
  const items = [
    { item: 'Hydraulic Pump H220', qty: 22, unitPrice: 6800 },
    { item: 'Valve Assembly V18', qty: 18, unitPrice: 4200 },
    { item: 'Filter Cartridge FC-70', qty: 40, unitPrice: 620 },
  ]
  const subtotal = items.reduce((sum, line) => sum + line.qty * line.unitPrice, 0)
  const discount = subtotal * 0.03
  const taxes = (subtotal - discount) * 0.08

  return {
    ...row,
    supplierInformation: {
      contact: 'procurement@globalindustrial.com',
      phone: '+971-4-555-1001',
      paymentTerms: '45 Days',
    },
    shipmentInformation: {
      containerNumber: 'CONT-4309',
      eta: day(-6),
      etd: day(6),
      shippingLine: 'Maersk',
      currentStatus: 'In Transit',
    },
    paymentInformation: {
      outstandingBalance: 148000,
      paidAmount: 76000,
      invoiceReference: 'INV-SUP-0144',
      paymentMethod: 'Bank Transfer',
    },
    attachments: ['commercial-invoice.pdf', 'packing-list.pdf', 'insurance-certificate.pdf'],
    approvalHistory: ['Drafted by Buyer on ' + day(6), 'Approved by Procurement Manager on ' + day(5), 'Confirmed by Finance on ' + day(4)],
    activityTimeline: ['Purchase Order', 'Approval', 'Shipment', 'Goods Receiving (GRN)', 'Supplier Invoice', 'Supplier Payment'],
    items,
    subtotal,
    discount,
    taxes,
    grandTotal: subtotal - discount + taxes,
  }
}

export function shipmentTimeline(id: string) {
  const row = shipmentRows.find((item) => item.id === id) ?? shipmentRows[0]
  return {
    ...row,
    timeline: [
      { title: 'Booking Confirmed', date: day(10), status: 'Completed' },
      { title: 'Loaded on Vessel', date: day(8), status: 'Completed' },
      { title: 'Departed Origin Port', date: day(7), status: 'Completed' },
      { title: 'Arrived Destination Port', date: day(-2), status: 'Pending' },
      { title: 'Delivered to Warehouse', date: day(-5), status: 'Pending' },
    ],
  }
}
