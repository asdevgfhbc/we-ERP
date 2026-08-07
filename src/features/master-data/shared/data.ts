import { format } from 'date-fns'
import type { MasterConfig, MasterEntity, MasterRow, TimelineEvent } from './types'

function day(offset: number) {
  return format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')
}

const commonTimeline = (prefix: string): TimelineEvent[] => [
  {
    id: `${prefix}-evt-01`,
    date: day(1),
    actor: 'ERP Administrator',
    action: 'Updated',
    description: 'Updated core profile fields and compliance tags.',
    status: 'Approved',
  },
  {
    id: `${prefix}-evt-02`,
    date: day(3),
    actor: 'Operations Manager',
    action: 'Reviewed',
    description: 'Reviewed and confirmed current record accuracy.',
    status: 'Completed',
  },
  {
    id: `${prefix}-evt-03`,
    date: day(6),
    actor: 'Data Steward',
    action: 'Created',
    description: 'Created initial record from onboarding workflow.',
    status: 'Completed',
  },
]

export const masterRows: Record<MasterEntity, MasterRow[]> = {
  product: [
    { id: 'PRD-1001', code: 'PRD-1001', name: 'Hydraulic Pump H220', category: 'Industrial Components', brand: 'FlowMax', unit: 'PCS', stock: 118, status: 'Active', updated: day(0) },
    { id: 'PRD-1002', code: 'PRD-1002', name: 'Precision Valve V18', category: 'Fluid Control', brand: 'NovaFlow', unit: 'PCS', stock: 74, status: 'Active', updated: day(1) },
    { id: 'PRD-1003', code: 'PRD-1003', name: 'Seal Kit SK-44', category: 'Maintenance', brand: 'TorqueLine', unit: 'SET', stock: 44, status: 'Pending', updated: day(2) },
    { id: 'PRD-1004', code: 'PRD-1004', name: 'Bearing Pack BP-09', category: 'Spare Parts', brand: 'CoreMotion', unit: 'BOX', stock: 26, status: 'Active', updated: day(4) },
    { id: 'PRD-1005', code: 'PRD-1005', name: 'Filter Cartridge FC-70', category: 'Consumables', brand: 'PureCycle', unit: 'PCS', stock: 12, status: 'Active', updated: day(5) },
  ],
  category: [
    { id: 'CAT-01', code: 'CAT-01', name: 'Industrial Components', products: 56, status: 'Active', updated: day(0) },
    { id: 'CAT-02', code: 'CAT-02', name: 'Fluid Control', products: 28, status: 'Active', updated: day(2) },
    { id: 'CAT-03', code: 'CAT-03', name: 'Maintenance', products: 19, status: 'Active', updated: day(3) },
    { id: 'CAT-04', code: 'CAT-04', name: 'Consumables', products: 42, status: 'Pending', updated: day(4) },
  ],
  brand: [
    { id: 'BR-01', code: 'BR-01', name: 'FlowMax', country: 'Germany', status: 'Active', updated: day(0) },
    { id: 'BR-02', code: 'BR-02', name: 'NovaFlow', country: 'Japan', status: 'Active', updated: day(1) },
    { id: 'BR-03', code: 'BR-03', name: 'TorqueLine', country: 'USA', status: 'Active', updated: day(2) },
    { id: 'BR-04', code: 'BR-04', name: 'PureCycle', country: 'Italy', status: 'Pending', updated: day(4) },
  ],
  unit: [
    { id: 'UNT-01', code: 'UNT-01', name: 'PCS', description: 'Single Piece', status: 'Active', updated: day(0) },
    { id: 'UNT-02', code: 'UNT-02', name: 'BOX', description: 'Box Quantity', status: 'Active', updated: day(1) },
    { id: 'UNT-03', code: 'UNT-03', name: 'SET', description: 'Set Quantity', status: 'Active', updated: day(2) },
    { id: 'UNT-04', code: 'UNT-04', name: 'KG', description: 'Kilogram', status: 'Pending', updated: day(5) },
  ],
  customer: [
    { id: 'CUS-2001', code: 'CUS-2001', name: 'Orbit Engineering LLC', city: 'Dubai', phone: '+971 55 801 2201', creditLimit: 250000, outstanding: 68400, status: 'Active', updated: day(0) },
    { id: 'CUS-2002', code: 'CUS-2002', name: 'Metro Build Systems', city: 'Riyadh', phone: '+966 54 214 9032', creditLimit: 180000, outstanding: 42200, status: 'Active', updated: day(1) },
    { id: 'CUS-2003', code: 'CUS-2003', name: 'Prime Energy Works', city: 'Doha', phone: '+974 30 117 820', creditLimit: 300000, outstanding: 112000, status: 'Pending', updated: day(3) },
    { id: 'CUS-2004', code: 'CUS-2004', name: 'Atlas Pump Services', city: 'Abu Dhabi', phone: '+971 52 671 0193', creditLimit: 140000, outstanding: 18500, status: 'Active', updated: day(4) },
  ],
  supplier: [
    { id: 'SUP-3001', code: 'SUP-3001', name: 'Delta Industrial Imports', country: 'China', contact: 'Lina Wu', terms: '30 Days', outstanding: 93500, status: 'Active', updated: day(0) },
    { id: 'SUP-3002', code: 'SUP-3002', name: 'Nordic Bearings Co.', country: 'Sweden', contact: 'Johan Berg', terms: '45 Days', outstanding: 51600, status: 'Active', updated: day(1) },
    { id: 'SUP-3003', code: 'SUP-3003', name: 'BlueWave Seals', country: 'India', contact: 'Ravi Menon', terms: '15 Days', outstanding: 18700, status: 'Pending', updated: day(2) },
    { id: 'SUP-3004', code: 'SUP-3004', name: 'Apex Logistics Parts', country: 'Turkey', contact: 'Aylin Demir', terms: '30 Days', outstanding: 24900, status: 'Active', updated: day(5) },
  ],
  warehouse: [
    { id: 'WH-01', code: 'WH-01', name: 'Main Distribution Center', branch: 'HQ', capacity: 12000, utilization: 78, inventoryValue: 1264000, status: 'Active', updated: day(0) },
    { id: 'WH-02', code: 'WH-02', name: 'West Service Warehouse', branch: 'West', capacity: 6800, utilization: 66, inventoryValue: 742000, status: 'Active', updated: day(1) },
    { id: 'WH-03', code: 'WH-03', name: 'Transit Buffer Store', branch: 'Port', capacity: 4200, utilization: 52, inventoryValue: 311000, status: 'Pending', updated: day(3) },
  ],
}

