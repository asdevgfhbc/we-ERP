import { addDays, format } from 'date-fns'

export type RecordRow = {
  id: string
  name: string
  reference: string
  status: 'Active' | 'Pending' | 'Approved' | 'Rejected' | 'In Transit' | 'Completed'
  amount: number
  date: string
}

const statuses: RecordRow['status'][] = [
  'Active',
  'Pending',
  'Approved',
  'Rejected',
  'In Transit',
  'Completed',
]

export function generateRows(pageTitle: string, count = 14): RecordRow[] {
  return Array.from({ length: count }).map((_, index) => {
    const day = addDays(new Date(), -index)
    return {
      id: `${pageTitle.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(4, '0')}`,
      name: `${pageTitle} Item ${index + 1}`,
      reference: `REF-${10000 + index}`,
      status: statuses[index % statuses.length],
      amount: 1200 + index * 180,
      date: format(day, 'yyyy-MM-dd'),
    }
  })
}

export const dashboardStats = [
  { title: 'Net Sales', value: 1842000, trend: '+12.5%' },
  { title: 'Purchases', value: 931000, trend: '+4.1%' },
  { title: 'Inventory Value', value: 1425000, trend: '-1.3%' },
  { title: 'Operating Profit', value: 487000, trend: '+8.9%' },
]

export const monthlyPerformance = [
  { month: 'Jan', sales: 120000, purchase: 89000, margin: 24000 },
  { month: 'Feb', sales: 132000, purchase: 93000, margin: 27000 },
  { month: 'Mar', sales: 141000, purchase: 95000, margin: 31000 },
  { month: 'Apr', sales: 151000, purchase: 103000, margin: 33000 },
  { month: 'May', sales: 164000, purchase: 111000, margin: 39000 },
  { month: 'Jun', sales: 176000, purchase: 118000, margin: 43000 },
]

export const lowStockAlerts = [
  { sku: 'SKU-10011', product: 'Industrial Valve Assembly', qty: 8, min: 20 },
  { sku: 'SKU-10027', product: 'Hydraulic Seal Kit', qty: 4, min: 12 },
  { sku: 'SKU-10053', product: 'Bearing Pack 6205', qty: 11, min: 25 },
]

export const notifications = [
  '3 invoices are pending approval',
  'Low stock alert triggered in Main Warehouse',
  'Two deliveries delayed due to customs checks',
]
