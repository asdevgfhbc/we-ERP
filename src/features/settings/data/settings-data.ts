export type SettingsFormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'image' | 'file'
  required?: boolean
  options?: string[]
  placeholder?: string
  fullWidth?: boolean
}

export type SettingsFormConfig = {
  pageKey: string
  title: string
  subtitle: string
  successMessage: string
  fields: SettingsFormField[]
  requiredChecks?: Array<'email' | 'phone' | 'image' | 'file' | 'start-before-end'>
}

export const settingsPermissionMatrix: Record<string, string[]> = {
  'ERP Admin': [
    'company profile',
    'company logo',
    'branches',
    'warehouses',
    'invoice settings',
    'vat / tax',
    'currency',
    'fiscal year',
    'email settings',
    'notification settings',
    'backup & restore',
  ],
  'Finance Manager': ['invoice settings', 'vat / tax', 'currency', 'fiscal year', 'backup & restore'],
  'Operations Manager': ['branches', 'warehouses', 'company profile', 'company logo'],
}

export const activeSettingsRole = 'ERP Admin'

export const settingsTableData = {
  branches: Array.from({ length: 12 }).map((_, i) => ({
    id: `BR-${String(i + 1).padStart(3, '0')}`,
    code: `B${String(100 + i)}`,
    name: ['Head Office', 'North Branch', 'South Branch', 'East Branch'][i % 4],
    city: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'][i % 4],
    manager: ['M. Khan', 'S. Noor', 'A. Rehman', 'L. Tariq'][i % 4],
    status: ['Active', 'Active', 'Inactive', 'Active'][i % 4],
  })),
  warehouses: Array.from({ length: 10 }).map((_, i) => ({
    id: `WH-${String(i + 1).padStart(3, '0')}`,
    code: `W${String(300 + i)}`,
    name: ['Main Warehouse', 'Transit Hub', 'Cold Storage', 'Spare Parts Yard'][i % 4],
    branch: ['Head Office', 'North Branch', 'South Branch', 'East Branch'][i % 4],
    capacity: [22000, 18000, 9000, 14000][i % 4],
    utilization: ['78%', '61%', '84%', '57%'][i % 4],
    status: ['Active', 'Active', 'Active', 'Maintenance'][i % 4],
  })),
}