export const configs: Record<MasterEntity, MasterConfig> = {
  product: {
    entity: 'product',
    singularLabel: 'Product',
    pluralLabel: 'Products',
    listTitle: 'Product Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Product Name' },
      { key: 'category', label: 'Category' },
      { key: 'brand', label: 'Brand' },
      { key: 'unit', label: 'Unit' },
      { key: 'stock', label: 'Stock', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Product Name', type: 'text', required: true },
      { name: 'code', label: 'Product Code', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', required: true, options: ['Industrial Components', 'Fluid Control', 'Maintenance', 'Consumables'] },
      { name: 'brand', label: 'Brand', type: 'select', required: true, options: ['FlowMax', 'NovaFlow', 'TorqueLine', 'PureCycle'] },
      { name: 'unit', label: 'Unit', type: 'select', required: true, options: ['PCS', 'BOX', 'SET', 'KG'] },
      { name: 'cost', label: 'Cost Price', type: 'number', required: true },
      { name: 'price', label: 'Selling Price', type: 'number', required: true },
      { name: 'openingDate', label: 'Effective Date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'image', label: 'Product Image', type: 'image' },
      { name: 'attachment', label: 'Specification Sheet', type: 'file' },
    ],
  },
  category: {
    entity: 'category',
    singularLabel: 'Category',
    pluralLabel: 'Categories',
    listTitle: 'Category Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Category Name' },
      { key: 'products', label: 'Products', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Category Name', type: 'text', required: true },
      { name: 'code', label: 'Category Code', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { name: 'attachment', label: 'Policy Attachment', type: 'file' },
    ],
  },
  brand: {
    entity: 'brand',
    singularLabel: 'Brand',
    pluralLabel: 'Brands',
    listTitle: 'Brand Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Brand' },
      { key: 'country', label: 'Country' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Brand Name', type: 'text', required: true },
      { name: 'code', label: 'Brand Code', type: 'text', required: true },
      { name: 'country', label: 'Country', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { name: 'logo', label: 'Brand Logo', type: 'image' },
    ],
  },
  unit: {
    entity: 'unit',
    singularLabel: 'Unit',
    pluralLabel: 'Units',
    listTitle: 'Unit Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Unit' },
      { key: 'description', label: 'Description' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Unit Name', type: 'text', required: true },
      { name: 'code', label: 'Unit Code', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
    ],
  },
  customer: {
    entity: 'customer',
    singularLabel: 'Customer',
    pluralLabel: 'Customers',
    listTitle: 'Customer Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Customer Name' },
      { key: 'city', label: 'City' },
      { key: 'phone', label: 'Phone' },
      { key: 'creditLimit', label: 'Credit Limit', align: 'right' },
      { key: 'outstanding', label: 'Outstanding', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Customer Name', type: 'text', required: true },
      { name: 'code', label: 'Customer Code', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'creditLimit', label: 'Credit Limit', type: 'number', required: true },
      { name: 'registrationDate', label: 'Registration Date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'logo', label: 'Customer Logo', type: 'image' },
      { name: 'attachment', label: 'KYC Document', type: 'file' },
    ],
  },
  supplier: {
    entity: 'supplier',
    singularLabel: 'Supplier',
    pluralLabel: 'Suppliers',
    listTitle: 'Supplier Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Supplier Name' },
      { key: 'country', label: 'Country' },
      { key: 'contact', label: 'Contact Person' },
      { key: 'terms', label: 'Terms' },
      { key: 'outstanding', label: 'Outstanding', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Supplier Name', type: 'text', required: true },
      { name: 'code', label: 'Supplier Code', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'country', label: 'Country', type: 'text', required: true },
      { name: 'contact', label: 'Contact Person', type: 'text', required: true },
      { name: 'terms', label: 'Payment Terms', type: 'select', required: true, options: ['15 Days', '30 Days', '45 Days'] },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'onboardDate', label: 'Onboard Date', type: 'date', required: true },
      { name: 'attachment', label: 'Supplier Agreement', type: 'file' },
    ],
  },
  warehouse: {
    entity: 'warehouse',
    singularLabel: 'Warehouse',
    pluralLabel: 'Warehouses',
    listTitle: 'Warehouse Master List',
    columns: [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Warehouse Name' },
      { key: 'branch', label: 'Branch' },
      { key: 'capacity', label: 'Capacity', align: 'right' },
      { key: 'utilization', label: 'Utilization %', align: 'right' },
      { key: 'inventoryValue', label: 'Inventory Value', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ],
    formFields: [
      { name: 'name', label: 'Warehouse Name', type: 'text', required: true },
      { name: 'code', label: 'Warehouse Code', type: 'text', required: true },
      { name: 'branch', label: 'Branch', type: 'select', required: true, options: ['HQ', 'West', 'East', 'Port'] },
      { name: 'capacity', label: 'Capacity', type: 'number', required: true },
      { name: 'manager', label: 'Manager', type: 'text', required: true },
      { name: 'goLiveDate', label: 'Go-Live Date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: ['Active', 'Pending', 'Inactive'] },
      { name: 'layoutImage', label: 'Layout Image', type: 'image' },
      { name: 'sop', label: 'Warehouse SOP', type: 'file' },
    ],
  },
}

export function getRows(entity: MasterEntity) {
  return masterRows[entity]
}

export function getTimeline(entity: MasterEntity) {
  return commonTimeline(entity)
}

function salesHistoryRows(prefix: string) {
  return Array.from({ length: 4 }).map((_, index) => ({
    number: `${prefix}-SO-2026-${String(index + 1).padStart(4, '0')}`,
    date: day(index + 1),
    amount: 12000 + index * 2900,
    status: ['Approved', 'Pending', 'Completed', 'In Transit'][index % 4],
  }))
}

function paymentRows(prefix: string) {
  return Array.from({ length: 4 }).map((_, index) => ({
    reference: `${prefix}-PAY-2026-${String(index + 1).padStart(4, '0')}`,
    date: day(index + 1),
    method: ['Bank Transfer', 'Cheque', 'Cash', 'Card'][index % 4],
    amount: 5400 + index * 2100,
    status: ['Completed', 'Approved', 'Pending', 'Completed'][index % 4],
  }))
}

function deliveryRows(prefix: string) {
  return Array.from({ length: 4 }).map((_, index) => ({
    deliveryNo: `${prefix}-DLV-${String(index + 1).padStart(4, '0')}`,
    date: day(index + 1),
    route: ['Route A', 'Route B', 'Route C', 'Route D'][index % 4],
    status: ['In Transit', 'Completed', 'Pending', 'Completed'][index % 4],
  }))
}

export function getCustomerDetail(id: string) {
  const customer = masterRows.customer.find((row) => row.id === id) ?? masterRows.customer[0]
  return {
    customer,
    salesHistory: salesHistoryRows('CUS'),
    paymentHistory: paymentRows('CUS'),
    deliveryHistory: deliveryRows('CUS'),
  }
}

export function getSupplierDetail(id: string) {
  const supplier = masterRows.supplier.find((row) => row.id === id) ?? masterRows.supplier[0]
  return {
    supplier,
    purchaseHistory: salesHistoryRows('SUP'),
    paymentHistory: paymentRows('SUP'),
    importDocuments: Array.from({ length: 4 }).map((_, index) => ({
      reference: `IMP-${String(index + 1).padStart(4, '0')}`,
      type: ['BL', 'Packing List', 'Insurance', 'Invoice'][index % 4],
      date: day(index + 1),
      status: ['Approved', 'Pending', 'Completed', 'Approved'][index % 4],
    })),
  }
}

export function getProductDetail(id: string) {
  const product = masterRows.product.find((row) => row.id === id) ?? masterRows.product[0]
  return {
    product,
    purchaseHistory: salesHistoryRows('PRD'),
    salesHistory: salesHistoryRows('SAL'),
    stockMovement: Array.from({ length: 5 }).map((_, index) => ({
      reference: `MOV-${String(index + 1).padStart(4, '0')}`,
      date: day(index),
      movement: ['GRN', 'Sale', 'Transfer', 'Adjustment', 'Return'][index % 5],
      qty: [25, -18, -6, 4, 7][index % 5],
      balance: 120 - index * 8,
    })),
    batchHistory: Array.from({ length: 4 }).map((_, index) => ({
      batchNo: `BATCH-${index + 11}`,
      expiry: format(new Date(2027, index + 1, 15), 'yyyy-MM-dd'),
      qty: 14 + index * 6,
      status: ['Active', 'Active', 'Pending', 'Active'][index % 4],
    })),
  }
}

export function getWarehouseDetail(id: string) {
  const warehouse = masterRows.warehouse.find((row) => row.id === id) ?? masterRows.warehouse[0]
  return {
    warehouse,
    transferHistory: Array.from({ length: 4 }).map((_, index) => ({
      reference: `TRF-${String(index + 1).padStart(4, '0')}`,
      date: day(index + 1),
      from: 'Main Distribution Center',
      to: ['West Service Warehouse', 'Transit Buffer Store', 'East Spare Store', 'South Depot'][index % 4],
      qty: 10 + index * 3,
      status: ['Completed', 'In Transit', 'Pending', 'Completed'][index % 4],
    })),
    grnHistory: Array.from({ length: 4 }).map((_, index) => ({
      grnNo: `GRN-${String(index + 1).padStart(4, '0')}`,
      supplier: ['Delta Industrial Imports', 'Nordic Bearings Co.', 'BlueWave Seals', 'Apex Logistics Parts'][index % 4],
      date: day(index + 1),
      status: ['Completed', 'Approved', 'Pending', 'Completed'][index % 4],
    })),
    adjustmentHistory: Array.from({ length: 4 }).map((_, index) => ({
      reference: `ADJ-${String(index + 1).padStart(4, '0')}`,
      reason: ['Audit Variance', 'Damage', 'Expiry', 'Count Correction'][index % 4],
      qty: [4, -3, -2, 5][index % 4],
      date: day(index + 2),
      status: ['Approved', 'Approved', 'Pending', 'Completed'][index % 4],
    })),
    lowStock: [
      { sku: 'PRD-1005', product: 'Filter Cartridge FC-70', onHand: 12, reorder: 30 },
      { sku: 'PRD-1004', product: 'Bearing Pack BP-09', onHand: 26, reorder: 40 },
    ],
  }
}
