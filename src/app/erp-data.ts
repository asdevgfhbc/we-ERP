import { format } from 'date-fns'

export type PageKind = 'table' | 'detail' | 'form' | 'dashboard' | 'print' | 'profile' | 'report'

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'file' | 'image' | 'password'

export type TableColumn = {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  hiddenOnMobile?: boolean
}

export type FormField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[]
  placeholder?: string
}

export type PageDefinition = {
  module: string
  title: string
  path: string
  kind: PageKind
  entity: string
  subtitle: string
  columns: TableColumn[]
  formFields: FormField[]
}

type CatalogItem = {
  module: string
  title: string
  kind: PageKind
  entity: string
  subtitle: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function moduleSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const MASTER_COLUMNS: Record<string, TableColumn[]> = {
  product: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'brand', label: 'Brand', sortable: true },
    { key: 'unit', label: 'Unit', sortable: true },
    { key: 'stock', label: 'Stock', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  category: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Category Name', sortable: true },
    { key: 'products', label: 'Products', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  brand: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Brand', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  unit: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Unit', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  customer: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Customer Name', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City', sortable: true },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  supplier: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Supplier Name', sortable: true },
    { key: 'contact', label: 'Contact' },
    { key: 'terms', label: 'Terms' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  warehouse: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Warehouse', sortable: true },
    { key: 'branch', label: 'Branch', sortable: true },
    { key: 'capacity', label: 'Capacity', sortable: true, align: 'right' },
    { key: 'utilization', label: 'Utilization', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'sales-order': [
    { key: 'number', label: 'Order No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'deliveryStatus', label: 'Delivery', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  quotation: [
    { key: 'number', label: 'Quote No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'validity', label: 'Validity' },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  invoice: [
    { key: 'number', label: 'Invoice No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'paid', label: 'Paid', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  payment: [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'party', label: 'Customer / Supplier', sortable: true },
    { key: 'method', label: 'Method' },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  return: [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'party', label: 'Customer / Supplier', sortable: true },
    { key: 'reason', label: 'Reason' },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  delivery: [
    { key: 'number', label: 'Delivery No', sortable: true },
    { key: 'party', label: 'Customer', sortable: true },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'eta', label: 'ETA', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'purchase-order': [
    { key: 'number', label: 'PO No', sortable: true },
    { key: 'supplier', label: 'Supplier', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  grn: [
    { key: 'number', label: 'GRN No', sortable: true },
    { key: 'supplier', label: 'Supplier', sortable: true },
    { key: 'poNumber', label: 'PO No', sortable: true },
    { key: 'receivedBy', label: 'Received By' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'import-document': [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'documentType', label: 'Document Type', sortable: true },
    { key: 'shipment', label: 'Shipment' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  shipment: [
    { key: 'reference', label: 'Shipment No', sortable: true },
    { key: 'origin', label: 'Origin', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'eta', label: 'ETA', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'customs-duty': [
    { key: 'reference', label: 'Record No', sortable: true },
    { key: 'shipment', label: 'Shipment', sortable: true },
    { key: 'duty', label: 'Duty', sortable: true, align: 'right' },
    { key: 'tax', label: 'Tax', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  stock: [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'onHand', label: 'On Hand', sortable: true, align: 'right' },
    { key: 'reserved', label: 'Reserved', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'stock-ledger': [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'txnType', label: 'Transaction' },
    { key: 'qty', label: 'Qty', sortable: true, align: 'right' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
  ],
  batch: [
    { key: 'batchNo', label: 'Batch No', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'expiry', label: 'Expiry', sortable: true },
    { key: 'qty', label: 'Qty', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  serial: [
    { key: 'serialNo', label: 'Serial No', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'stock-transfer': [
    { key: 'reference', label: 'Transfer No', sortable: true },
    { key: 'from', label: 'From', sortable: true },
    { key: 'to', label: 'To', sortable: true },
    { key: 'qty', label: 'Qty', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'stock-adjustment': [
    { key: 'reference', label: 'Adjustment No', sortable: true },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'qty', label: 'Qty', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'inventory-audit': [
    { key: 'reference', label: 'Audit No', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'auditor', label: 'Auditor', sortable: true },
    { key: 'variance', label: 'Variance', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'cycle-count': [
    { key: 'reference', label: 'Cycle Count', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'auditor', label: 'Auditor', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'low-stock': [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'onHand', label: 'On Hand', sortable: true, align: 'right' },
    { key: 'reorder', label: 'Reorder Level', sortable: true, align: 'right' },
  ],
  vehicle: [
    { key: 'plateNo', label: 'Plate No', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  driver: [
    { key: 'name', label: 'Driver', sortable: true },
    { key: 'license', label: 'License', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  route: [
    { key: 'reference', label: 'Route Code', sortable: true },
    { key: 'origin', label: 'Origin', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'distance', label: 'Distance', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  maintenance: [
    { key: 'reference', label: 'Job No', sortable: true },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'serviceType', label: 'Service Type', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  fuel: [
    { key: 'reference', label: 'Fuel Log', sortable: true },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'liters', label: 'Liters', sortable: true, align: 'right' },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  trip: [
    { key: 'reference', label: 'Trip No', sortable: true },
    { key: 'route', label: 'Route', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  receivable: [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  payable: [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'supplier', label: 'Supplier', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  expense: [
    { key: 'reference', label: 'Expense No', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'approvedBy', label: 'Approved By', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'bank-account': [
    { key: 'reference', label: 'Account No', sortable: true },
    { key: 'bank', label: 'Bank', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'bank-transaction': [
    { key: 'reference', label: 'Txn No', sortable: true },
    { key: 'bank', label: 'Bank', sortable: true },
    { key: 'txnType', label: 'Type', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'journal-entry': [
    { key: 'reference', label: 'Journal No', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'cash-book': [
    { key: 'reference', label: 'Entry No', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'inflow', label: 'Inflow', sortable: true, align: 'right' },
    { key: 'outflow', label: 'Outflow', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'general-ledger': [
    { key: 'reference', label: 'Ledger No', sortable: true },
    { key: 'account', label: 'Account', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
  ],
  'trial-balance': [
    { key: 'account', label: 'Account', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
  ],
  'profit-loss': [
    { key: 'account', label: 'Account', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'trend', label: 'Trend', sortable: true },
  ],
  'balance-sheet': [
    { key: 'account', label: 'Account', sortable: true },
    { key: 'assets', label: 'Assets', sortable: true, align: 'right' },
    { key: 'liabilities', label: 'Liabilities', sortable: true, align: 'right' },
    { key: 'equity', label: 'Equity', sortable: true, align: 'right' },
  ],
  employee: [
    { key: 'code', label: 'Employee ID', sortable: true },
    { key: 'name', label: 'Employee', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  department: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Department', sortable: true },
    { key: 'manager', label: 'Manager', sortable: true },
    { key: 'headcount', label: 'Headcount', sortable: true, align: 'right' },
  ],
  designation: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Designation', sortable: true },
    { key: 'level', label: 'Level', sortable: true },
    { key: 'employees', label: 'Employees', sortable: true, align: 'right' },
  ],
  attendance: [
    { key: 'employee', label: 'Employee', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'inTime', label: 'In Time' },
    { key: 'outTime', label: 'Out Time' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  leave: [
    { key: 'reference', label: 'Leave No', sortable: true },
    { key: 'employee', label: 'Employee', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'days', label: 'Days', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  payroll: [
    { key: 'reference', label: 'Payroll No', sortable: true },
    { key: 'month', label: 'Month', sortable: true },
    { key: 'employees', label: 'Employees', sortable: true, align: 'right' },
    { key: 'gross', label: 'Gross', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  holiday: [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'name', label: 'Holiday', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  recruitment: [
    { key: 'reference', label: 'Req No', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  complaint: [
    { key: 'reference', label: 'Ticket No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  warranty: [
    { key: 'reference', label: 'Claim No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'service-request': [
    { key: 'reference', label: 'SR No', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'customer-history': [
    { key: 'reference', label: 'Customer', sortable: true },
    { key: 'lastOrder', label: 'Last Order', sortable: true },
    { key: 'payments', label: 'Payments', sortable: true, align: 'right' },
    { key: 'risk', label: 'Risk', sortable: true },
  ],
  'sales-report': [
    { key: 'period', label: 'Period', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true, align: 'right' },
    { key: 'growth', label: 'Growth', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'purchase-report': [
    { key: 'period', label: 'Period', sortable: true },
    { key: 'purchase', label: 'Purchase', sortable: true, align: 'right' },
    { key: 'growth', label: 'Growth', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'inventory-report': [
    { key: 'period', label: 'Period', sortable: true },
    { key: 'items', label: 'Items', sortable: true, align: 'right' },
    { key: 'value', label: 'Value', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'financial-report': [
    { key: 'period', label: 'Period', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'growth', label: 'Growth', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'performance-dashboard': [
    { key: 'metric', label: 'Metric', sortable: true },
    { key: 'value', label: 'Value', sortable: true, align: 'right' },
    { key: 'target', label: 'Target', sortable: true, align: 'right' },
  ],
  user: [
    { key: 'name', label: 'User', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  role: [
    { key: 'name', label: 'Role', sortable: true },
    { key: 'permissions', label: 'Permissions', sortable: true, align: 'right' },
    { key: 'members', label: 'Users', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'activity-log': [
    { key: 'timestamp', label: 'Time', sortable: true },
    { key: 'actor', label: 'Actor', sortable: true },
    { key: 'module', label: 'Module', sortable: true },
    { key: 'action', label: 'Action', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  branch: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Branch', sortable: true },
    { key: 'city', label: 'City', sortable: true },
    { key: 'manager', label: 'Manager', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'vat-settings': [
    { key: 'label', label: 'Setting', sortable: true },
    { key: 'value', label: 'Value', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  currency: [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Currency', sortable: true },
    { key: 'symbol', label: 'Symbol', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'fiscal-year': [
    { key: 'name', label: 'Fiscal Year', sortable: true },
    { key: 'start', label: 'Start', sortable: true },
    { key: 'end', label: 'End', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'email-settings': [
    { key: 'label', label: 'Setting', sortable: true },
    { key: 'value', label: 'Value', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'notification-settings': [
    { key: 'label', label: 'Notification', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  'backup-restore': [
    { key: 'reference', label: 'Backup No', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'size', label: 'Size', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true },
  ],
}

const TABLE_FORMS: Record<string, FormField[]> = {
  product: [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'sku', label: 'SKU', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['Electronics', 'Spare Parts', 'Raw Materials', 'Packaging'] },
    { name: 'brand', label: 'Brand', type: 'select', required: true, options: ['Acme', 'Orbit', 'Nova', 'Prime'] },
    { name: 'unit', label: 'Unit', type: 'select', required: true, options: ['Pc', 'Box', 'Kg', 'Ltr'] },
    { name: 'price', label: 'Selling Price', type: 'number', required: true },
    { name: 'cost', label: 'Cost Price', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Inactive'] },
    { name: 'image', label: 'Product Image', type: 'image' },
  ],
  customer: [
    { name: 'name', label: 'Customer Name', type: 'text', required: true },
    { name: 'code', label: 'Customer Code', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'creditLimit', label: 'Credit Limit', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
    { name: 'logo', label: 'Customer Logo', type: 'image' },
  ],
  supplier: [
    { name: 'name', label: 'Supplier Name', type: 'text', required: true },
    { name: 'code', label: 'Supplier Code', type: 'text', required: true },
    { name: 'contact', label: 'Contact Person', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'terms', label: 'Payment Terms', type: 'select', options: ['COD', '7 Days', '15 Days', '30 Days'] },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
  ],
  user: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Role', type: 'select', required: true, options: ['Admin', 'Manager', 'Supervisor', 'User'] },
    { name: 'branch', label: 'Branch', type: 'select', options: ['Head Office', 'North Branch', 'South Branch'] },
    { name: 'warehouse', label: 'Warehouse', type: 'select', options: ['Main Warehouse', 'Transit Warehouse'] },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
    { name: 'avatar', label: 'Avatar', type: 'image' },
  ],
  role: [
    { name: 'name', label: 'Role Name', type: 'text', required: true },
    { name: 'scope', label: 'Scope', type: 'select', options: ['Company', 'Branch', 'Warehouse'] },
    { name: 'permissions', label: 'Permissions', type: 'textarea', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
  ],
  company: [
    { name: 'name', label: 'Company Name', type: 'text', required: true },
    { name: 'vat', label: 'VAT Number', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'SAR'] },
    { name: 'logo', label: 'Company Logo', type: 'image' },
  ],
}

const pageCatalog: CatalogItem[] = [
  { module: 'Dashboard', title: 'Dashboard Home', kind: 'dashboard', entity: 'performance-dashboard', subtitle: 'Operational overview with live KPI cards, trends, alerts, and top performers.' },

  { module: 'Master Data', title: 'Products', kind: 'table', entity: 'product', subtitle: 'Product catalog with stock, pricing, and categorization.' },
  { module: 'Master Data', title: 'Create Product', kind: 'form', entity: 'product', subtitle: 'Create a new stock item with image upload and pricing.' },
  { module: 'Master Data', title: 'Edit Product', kind: 'form', entity: 'product', subtitle: 'Update product master data and inventory settings.' },
  { module: 'Master Data', title: 'Product Details', kind: 'detail', entity: 'product', subtitle: 'Detailed product profile with stock summary and related history.' },
  { module: 'Master Data', title: 'Product Categories', kind: 'table', entity: 'category', subtitle: 'Classification setup for reporting and product grouping.' },
  { module: 'Master Data', title: 'Create Category', kind: 'form', entity: 'category', subtitle: 'Create a new category with classification rules.' },
  { module: 'Master Data', title: 'Edit Category', kind: 'form', entity: 'category', subtitle: 'Edit category naming, status, and business rules.' },
  { module: 'Master Data', title: 'Category Details', kind: 'detail', entity: 'category', subtitle: 'View category details with usage and activity timeline.' },
  { module: 'Master Data', title: 'Category History', kind: 'detail', entity: 'category', subtitle: 'Track lifecycle changes for category records.' },
  { module: 'Master Data', title: 'Brands', kind: 'table', entity: 'brand', subtitle: 'Brand master list used across purchasing and sales.' },
  { module: 'Master Data', title: 'Create Brand', kind: 'form', entity: 'brand', subtitle: 'Create a new brand profile and metadata.' },
  { module: 'Master Data', title: 'Edit Brand', kind: 'form', entity: 'brand', subtitle: 'Update brand profile and status.' },
  { module: 'Master Data', title: 'Brand Details', kind: 'detail', entity: 'brand', subtitle: 'View brand details and related product usage.' },
  { module: 'Master Data', title: 'Brand History', kind: 'detail', entity: 'brand', subtitle: 'Review brand profile activity history.' },
  { module: 'Master Data', title: 'Units', kind: 'table', entity: 'unit', subtitle: 'Measurement units for products and transactions.' },
  { module: 'Master Data', title: 'Create Unit', kind: 'form', entity: 'unit', subtitle: 'Create a measurement unit for transactions.' },
  { module: 'Master Data', title: 'Edit Unit', kind: 'form', entity: 'unit', subtitle: 'Edit unit naming and conversion metadata.' },
  { module: 'Master Data', title: 'Unit Details', kind: 'detail', entity: 'unit', subtitle: 'View unit details and usage scope.' },
  { module: 'Master Data', title: 'Unit History', kind: 'detail', entity: 'unit', subtitle: 'Track updates performed on unit records.' },
  { module: 'Master Data', title: 'Customers', kind: 'table', entity: 'customer', subtitle: 'Customer master with balances, location, and credit profile.' },
  { module: 'Master Data', title: 'Create Customer', kind: 'form', entity: 'customer', subtitle: 'Create a new customer record with contact and credit details.' },
  { module: 'Master Data', title: 'Edit Customer', kind: 'form', entity: 'customer', subtitle: 'Edit customer account and communication preferences.' },
  { module: 'Master Data', title: 'Customer Details', kind: 'detail', entity: 'customer', subtitle: 'Customer account details, balances, and recent activity.' },
  { module: 'Master Data', title: 'Customer History', kind: 'detail', entity: 'customer', subtitle: 'Track customer master changes and profile timeline.' },
  { module: 'Master Data', title: 'Suppliers', kind: 'table', entity: 'supplier', subtitle: 'Supplier directory and payable summary.' },
  { module: 'Master Data', title: 'Create Supplier', kind: 'form', entity: 'supplier', subtitle: 'Create supplier profile with payment terms.' },
  { module: 'Master Data', title: 'Edit Supplier', kind: 'form', entity: 'supplier', subtitle: 'Update supplier contract and contact data.' },
  { module: 'Master Data', title: 'Supplier Details', kind: 'detail', entity: 'supplier', subtitle: 'Supplier details, open orders, and payment history.' },
  { module: 'Master Data', title: 'Supplier History', kind: 'detail', entity: 'supplier', subtitle: 'Track supplier profile history and updates.' },
  { module: 'Master Data', title: 'Warehouses', kind: 'table', entity: 'warehouse', subtitle: 'Warehouse master with capacity, utilization, and branch mapping.' },
  { module: 'Master Data', title: 'Create Warehouse', kind: 'form', entity: 'warehouse', subtitle: 'Register a new warehouse or distribution hub.' },
  { module: 'Master Data', title: 'Edit Warehouse', kind: 'form', entity: 'warehouse', subtitle: 'Update warehouse ownership and settings.' },
  { module: 'Master Data', title: 'Warehouse Details', kind: 'detail', entity: 'warehouse', subtitle: 'Warehouse profile with inventory value and operations summary.' },
  { module: 'Master Data', title: 'Warehouse History', kind: 'detail', entity: 'warehouse', subtitle: 'Track warehouse master activity and operational updates.' },

  { module: 'Sales & Distribution', title: 'Sales Dashboard', kind: 'dashboard', entity: 'sales-dashboard', subtitle: 'Sales cockpit with revenue, order, and collection insights.' },
  { module: 'Sales & Distribution', title: 'Quotations', kind: 'table', entity: 'quotation', subtitle: 'Sales quotations, status, and commercial value.' },
  { module: 'Sales & Distribution', title: 'Quotation Details', kind: 'detail', entity: 'quotation', subtitle: 'Quotation detail view with approvals and revisions.' },
  { module: 'Sales & Distribution', title: 'Sales Orders', kind: 'table', entity: 'sales-order', subtitle: 'Order pipeline from quotation to delivery.' },
  { module: 'Sales & Distribution', title: 'Sales Order Details', kind: 'detail', entity: 'sales-order', subtitle: 'Detailed sales order lines, delivery and payment status.' },
  { module: 'Sales & Distribution', title: 'Create Sales Order', kind: 'form', entity: 'sales-order', subtitle: 'Create an order with customer, items, and delivery planning.' },
  { module: 'Sales & Distribution', title: 'Delivery Scheduling', kind: 'table', entity: 'delivery', subtitle: 'Schedule dispatches for confirmed orders.' },
  { module: 'Sales & Distribution', title: 'Delivery Tracking', kind: 'detail', entity: 'delivery', subtitle: 'Track live delivery status and route progress.' },
  { module: 'Sales & Distribution', title: 'Invoice List', kind: 'table', entity: 'invoice', subtitle: 'Invoice list with dues, settlements, and VAT visibility.' },
  { module: 'Sales & Distribution', title: 'Create Invoice', kind: 'form', entity: 'invoice', subtitle: 'Issue an invoice from order or delivery.' },
  { module: 'Sales & Distribution', title: 'Invoice Preview', kind: 'detail', entity: 'invoice', subtitle: 'Preview invoice before print with discount and VAT summary.' },
  { module: 'Sales & Distribution', title: 'Invoice Details', kind: 'detail', entity: 'invoice', subtitle: 'Invoice line items, VAT totals, and payment status.' },
  { module: 'Sales & Distribution', title: 'Customer Payments', kind: 'table', entity: 'payment', subtitle: 'Customer receipts and allocation history.' },
  { module: 'Sales & Distribution', title: 'Sales Returns', kind: 'table', entity: 'return', subtitle: 'Sales return requests and approvals.' },
  { module: 'Sales & Distribution', title: 'VAT Invoice', kind: 'print', entity: 'invoice', subtitle: 'Printable VAT invoice with Excel-style layout.' },

  { module: 'Purchasing / Import', title: 'Purchasing Dashboard', kind: 'dashboard', entity: 'purchase-dashboard', subtitle: 'Purchasing cockpit for PO, inbound, and payable visibility.' },
  { module: 'Purchasing / Import', title: 'Purchase Orders', kind: 'table', entity: 'purchase-order', subtitle: 'Purchase order list with approval and vendor status.' },
  { module: 'Purchasing / Import', title: 'Create Purchase Order', kind: 'form', entity: 'purchase-order', subtitle: 'Create a purchase order with line-level vendor items.' },
  { module: 'Purchasing / Import', title: 'Purchase Order Details', kind: 'detail', entity: 'purchase-order', subtitle: 'Purchase order details covering shipment, taxes, and approvals.' },
  { module: 'Purchasing / Import', title: 'Goods Receiving (GRN)', kind: 'table', entity: 'grn', subtitle: 'Receiving notes with pending, rejected, and inspected quantities.' },
  { module: 'Purchasing / Import', title: 'Supplier Payments', kind: 'table', entity: 'payable', subtitle: 'Payments due to suppliers and settlement tracking.' },
  { module: 'Purchasing / Import', title: 'Purchase Returns', kind: 'table', entity: 'return', subtitle: 'Returns to supplier with debit note handling.' },
  { module: 'Purchasing / Import', title: 'Import Documents', kind: 'table', entity: 'import-document', subtitle: 'Bills of lading, packing lists, and customs paperwork.' },
  { module: 'Purchasing / Import', title: 'Shipment Tracking', kind: 'table', entity: 'shipment', subtitle: 'Inbound shipment tracking and ETA visibility.' },
  { module: 'Purchasing / Import', title: 'Container Tracking', kind: 'table', entity: 'shipment', subtitle: 'Track containers by line, ETA, and transit milestones.' },
  { module: 'Purchasing / Import', title: 'Customs & Duty', kind: 'table', entity: 'customs-duty', subtitle: 'Customs declarations, duty, VAT, and clearance progress.' },
  { module: 'Purchasing / Import', title: 'Supplier Performance', kind: 'table', entity: 'supplier', subtitle: 'Supplier delivery, quality, value, and lead time scorecard.' },

  { module: 'Warehouse', title: 'Warehouse Dashboard', kind: 'dashboard', entity: 'stock', subtitle: 'Warehouse utilization, stock flow, and receiving status.' },
  { module: 'Warehouse', title: 'Stock Management', kind: 'table', entity: 'stock', subtitle: 'Current stock positions across warehouse locations.' },
  { module: 'Warehouse', title: 'Stock Ledger', kind: 'table', entity: 'stock-ledger', subtitle: 'Movement ledger with opening, in, out, and balance.' },
  { module: 'Warehouse', title: 'Goods Receiving (GRN)', kind: 'table', entity: 'grn', subtitle: 'Receive and inspect incoming goods with batch and serial traceability.' },
  { module: 'Warehouse', title: 'Inventory Movement', kind: 'table', entity: 'stock-transfer', subtitle: 'Track movement between zones and warehouses.' },
  { module: 'Warehouse', title: 'Batch Tracking', kind: 'table', entity: 'batch', subtitle: 'Batch history and expiry control.' },
  { module: 'Warehouse', title: 'Serial Number Tracking', kind: 'table', entity: 'serial', subtitle: 'Serialized inventory tracking by item and warehouse.' },
  { module: 'Warehouse', title: 'Stock Transfers', kind: 'table', entity: 'stock-transfer', subtitle: 'Move stock between warehouses or branches.' },
  { module: 'Warehouse', title: 'Stock Adjustments', kind: 'table', entity: 'stock-adjustment', subtitle: 'Record manual corrections and write-offs.' },
  { module: 'Warehouse', title: 'Inventory Audit', kind: 'detail', entity: 'inventory-audit', subtitle: 'Audit summaries and variance checkpoints.' },
  { module: 'Warehouse', title: 'Cycle Count', kind: 'table', entity: 'cycle-count', subtitle: 'Cycle count plans and variances by location.' },
  { module: 'Warehouse', title: 'Low Stock Alerts', kind: 'table', entity: 'low-stock', subtitle: 'Automatic low stock triggers and reorder signals.' },
  { module: 'Warehouse', title: 'Bin Locations', kind: 'table', entity: 'warehouse', subtitle: 'Bin-level storage map with utilization and status.' },
  { module: 'Warehouse', title: 'Rack Management', kind: 'table', entity: 'warehouse', subtitle: 'Rack configuration and capacity management.' },
  { module: 'Warehouse', title: 'Warehouse Details', kind: 'detail', entity: 'warehouse', subtitle: 'Warehouse profile, capacity, manager, and activity timeline.' },

  { module: 'Logistics', title: 'Logistics Dashboard', kind: 'dashboard', entity: 'delivery', subtitle: 'Transport cockpit for fleet, deliveries, and fuel visibility.' },
  { module: 'Logistics', title: 'Vehicles', kind: 'table', entity: 'vehicle', subtitle: 'Vehicle fleet management and maintenance status.' },
  { module: 'Logistics', title: 'Vehicle Details', kind: 'detail', entity: 'vehicle', subtitle: 'Vehicle profile with assignment and maintenance timeline.' },
  { module: 'Logistics', title: 'Drivers', kind: 'table', entity: 'driver', subtitle: 'Driver master list and license tracking.' },
  { module: 'Logistics', title: 'Driver Details', kind: 'detail', entity: 'driver', subtitle: 'Driver profile with trip and attendance insights.' },
  { module: 'Logistics', title: 'Route Planning', kind: 'table', entity: 'route', subtitle: 'Route plans and transport assignments.' },
  { module: 'Logistics', title: 'Deliveries', kind: 'table', entity: 'delivery', subtitle: 'Delivery dispatch list and proof-of-delivery flow.' },
  { module: 'Logistics', title: 'Delivery Scheduling', kind: 'table', entity: 'delivery', subtitle: 'Schedule dispatch windows and route commitments.' },
  { module: 'Logistics', title: 'Delivery Status', kind: 'detail', entity: 'delivery', subtitle: 'Current delivery milestones and exceptions.' },
  { module: 'Logistics', title: 'Vehicle Maintenance', kind: 'table', entity: 'maintenance', subtitle: 'Maintenance planning and service history.' },
  { module: 'Logistics', title: 'Fuel Records', kind: 'table', entity: 'fuel', subtitle: 'Fuel consumption and expense monitoring.' },
  { module: 'Logistics', title: 'Trip History', kind: 'table', entity: 'trip', subtitle: 'Historic trip logs and route outcomes.' },

  { module: 'Finance & Accounting', title: 'Finance Dashboard', kind: 'dashboard', entity: 'general-ledger', subtitle: 'Executive finance cockpit with cash, revenue, and payable visibility.' },
  { module: 'Finance & Accounting', title: 'Accounts Receivable', kind: 'table', entity: 'receivable', subtitle: 'Outstanding customer receivables and aging.' },
  { module: 'Finance & Accounting', title: 'Accounts Payable', kind: 'table', entity: 'payable', subtitle: 'Vendor liabilities and due dates.' },
  { module: 'Finance & Accounting', title: 'Expenses', kind: 'table', entity: 'expense', subtitle: 'Business expense claims and approvals.' },
  { module: 'Finance & Accounting', title: 'Bank Accounts', kind: 'table', entity: 'bank-account', subtitle: 'Bank account balances and reconciliation status.' },
  { module: 'Finance & Accounting', title: 'Bank Transactions', kind: 'table', entity: 'bank-transaction', subtitle: 'Cash movements and posting state.' },
  { module: 'Finance & Accounting', title: 'Journal Entries', kind: 'table', entity: 'journal-entry', subtitle: 'Accounting journals and ledger postings.' },
  { module: 'Finance & Accounting', title: 'Cash Book', kind: 'table', entity: 'cash-book', subtitle: 'Cash receipts and payments book.' },
  { module: 'Finance & Accounting', title: 'General Ledger', kind: 'table', entity: 'general-ledger', subtitle: 'Ledger detail for all accounts.' },
  { module: 'Finance & Accounting', title: 'Trial Balance', kind: 'detail', entity: 'trial-balance', subtitle: 'Debit and credit equality verification.' },
  { module: 'Finance & Accounting', title: 'Balance Sheet', kind: 'detail', entity: 'balance-sheet', subtitle: 'Balance sheet snapshot with assets and liabilities.' },
  { module: 'Finance & Accounting', title: 'Profit & Loss', kind: 'detail', entity: 'profit-loss', subtitle: 'Income statement summary by account group.' },
  { module: 'Finance & Accounting', title: 'Tax Summary', kind: 'table', entity: 'vat-settings', subtitle: 'Tax liabilities, VAT summary, and filing status.' },

  { module: 'Human Resources', title: 'HR Dashboard', kind: 'dashboard', entity: 'employee', subtitle: 'Workforce cockpit with attendance, leave, and payroll status.' },
  { module: 'Human Resources', title: 'Employees', kind: 'table', entity: 'employee', subtitle: 'Employee master with department and designation.' },
  { module: 'Human Resources', title: 'Employee Details', kind: 'detail', entity: 'employee', subtitle: 'Detailed employee profile and HR activity timeline.' },
  { module: 'Human Resources', title: 'Departments', kind: 'table', entity: 'department', subtitle: 'Organizational structure and headcount.' },
  { module: 'Human Resources', title: 'Designations', kind: 'table', entity: 'designation', subtitle: 'Role levels and employee allocation.' },
  { module: 'Human Resources', title: 'Attendance', kind: 'table', entity: 'attendance', subtitle: 'Attendance tracking with check-in/out status.' },
  { module: 'Human Resources', title: 'Leave', kind: 'table', entity: 'leave', subtitle: 'Leave balances, approvals, and entitlements.' },
  { module: 'Human Resources', title: 'Payroll', kind: 'table', entity: 'payroll', subtitle: 'Payroll processing and salary summaries.' },
  { module: 'Human Resources', title: 'Holiday Calendar', kind: 'table', entity: 'holiday', subtitle: 'Holiday calendar and public holiday planning.' },
  { module: 'Human Resources', title: 'Recruitment', kind: 'table', entity: 'recruitment', subtitle: 'Open requisitions and hiring progress.' },

  { module: 'Customer Service', title: 'Customer Service Dashboard', kind: 'dashboard', entity: 'complaint', subtitle: 'Support cockpit with SLA, ticket, and return health.' },
  { module: 'Customer Service', title: 'Complaints', kind: 'table', entity: 'complaint', subtitle: 'Complaint tickets and escalation status.' },
  { module: 'Customer Service', title: 'Complaint Details', kind: 'detail', entity: 'complaint', subtitle: 'Complaint detail with root cause and resolution timeline.' },
  { module: 'Customer Service', title: 'Returns', kind: 'table', entity: 'return', subtitle: 'Customer return handling and replacement workflow.' },
  { module: 'Customer Service', title: 'Warranty Claims', kind: 'table', entity: 'warranty', subtitle: 'Warranty claim processing and approvals.' },
  { module: 'Customer Service', title: 'Service Requests', kind: 'table', entity: 'service-request', subtitle: 'Support requests and resolution timeline.' },
  { module: 'Customer Service', title: 'Customer Timeline', kind: 'detail', entity: 'customer-history', subtitle: 'Customer activity, orders, complaints, and service timeline.' },

  { module: 'Reports & Analytics', title: 'Reports Dashboard', kind: 'dashboard', entity: 'performance-dashboard', subtitle: 'Executive report center with KPIs and publication trends.' },
  { module: 'Reports & Analytics', title: 'Sales Reports', kind: 'report', entity: 'sales-report', subtitle: 'Sales trends, category performance, and customer ranking.' },
  { module: 'Reports & Analytics', title: 'Purchase Reports', kind: 'report', entity: 'purchase-report', subtitle: 'Purchase trends and supplier analysis.' },
  { module: 'Reports & Analytics', title: 'Inventory Reports', kind: 'report', entity: 'inventory-report', subtitle: 'Stock movement, value, and coverage analysis.' },
  { module: 'Reports & Analytics', title: 'Financial Reports', kind: 'report', entity: 'financial-report', subtitle: 'Profit, loss, balance, and cashflow reporting.' },
  { module: 'Reports & Analytics', title: 'Performance Dashboard', kind: 'dashboard', entity: 'performance-dashboard', subtitle: 'KPI-focused executive dashboard.' },
  { module: 'Reports & Analytics', title: 'Stock Aging', kind: 'report', entity: 'inventory-report', subtitle: 'Aging buckets for inventory and obsolescence risk.' },
  { module: 'Reports & Analytics', title: 'Customer Aging', kind: 'report', entity: 'sales-report', subtitle: 'Receivable aging by customer and overdue profile.' },
  { module: 'Reports & Analytics', title: 'Supplier Aging', kind: 'report', entity: 'purchase-report', subtitle: 'Payable aging by supplier and settlement urgency.' },
  { module: 'Reports & Analytics', title: 'Revenue Analysis', kind: 'report', entity: 'sales-report', subtitle: 'Revenue composition by region, customer, and channel.' },
  { module: 'Reports & Analytics', title: 'Expense Analysis', kind: 'report', entity: 'financial-report', subtitle: 'Expense pattern and variance across cost centers.' },
  { module: 'Reports & Analytics', title: 'Cash Flow', kind: 'report', entity: 'financial-report', subtitle: 'Operating, investing, and financing cashflow movement.' },
  { module: 'Reports & Analytics', title: 'Inventory Value', kind: 'report', entity: 'inventory-report', subtitle: 'Inventory valuation by category and warehouse.' },
  { module: 'Reports & Analytics', title: 'Top Selling Products', kind: 'report', entity: 'sales-report', subtitle: 'Top products by revenue, units, and margin contribution.' },
  { module: 'Reports & Analytics', title: 'Top Customers', kind: 'report', entity: 'sales-report', subtitle: 'Top customers by revenue, frequency, and payment discipline.' },

  { module: 'User Management', title: 'Users', kind: 'table', entity: 'user', subtitle: 'Application users and access status.' },
  { module: 'User Management', title: 'Roles', kind: 'table', entity: 'role', subtitle: 'Role master and permission coverage.' },
  { module: 'User Management', title: 'Permissions', kind: 'form', entity: 'role', subtitle: 'Permission matrix configuration.' },
  { module: 'User Management', title: 'Activity Logs', kind: 'table', entity: 'activity-log', subtitle: 'Audit trail of system and user actions.' },

  { module: 'Settings', title: 'Company Information', kind: 'form', entity: 'company', subtitle: 'Organization profile, logo, VAT, and contact information.' },
  { module: 'Settings', title: 'Company Logo', kind: 'form', entity: 'company', subtitle: 'Upload or replace the brand logo asset.' },
  { module: 'Settings', title: 'Branches', kind: 'table', entity: 'branch', subtitle: 'Branch master with manager mapping.' },
  { module: 'Settings', title: 'Warehouses', kind: 'table', entity: 'warehouse', subtitle: 'Warehouse configuration and operating status.' },
  { module: 'Settings', title: 'Invoice Settings', kind: 'form', entity: 'vat-settings', subtitle: 'Invoice numbering, layout, and defaults.' },
  { module: 'Settings', title: 'Tax / VAT', kind: 'form', entity: 'vat-settings', subtitle: 'Tax calculation, VAT rates, and compliance rules.' },
  { module: 'Settings', title: 'Currency', kind: 'form', entity: 'currency', subtitle: 'Default currency and symbol setup.' },
  { module: 'Settings', title: 'Fiscal Year', kind: 'form', entity: 'fiscal-year', subtitle: 'Financial year calendar and period locks.' },
  { module: 'Settings', title: 'Email Settings', kind: 'form', entity: 'email-settings', subtitle: 'SMTP and outgoing mail defaults.' },
  { module: 'Settings', title: 'Notification Settings', kind: 'form', entity: 'notification-settings', subtitle: 'System alerts and notification channels.' },
  { module: 'Settings', title: 'Backup & Restore', kind: 'form', entity: 'backup-restore', subtitle: 'Backup export and restore controls.' },
]

function buildColumns(entity: string, title: string) {
  return MASTER_COLUMNS[entity] ?? [
    { key: 'reference', label: `${title} No`, sortable: true },
    { key: 'name', label: title, sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ]
}

function buildFields(entity: string, title: string) {
  if (TABLE_FORMS[entity]) {
    return TABLE_FORMS[entity]
  }
  return [
    { name: 'name', label: `${title} Name`, type: 'text', required: true },
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: ['Draft', 'Active', 'Inactive'] },
    { name: 'notes', label: 'Notes', type: 'textarea' },
    { name: 'attachment', label: 'Attachment', type: 'file' },
  ] satisfies FormField[]
}

export const authPages = [
  { title: 'Login', path: '/auth/login', kind: 'form' as const },
  { title: 'Forgot Password', path: '/auth/forgot-password', kind: 'form' as const },
  { title: 'Reset Password', path: '/auth/reset-password', kind: 'form' as const },
  { title: 'Change Password', path: '/auth/change-password', kind: 'form' as const },
]

export const erpPages: PageDefinition[] = pageCatalog.map((item) => ({
  module: item.module,
  title: item.title,
  kind: item.kind,
  entity: item.entity,
  subtitle: item.subtitle,
  path: item.title === 'Dashboard Home' ? '/dashboard/home' : `/${moduleSlug(item.module)}/${slugify(item.title)}`,
  columns: buildColumns(item.entity, item.title),
  formFields: buildFields(item.entity, item.title),
}))

export const userProfilePage: PageDefinition = {
  module: 'User Management',
  title: 'User Profile',
  path: '/profile',
  kind: 'profile',
  entity: 'user',
  subtitle: 'Profile details, preferences, and access information.',
  columns: buildColumns('user', 'User'),
  formFields: buildFields('user', 'User'),
}

export const allPages = [...erpPages, userProfilePage]

export const pageTitleByPath = new Map<string, string>(allPages.map((page) => [page.path, page.title]))

export const pageByPath = new Map<string, PageDefinition>(allPages.map((page) => [page.path, page]))

export function getPageDefinition(path: string) {
  return pageByPath.get(path)
}

function rowStatus(index: number) {
  return ['Active', 'Pending', 'Approved', 'Rejected', 'In Transit', 'Completed'][index % 6]
}

function numberValue(seed: number, step = 120) {
  return 1000 + seed * step
}

export function generatePageRows(page: PageDefinition, count = 12): Array<Record<string, unknown>> {
  const entity = page.entity
  return Array.from({ length: count }).map((_, index) => {
    const day = format(new Date(2026, 7, 6 - index), 'yyyy-MM-dd')
    const status = rowStatus(index)

    switch (entity) {
      case 'product':
        return {
          code: `PRD-${100 + index}`,
          name: `Product ${index + 1}`,
          category: ['Electronics', 'Hardware', 'Packaging', 'Spare Parts'][index % 4],
          brand: ['Acme', 'Orbit', 'Nova', 'Prime'][index % 4],
          unit: ['Pc', 'Box', 'Kg', 'Ltr'][index % 4],
          stock: 140 - index * 4,
          status,
        }
      case 'customer':
        return {
          code: `CUS-${1000 + index}`,
          name: `Customer ${index + 1}`,
          phone: `+1 555 01${index} 88${index}`,
          city: ['New York', 'Chicago', 'Dallas', 'Austin'][index % 4],
          balance: numberValue(index, 340),
          status,
        }
      case 'supplier':
        return {
          code: `SUP-${800 + index}`,
          name: `Supplier ${index + 1}`,
          contact: `Contact ${index + 1}`,
          terms: ['COD', '7 Days', '15 Days', '30 Days'][index % 4],
          balance: numberValue(index, 510),
          status,
        }
      case 'warehouse':
        return {
          code: `WH-${index + 1}`,
          name: ['Main Warehouse', 'West Hub', 'East Hub', 'Transit Hub'][index % 4],
          branch: ['Head Office', 'North Branch', 'South Branch'][index % 3],
          capacity: 5000 + index * 250,
          utilization: 58 + index * 2,
          status,
        }
      case 'sales-order':
        return {
          number: `SO-2026-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          date: day,
          amount: numberValue(index, 780),
          deliveryStatus: ['Scheduled', 'Picking', 'In Transit', 'Delivered'][index % 4],
          status,
        }
      case 'quotation':
        return {
          number: `QTN-2026-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          validity: `${7 + (index % 10)} days`,
          amount: numberValue(index, 640),
          status,
        }
      case 'invoice':
        return {
          number: `INV-2026-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          dueDate: format(new Date(2026, 7, 20 - index), 'yyyy-MM-dd'),
          amount: numberValue(index, 950),
          paid: numberValue(index, 640),
          status,
        }
      case 'payment':
      case 'ap-payment':
        return {
          reference: `PAY-${2026}-${String(index + 1).padStart(4, '0')}`,
          party: `Party ${index + 1}`,
          method: ['Cash', 'Bank Transfer', 'Cheque', 'Card'][index % 4],
          amount: numberValue(index, 420),
          status,
        }
      case 'return':
        return {
          reference: `RET-${2026}-${String(index + 1).padStart(4, '0')}`,
          party: `Customer ${index + 1}`,
          reason: ['Damaged', 'Wrong Item', 'Short Supply', 'Expired'][index % 4],
          amount: numberValue(index, 390),
          status,
        }
      case 'delivery':
        return {
          number: `DLV-${2026}-${String(index + 1).padStart(4, '0')}`,
          party: `Customer ${index + 1}`,
          vehicle: `TRK-${index + 11}`,
          driver: `Driver ${index + 1}`,
          eta: format(new Date(2026, 7, 10 + index), 'yyyy-MM-dd'),
          status,
        }
      case 'purchase-order':
        return {
          number: `PO-2026-${String(index + 1).padStart(4, '0')}`,
          supplier: `Supplier ${index + 1}`,
          date: day,
          amount: numberValue(index, 870),
          status,
        }
      case 'grn':
        return {
          number: `GRN-2026-${String(index + 1).padStart(4, '0')}`,
          supplier: `Supplier ${index + 1}`,
          poNumber: `PO-2026-${String(index + 1).padStart(4, '0')}`,
          receivedBy: `Receiver ${index + 1}`,
          status,
        }
      case 'import-document':
        return {
          reference: `IMP-${2026}-${String(index + 1).padStart(4, '0')}`,
          documentType: ['BL', 'Packing List', 'Invoice', 'Certificate'][index % 4],
          shipment: `SHP-${index + 1}`,
          status,
        }
      case 'shipment':
        return {
          reference: `SHP-${2026}-${String(index + 1).padStart(4, '0')}`,
          origin: ['Shanghai', 'Dubai', 'Singapore', 'Mombasa'][index % 4],
          destination: ['Port of LA', 'Houston', 'New York', 'Miami'][index % 4],
          eta: format(new Date(2026, 7, 12 + index), 'yyyy-MM-dd'),
          status,
        }
      case 'customs-duty':
        return {
          reference: `CDR-${2026}-${String(index + 1).padStart(4, '0')}`,
          shipment: `SHP-${index + 1}`,
          duty: numberValue(index, 155),
          tax: numberValue(index, 92),
          status,
        }
      case 'stock':
        return {
          sku: `SKU-${1000 + index}`,
          product: `Product ${index + 1}`,
          warehouse: ['Main Warehouse', 'West Hub', 'Transit Hub'][index % 3],
          onHand: 120 - index * 3,
          reserved: 8 + index,
          status,
        }
      case 'stock-ledger':
        return {
          reference: `LED-${2026}-${index + 1}`,
          product: `Product ${index + 1}`,
          txnType: ['GRN', 'Transfer', 'Issue', 'Adjustment'][index % 4],
          qty: 5 + index,
          balance: 220 - index * 7,
        }
      case 'batch':
        return {
          batchNo: `B-${2026}-${String(index + 1).padStart(4, '0')}`,
          product: `Product ${index + 1}`,
          expiry: format(new Date(2026, 11, 10 + index), 'yyyy-MM-dd'),
          qty: 20 + index * 2,
          status,
        }
      case 'serial':
        return {
          serialNo: `SN-${2026}-${String(index + 1).padStart(5, '0')}`,
          product: `Product ${index + 1}`,
          warehouse: ['Main Warehouse', 'West Hub'][index % 2],
          status,
        }
      case 'stock-transfer':
        return {
          reference: `TRF-${2026}-${String(index + 1).padStart(4, '0')}`,
          from: 'Main Warehouse',
          to: ['West Hub', 'East Hub', 'Transit Hub'][index % 3],
          qty: 4 + index,
          status,
        }
      case 'stock-adjustment':
        return {
          reference: `ADJ-${2026}-${String(index + 1).padStart(4, '0')}`,
          reason: ['Damage', 'Shortage', 'Audit Correction', 'Expiry'][index % 4],
          qty: 2 + index,
          status,
        }
      case 'inventory-audit':
        return {
          reference: `AUD-${2026}-${String(index + 1).padStart(4, '0')}`,
          warehouse: ['Main Warehouse', 'West Hub'][index % 2],
          auditor: `Auditor ${index + 1}`,
          variance: index - 2,
          status,
        }
      case 'cycle-count':
        return {
          reference: `CC-${2026}-${String(index + 1).padStart(4, '0')}`,
          warehouse: ['Main Warehouse', 'West Hub'][index % 2],
          auditor: `Auditor ${index + 1}`,
          status,
        }
      case 'low-stock':
        return {
          sku: `SKU-${1000 + index}`,
          product: `Product ${index + 1}`,
          warehouse: ['Main Warehouse', 'West Hub'][index % 2],
          onHand: 10 - index,
          reorder: 20 + index,
        }
      case 'vehicle':
        return {
          plateNo: `TRK-${index + 1}`,
          type: ['Van', 'Truck', 'Pickup', 'Trailer'][index % 4],
          driver: `Driver ${index + 1}`,
          status,
        }
      case 'driver':
        return {
          name: `Driver ${index + 1}`,
          license: `LIC-${2026}-${100 + index}`,
          phone: `+1 555 02${index} 66${index}`,
          status,
        }
      case 'route':
        return {
          reference: `RTE-${index + 1}`,
          origin: ['Head Office', 'North Branch'][index % 2],
          destination: ['Customer Site', 'Warehouse', 'Port'][index % 3],
          distance: 18 + index * 7,
          status,
        }
      case 'maintenance':
        return {
          reference: `MTN-${2026}-${String(index + 1).padStart(4, '0')}`,
          vehicle: `TRK-${index + 1}`,
          serviceType: ['Oil Change', 'Brake Check', 'Tyre Rotation', 'Annual Service'][index % 4],
          date: day,
          status,
        }
      case 'fuel':
        return {
          reference: `FUEL-${2026}-${String(index + 1).padStart(4, '0')}`,
          vehicle: `TRK-${index + 1}`,
          liters: 18 + index * 2,
          amount: numberValue(index, 75),
          status,
        }
      case 'trip':
        return {
          reference: `TRP-${2026}-${String(index + 1).padStart(4, '0')}`,
          route: `Route ${index + 1}`,
          driver: `Driver ${index + 1}`,
          status,
        }
      case 'receivable':
        return {
          reference: `AR-${2026}-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          dueDate: format(new Date(2026, 7, 20 - index), 'yyyy-MM-dd'),
          amount: numberValue(index, 710),
          status,
        }
      case 'payable':
        return {
          reference: `AP-${2026}-${String(index + 1).padStart(4, '0')}`,
          supplier: `Supplier ${index + 1}`,
          dueDate: format(new Date(2026, 7, 15 - index), 'yyyy-MM-dd'),
          amount: numberValue(index, 680),
          status,
        }
      case 'expense':
        return {
          reference: `EXP-${2026}-${String(index + 1).padStart(4, '0')}`,
          category: ['Travel', 'Fuel', 'Office', 'Maintenance'][index % 4],
          approvedBy: `Manager ${index + 1}`,
          amount: numberValue(index, 230),
          status,
        }
      case 'bank-account':
        return {
          reference: `AC-${2026}-${String(index + 1).padStart(4, '0')}`,
          bank: ['First Bank', 'Metro Bank', 'Trust Bank'][index % 3],
          type: ['Current', 'Savings'][index % 2],
          balance: numberValue(index, 1400),
          status,
        }
      case 'bank-transaction':
        return {
          reference: `BNK-${2026}-${String(index + 1).padStart(4, '0')}`,
          bank: ['First Bank', 'Metro Bank'][index % 2],
          txnType: ['Deposit', 'Withdrawal', 'Transfer'][index % 3],
          amount: numberValue(index, 540),
          status,
        }
      case 'journal-entry':
        return {
          reference: `JRN-${2026}-${String(index + 1).padStart(4, '0')}`,
          date: day,
          debit: numberValue(index, 300),
          credit: numberValue(index, 300),
          status,
        }
      case 'cash-book':
        return {
          reference: `CASH-${2026}-${String(index + 1).padStart(4, '0')}`,
          description: `Cash movement ${index + 1}`,
          inflow: numberValue(index, 180),
          outflow: numberValue(index, 150),
          status,
        }
      case 'general-ledger':
        return {
          reference: `GL-${2026}-${String(index + 1).padStart(4, '0')}`,
          account: ['Sales', 'COGS', 'Inventory', 'Bank'][index % 4],
          debit: numberValue(index, 410),
          credit: numberValue(index, 395),
          balance: numberValue(index, 380),
        }
      case 'trial-balance':
        return {
          account: ['Sales', 'COGS', 'Inventory', 'Bank'][index % 4],
          debit: numberValue(index, 410),
          credit: numberValue(index, 410),
          balance: 0,
        }
      case 'profit-loss':
        return {
          account: ['Revenue', 'Cost of Sales', 'Operating Expense', 'Net Profit'][index % 4],
          amount: numberValue(index, 420),
          trend: ['Up', 'Stable', 'Up', 'Down'][index % 4],
        }
      case 'balance-sheet':
        return {
          account: ['Assets', 'Liabilities', 'Equity', 'Retained Earnings'][index % 4],
          assets: numberValue(index, 620),
          liabilities: numberValue(index, 310),
          equity: numberValue(index, 290),
        }
      case 'employee':
        return {
          code: `EMP-${100 + index}`,
          name: `Employee ${index + 1}`,
          department: ['Sales', 'Finance', 'HR', 'Operations'][index % 4],
          designation: ['Manager', 'Executive', 'Officer', 'Supervisor'][index % 4],
          joinDate: format(new Date(2024, index % 12, 10 + index), 'yyyy-MM-dd'),
          status,
        }
      case 'department':
        return {
          code: `DPT-${index + 1}`,
          name: ['Sales', 'Finance', 'HR', 'Operations'][index % 4],
          manager: `Manager ${index + 1}`,
          headcount: 8 + index,
        }
      case 'designation':
        return {
          code: `DSG-${index + 1}`,
          name: ['Manager', 'Supervisor', 'Executive', 'Officer'][index % 4],
          level: ['L1', 'L2', 'L3', 'L4'][index % 4],
          employees: 4 + index,
        }
      case 'attendance':
        return {
          employee: `Employee ${index + 1}`,
          date: day,
          inTime: '08:58',
          outTime: '17:55',
          status,
        }
      case 'leave':
        return {
          reference: `LV-${2026}-${String(index + 1).padStart(4, '0')}`,
          employee: `Employee ${index + 1}`,
          type: ['Annual', 'Sick', 'Maternity', 'Unpaid'][index % 4],
          days: 1 + (index % 5),
          status,
        }
      case 'payroll':
        return {
          reference: `PR-${2026}-${String(index + 1).padStart(4, '0')}`,
          month: ['January', 'February', 'March', 'April'][index % 4],
          employees: 20 + index,
          gross: numberValue(index, 1500),
          status,
        }
      case 'holiday':
        return {
          date: day,
          name: ['New Year', 'National Day', 'Independence Day', 'Foundation Day'][index % 4],
          type: ['Public', 'Bank', 'Company'][index % 3],
          status,
        }
      case 'recruitment':
        return {
          reference: `REC-${2026}-${String(index + 1).padStart(4, '0')}`,
          position: ['Sales Officer', 'Accountant', 'Driver', 'Store Keeper'][index % 4],
          department: ['Sales', 'Finance', 'Logistics', 'Warehouse'][index % 4],
          status,
        }
      case 'complaint':
        return {
          reference: `CMP-${2026}-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          priority: ['High', 'Medium', 'Low'][index % 3],
          status,
        }
      case 'warranty':
        return {
          reference: `WAR-${2026}-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          product: `Product ${index + 1}`,
          status,
        }
      case 'service-request':
        return {
          reference: `SR-${2026}-${String(index + 1).padStart(4, '0')}`,
          customer: `Customer ${index + 1}`,
          category: ['Installation', 'Support', 'Onsite', 'Training'][index % 4],
          status,
        }
      case 'customer-history':
        return {
          reference: `Customer ${index + 1}`,
          lastOrder: `SO-2026-${String(index + 1).padStart(4, '0')}`,
          payments: numberValue(index, 860),
          risk: ['Low', 'Medium', 'High'][index % 3],
        }
      case 'sales-report':
        return {
          period: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index % 6],
          sales: numberValue(index, 1200),
          growth: `${6 + index}%`,
          status,
        }
      case 'purchase-report':
        return {
          period: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index % 6],
          purchase: numberValue(index, 980),
          growth: `${4 + index}%`,
          status,
        }
      case 'inventory-report':
        return {
          period: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index % 6],
          items: 150 + index * 12,
          value: numberValue(index, 1120),
          status,
        }
      case 'financial-report':
        return {
          period: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index % 6],
          amount: numberValue(index, 1540),
          growth: `${5 + index}%`,
          status,
        }
      case 'performance-dashboard':
        return {
          metric: ['Sales Conversion', 'Delivery SLA', 'Stock Accuracy', 'Collection Efficiency'][index % 4],
          value: `${82 + index}%`,
          target: `${90 + index}%`,
        }
      case 'user':
        return {
          name: `User ${index + 1}`,
          email: `user${index + 1}@we-erp.local`,
          role: ['Admin', 'Manager', 'User'][index % 3],
          warehouse: ['Main Warehouse', 'West Hub'][index % 2],
          status,
        }
      case 'role':
        return {
          name: ['Admin', 'Manager', 'User'][index % 3],
          permissions: 18 + index,
          members: 4 + index,
          status,
        }
      case 'activity-log':
        return {
          timestamp: `${day} 09:${10 + index}`,
          actor: `User ${index + 1}`,
          module: ['Sales', 'Inventory', 'Finance', 'Settings'][index % 4],
          action: ['Created', 'Updated', 'Approved', 'Printed'][index % 4],
          status,
        }
      case 'branch':
        return {
          code: `BR-${index + 1}`,
          name: ['Head Office', 'North Branch', 'South Branch', 'East Branch'][index % 4],
          city: ['New York', 'Chicago', 'Dallas', 'Austin'][index % 4],
          manager: `Manager ${index + 1}`,
          status,
        }
      case 'vat-settings':
        return {
          label: ['VAT Rate', 'Invoice Prefix', 'Round Off', 'Tax Inclusive'][index % 4],
          value: ['15%', 'INV-', 'Enabled', 'No'][index % 4],
          status,
        }
      case 'currency':
        return {
          code: ['USD', 'EUR', 'GBP', 'SAR'][index % 4],
          name: ['US Dollar', 'Euro', 'Pound Sterling', 'Saudi Riyal'][index % 4],
          symbol: ['$', '€', '£', '﷼'][index % 4],
          status,
        }
      case 'fiscal-year':
        return {
          name: `FY 2026-${2027 + index}`,
          start: '2026-01-01',
          end: '2026-12-31',
          status,
        }
      case 'email-settings':
        return {
          label: ['SMTP Host', 'SMTP Port', 'Sender Name', 'Reply-To'][index % 4],
          value: ['smtp.we-erp.local', '587', 'we-ERP', 'noreply@we-erp.local'][index % 4],
          status,
        }
      case 'notification-settings':
        return {
          label: ['Invoice Alerts', 'Stock Alerts', 'Payroll Alerts', 'Audit Alerts'][index % 4],
          channel: ['Email', 'SMS', 'In-App'][index % 3],
          status,
        }
      case 'backup-restore':
        return {
          reference: `BKP-${2026}-${String(index + 1).padStart(4, '0')}`,
          type: ['Full', 'Incremental', 'Restore'][index % 3],
          size: `${120 + index * 8} MB`,
          status,
        }
      default:
        return {
          reference: `REF-${index + 1}`,
          name: `${page.title} ${index + 1}`,
          date: day,
          status,
        }
    }
  })
}

export const dashboardPerformance = [
  { month: 'Jan', sales: 120000, purchase: 89000, profit: 24000 },
  { month: 'Feb', sales: 132000, purchase: 93000, profit: 27000 },
  { month: 'Mar', sales: 141000, purchase: 95000, profit: 31000 },
  { month: 'Apr', sales: 151000, purchase: 103000, profit: 33000 },
  { month: 'May', sales: 164000, purchase: 111000, profit: 39000 },
  { month: 'Jun', sales: 176000, purchase: 118000, profit: 43000 },
]

export const dashboardCategory = [
  { category: 'Electronics', sales: 42, customers: 18 },
  { category: 'Hardware', sales: 31, customers: 12 },
  { category: 'Packaging', sales: 15, customers: 9 },
  { category: 'Spare Parts', sales: 12, customers: 7 },
]

export const lowStockAlerts = [
  { sku: 'SKU-10011', product: 'Industrial Valve Assembly', qty: 8, min: 20, warehouse: 'Main Warehouse' },
  { sku: 'SKU-10027', product: 'Hydraulic Seal Kit', qty: 4, min: 12, warehouse: 'West Hub' },
  { sku: 'SKU-10053', product: 'Bearing Pack 6205', qty: 11, min: 25, warehouse: 'Transit Hub' },
]

export const recentActivities = [
  'Sales order SO-2026-0008 approved by branch manager',
  'Purchase order PO-2026-0011 received with 96% accuracy',
  'Invoice INV-2026-0014 allocated to customer payment',
  'Stock transfer TRF-2026-0007 completed successfully',
]

export const dashboardStats = [
  { title: "Today's Sales", value: 184200, delta: '+12.5%' },
  { title: "Today's Purchases", value: 93100, delta: '+4.1%' },
  { title: 'Revenue', value: 1842000, delta: '+18.4%' },
  { title: 'Expenses', value: 931000, delta: '+7.2%' },
  { title: 'Profit', value: 487000, delta: '+14.6%' },
  { title: 'Inventory Value', value: 1425000, delta: '+3.9%' },
  { title: 'Outstanding Customer Payments', value: 328000, delta: '-2.4%' },
  { title: 'Outstanding Supplier Payments', value: 219000, delta: '+1.3%' },
]

export const topCustomers = [
  { name: 'Orbit Supplies LLC', value: 238000 },
  { name: 'Nova Retail Group', value: 192000 },
  { name: 'Apex Engineering', value: 174000 },
  { name: 'Metro Traders', value: 151000 },
]

export const topProducts = [
  { name: 'Industrial Valve Assembly', value: 420 },
  { name: 'Hydraulic Seal Kit', value: 360 },
  { name: 'Bearing Pack 6205', value: 298 },
  { name: 'Control Valve Pro', value: 255 },
]

export const notifications = [
  '3 invoices are pending approval',
  'Low stock alert triggered in Main Warehouse',
  'Two deliveries delayed due to customs checks',
  'Payroll draft ready for review',
]

export const companyProfile = {
  name: 'we-ERP Trading Co.',
  vat: 'VAT-9901021',
  logo: '/favicon.svg',
  address: '123 Industrial Avenue, Commerce City',
  phone: '+1 555 010 7788',
  email: 'accounts@we-erp.local',
}
