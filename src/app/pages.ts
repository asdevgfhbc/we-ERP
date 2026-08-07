import { titleToSlug } from '@/lib/utils'

export type PageKind = 'table' | 'detail' | 'form' | 'dashboard' | 'print' | 'profile'

export type ErpPage = {
  module: string
  title: string
  path: string
  kind: PageKind
}

const MODULES: Record<string, string[]> = {
  Dashboard: [
    'Dashboard Home',
    'Sales summary cards',
    'Purchase summary',
    'Inventory summary',
    'Financial summary',
    'Charts',
    'Recent activities',
    'Low stock alerts',
    'Pending deliveries',
  ],
  'Sales & Distribution': [
    'Customer List',
    'Customer Details',
    'Add/Edit Customer',
    'Sales Orders',
    'Create Sales Order',
    'Delivery Scheduling',
    'Delivery Tracking',
    'Invoice List',
    'Create Invoice',
    'View Invoice',
    'Print VAT Invoice',
  ],
  'Purchasing / Import': [
    'Supplier List',
    'Supplier Details',
    'Purchase Orders',
    'Create Purchase Order',
    'Import Documentation',
    'Shipment Tracking',
    'Customs & Duty Records',
  ],
  Warehouse: [
    'Warehouse Dashboard',
    'Stock Management',
    'Goods Receiving (GRN)',
    'Batch/Serial Number Tracking',
    'Stock Transfers',
    'Stock Adjustments',
    'Low Stock Alerts',
  ],
  Logistics: [
    'Vehicle Management',
    'Driver Management',
    'Route Planning',
    'Deliveries',
    'Delivery Status',
  ],
  'Finance & Accounting': [
    'Accounts Payable',
    'Accounts Receivable',
    'Expenses',
    'Bank Transactions',
    'Profit & Loss Reports',
  ],
  'Human Resources': [
    'Employee Records',
    'Attendance',
    'Leave Management',
    'Payroll',
  ],
  'Customer Service': [
    'Customer Complaints',
    'Returns & Replacements',
    'Warranty Claims',
  ],
  'Reports & Analytics': [
    'Sales Reports',
    'Inventory Reports',
    'Purchase Reports',
    'Financial Reports',
    'Performance Dashboards',
  ],
  Settings: [
    'Company Information',
    'Users',
    'Roles & Permissions',
    'Warehouses',
    'Branches',
    'Tax/VAT Settings',
  ],
}

function modulePrefix(moduleName: string) {
  return moduleName
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function pageKind(title: string): PageKind {
  if (title === 'Dashboard Home' || title.includes('summary') || title === 'Charts' || title === 'Recent activities') {
    return 'dashboard'
  }
  if (title.includes('Print VAT Invoice')) {
    return 'print'
  }
  if (title.includes('Details') || title.includes('View Invoice')) {
    return 'detail'
  }
  if (title.includes('Create') || title.includes('Add/Edit')) {
    return 'form'
  }
  return 'table'
}

export const authPages = [
  { title: 'Login', path: '/auth/login', kind: 'form' as const },
  { title: 'Forgot Password', path: '/auth/forgot-password', kind: 'form' as const },
  { title: 'Reset Password', path: '/auth/reset-password', kind: 'form' as const },
  { title: 'Change Password', path: '/auth/change-password', kind: 'form' as const },
]

export const erpPages: ErpPage[] = Object.entries(MODULES).flatMap(([module, titles]) => {
  return titles.map((title) => {
    const basePath = module === 'Dashboard' && title === 'Dashboard Home'
      ? 'dashboard/home'
      : `${modulePrefix(module)}/${titleToSlug(title)}`

    return {
      module,
      title,
      path: `/${basePath}`,
      kind: pageKind(title),
    }
  })
})

export const userProfilePage: ErpPage = {
  module: 'Authentication',
  title: 'User Profile',
  path: '/profile',
  kind: 'profile',
}

export const allPages = [...erpPages, userProfilePage]

export const pageTitleByPath = new Map<string, string>(
  allPages.map((page) => [page.path, page.title]),
)