export const settingsForms: Record<string, SettingsFormConfig> = {
  'company profile': {
    pageKey: 'company profile',
    title: 'Company Profile',
    subtitle: 'Maintain official legal, tax, and contact profile details.',
    successMessage: 'Company profile saved successfully',
    requiredChecks: ['email', 'phone'],
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'WE Enterprise Trading LLC' },
      { name: 'legalName', label: 'Legal Name', type: 'text', required: true, placeholder: 'WE Enterprise Trading W.L.L.' },
      { name: 'vatNumber', label: 'VAT Number', type: 'text', required: true, placeholder: '301234567890003' },
      { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true, placeholder: 'CR-80912377' },
      { name: 'email', label: 'Official Email', type: 'email', required: true, placeholder: 'finance@we-erp.com' },
      { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+966 11 456 7880' },
      { name: 'website', label: 'Website', type: 'text', placeholder: 'https://www.we-erp.com' },
      { name: 'address', label: 'Head Office Address', type: 'textarea', required: true, fullWidth: true, placeholder: 'Building 24, King Fahd Road, Riyadh' },
    ],
  },
  'company logo': {
    pageKey: 'company logo',
    title: 'Company Logo',
    subtitle: 'Manage branding assets used in invoices and reports.',
    successMessage: 'Company logo saved successfully',
    requiredChecks: ['image'],
    fields: [
      { name: 'brandName', label: 'Brand Name', type: 'text', required: true, placeholder: 'WE ERP' },
      { name: 'logoTagline', label: 'Tagline', type: 'text', placeholder: 'Precision in Every Process' },
      { name: 'logoFile', label: 'Logo Upload', type: 'image', required: true, fullWidth: true },
      { name: 'alternateLogo', label: 'Monochrome Logo', type: 'image', fullWidth: true },
    ],
  },
  'invoice settings': {
    pageKey: 'invoice settings',
    title: 'Invoice Settings',
    subtitle: 'Configure numbering logic, due dates, and print templates.',
    successMessage: 'Invoice settings saved successfully',
    fields: [
      { name: 'invoicePrefix', label: 'Invoice Prefix', type: 'text', required: true, placeholder: 'INV-' },
      { name: 'nextSequence', label: 'Next Sequence', type: 'number', required: true, placeholder: '9081' },
      { name: 'defaultDueDays', label: 'Default Due Days', type: 'number', required: true, placeholder: '30' },
      { name: 'printTemplate', label: 'Print Template', type: 'select', required: true, options: ['Standard A4', 'Compact A5', 'Corporate Letterhead'] },
      { name: 'terms', label: 'Payment Terms Text', type: 'textarea', fullWidth: true, required: true, placeholder: 'Payment due within 30 days from invoice date.' },
      { name: 'defaultAttachment', label: 'Default Attachment', type: 'file', fullWidth: true },
    ],
  },
  'vat / tax': {
    pageKey: 'vat / tax',
    title: 'VAT / Tax',
    subtitle: 'Maintain tax rates, registration details, and filing controls.',
    successMessage: 'VAT and tax settings saved successfully',
    fields: [
      { name: 'taxRegion', label: 'Tax Region', type: 'select', required: true, options: ['Saudi Arabia', 'UAE', 'Bahrain'] },
      { name: 'standardVatRate', label: 'Standard VAT Rate (%)', type: 'number', required: true, placeholder: '15' },
      { name: 'zeroRatedCode', label: 'Zero Rated Code', type: 'text', required: true, placeholder: 'VAT-ZR' },
      { name: 'exemptCode', label: 'Exempt Code', type: 'text', required: true, placeholder: 'VAT-EX' },
      { name: 'filingFrequency', label: 'Filing Frequency', type: 'select', required: true, options: ['Monthly', 'Quarterly'] },
      { name: 'roundingMethod', label: 'Rounding Method', type: 'select', required: true, options: ['Commercial', 'Round Up', 'Round Down'] },
    ],
  },
  currency: {
    pageKey: 'currency',
    title: 'Currency',
    subtitle: 'Configure default currency and exchange behavior.',
    successMessage: 'Currency settings saved successfully',
    fields: [
      { name: 'baseCurrency', label: 'Base Currency', type: 'select', required: true, options: ['SAR', 'USD', 'EUR'] },
      { name: 'currencySymbol', label: 'Currency Symbol', type: 'text', required: true, placeholder: 'SAR' },
      { name: 'decimalPlaces', label: 'Decimal Places', type: 'number', required: true, placeholder: '2' },
      { name: 'rateProvider', label: 'Rate Provider', type: 'select', required: true, options: ['Manual', 'ECB', 'Open Exchange'] },
      { name: 'lastRateUpdate', label: 'Last Rate Update', type: 'date', required: true },
      { name: 'rateAttachment', label: 'Rate Confirmation File', type: 'file', fullWidth: true },
    ],
  },
  'fiscal year': {
    pageKey: 'fiscal year',
    title: 'Fiscal Year',
    subtitle: 'Define accounting year boundaries and period lock controls.',
    successMessage: 'Fiscal year settings saved successfully',
    requiredChecks: ['start-before-end'],
    fields: [
      { name: 'fiscalName', label: 'Fiscal Year Name', type: 'text', required: true, placeholder: 'FY-2026' },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
      { name: 'periodType', label: 'Period Type', type: 'select', required: true, options: ['Monthly', 'Quarterly'] },
      { name: 'lockPolicy', label: 'Period Lock Policy', type: 'select', required: true, options: ['Auto lock after close', 'Manual lock'] },
      { name: 'closeChecklist', label: 'Closing Checklist File', type: 'file', fullWidth: true },
    ],
  },
  'email settings': {
    pageKey: 'email settings',
    title: 'Email Settings',
    subtitle: 'Manage SMTP endpoints, sender identity, and retry strategy.',
    successMessage: 'Email settings saved successfully',
    requiredChecks: ['email'],
    fields: [
      { name: 'smtpHost', label: 'SMTP Host', type: 'text', required: true, placeholder: 'smtp.we-erp.com' },
      { name: 'smtpPort', label: 'SMTP Port', type: 'number', required: true, placeholder: '587' },
      { name: 'encryption', label: 'Encryption', type: 'select', required: true, options: ['TLS', 'SSL', 'None'] },
      { name: 'senderEmail', label: 'Sender Email', type: 'email', required: true, placeholder: 'noreply@we-erp.com' },
      { name: 'replyTo', label: 'Reply-To Email', type: 'email', required: true, placeholder: 'support@we-erp.com' },
      { name: 'signature', label: 'Email Signature', type: 'textarea', fullWidth: true, placeholder: 'Regards, WE ERP Automation Center' },
    ],
  },
  'notification settings': {
    pageKey: 'notification settings',
    title: 'Notification Settings',
    subtitle: 'Configure alert channels and critical event policies.',
    successMessage: 'Notification settings saved successfully',
    fields: [
      { name: 'criticalAlerts', label: 'Critical Alerts Channel', type: 'select', required: true, options: ['Email + In-app', 'In-app only', 'SMS + Email'] },
      { name: 'approvalAlerts', label: 'Approval Alerts Channel', type: 'select', required: true, options: ['Email', 'In-app', 'Email + In-app'] },
      { name: 'digestFrequency', label: 'Digest Frequency', type: 'select', required: true, options: ['Hourly', 'Daily', 'Weekly'] },
      { name: 'quietHoursStart', label: 'Quiet Hours Start', type: 'text', required: true, placeholder: '22:00' },
      { name: 'quietHoursEnd', label: 'Quiet Hours End', type: 'text', required: true, placeholder: '06:00' },
      { name: 'notificationPolicy', label: 'Notification Policy File', type: 'file', fullWidth: true },
    ],
  },
  'backup & restore': {
    pageKey: 'backup & restore',
    title: 'Backup & Restore',
    subtitle: 'Configure backup schedules, retention, and restore controls.',
    successMessage: 'Backup and restore settings saved successfully',
    requiredChecks: ['file'],
    fields: [
      { name: 'backupFrequency', label: 'Backup Frequency', type: 'select', required: true, options: ['Daily', 'Weekly', 'Monthly'] },
      { name: 'retention', label: 'Retention (Days)', type: 'number', required: true, placeholder: '30' },
      { name: 'storageProvider', label: 'Storage Provider', type: 'select', required: true, options: ['Azure Blob', 'AWS S3', 'On-Prem NAS'] },
      { name: 'lastBackupDate', label: 'Last Backup Date', type: 'date', required: true },
      { name: 'restorePoint', label: 'Restore Point', type: 'text', required: true, placeholder: 'BKP-2026-08-07-0100' },
      { name: 'restorePackage', label: 'Restore Package', type: 'file', required: true, fullWidth: true },
    ],
  },
}

export function normalizeSettingsTitle(title: string) {
  return title.toLowerCase().trim()
}
