import { format } from 'date-fns'

const now = new Date(2026, 7, 7, 11, 0, 0)
const date = (offset: number) => format(new Date(now.getTime() - offset * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')

export const currentRole = 'ERP Admin'

export const permissionMatrix: Record<string, string[]> = {
  'ERP Admin': ['users', 'user details', 'roles', 'permissions', 'role assignments', 'activity logs', 'audit trail', 'system logs', 'login history'],
  'Security Manager': ['users', 'roles', 'permissions', 'role assignments', 'audit trail', 'system logs', 'login history'],
  'Auditor': ['activity logs', 'audit trail', 'login history'],
}

export const userRows = Array.from({ length: 14 }).map((_, i) => ({
  id: `USR-${String(i + 1).padStart(4, '0')}`,
  code: `U-${String(1000 + i)}`,
  name: ['A. Kareem', 'S. Fatima', 'N. Rahim', 'M. Akbar'][i % 4],
  role: ['ERP Admin', 'Finance Manager', 'Warehouse Supervisor', 'Sales Executive'][i % 4],
  status: ['Active', 'Suspended', 'Active', 'Active'][i % 4],
}))

export const roleRows = [
  { id: 'ROL-001', code: 'ADMIN', name: 'ERP Admin', scope: 'Global', status: 'Active' },
  { id: 'ROL-002', code: 'FIN-MGR', name: 'Finance Manager', scope: 'Finance', status: 'Active' },
  { id: 'ROL-003', code: 'WH-SUP', name: 'Warehouse Supervisor', scope: 'Warehouse', status: 'Active' },
  { id: 'ROL-004', code: 'AUDITOR', name: 'Auditor', scope: 'Cross-Module', status: 'Active' },
]

export const permissionRows = [
  { id: 'PRM-001', module: 'Sales', permission: 'invoice.approve', level: 'write', status: 'Enabled' },
  { id: 'PRM-002', module: 'Finance', permission: 'journal.post', level: 'write', status: 'Enabled' },
  { id: 'PRM-003', module: 'Warehouse', permission: 'stock.adjust', level: 'write', status: 'Enabled' },
  { id: 'PRM-004', module: 'Administration', permission: 'user.manage', level: 'admin', status: 'Enabled' },
]

export const roleAssignmentRows = Array.from({ length: 10 }).map((_, i) => ({
  id: `ASN-${String(i + 1).padStart(4, '0')}`,
  user: userRows[i % userRows.length].name,
  role: userRows[i % userRows.length].role,
  assignedBy: ['ERP Admin', 'Security Manager'][i % 2],
  date: date(i),
  status: ['Active', 'Revoked', 'Active', 'Active'][i % 4],
}))

export const activityLogRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `ACT-${String(i + 1).padStart(4, '0')}`,
  user: userRows[i % userRows.length].name,
  action: ['Created User', 'Updated Role', 'Reset Password', 'Disabled Account'][i % 4],
  module: ['Administration', 'Security', 'Authentication', 'User Management'][i % 4],
  date: date(i),
  status: ['Success', 'Success', 'Warning', 'Success'][i % 4],
}))

export const auditTrailRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `AUD-${String(i + 1).padStart(4, '0')}`,
  entity: ['User', 'Role', 'Permission', 'Policy'][i % 4],
  change: ['Create', 'Update', 'Delete', 'Assign'][i % 4],
  changedBy: ['ERP Admin', 'Security Manager', 'Auditor'][i % 3],
  date: date(i),
  status: ['Captured', 'Captured', 'Reviewed', 'Captured'][i % 4],
}))

export const systemLogRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `SYS-${String(i + 1).padStart(4, '0')}`,
  service: ['API Gateway', 'Auth Service', 'Scheduler', 'Reporting Engine'][i % 4],
  level: ['Info', 'Warning', 'Error', 'Info'][i % 4],
  message: ['Token refreshed', 'Rate limit reached', 'Queue timeout', 'Backup completed'][i % 4],
  date: date(i),
  status: ['Open', 'Resolved', 'Open', 'Resolved'][i % 4],
}))

export const loginHistoryRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `LGN-${String(i + 1).padStart(4, '0')}`,
  user: userRows[i % userRows.length].name,
  ip: `10.0.2.${10 + i}`,
  device: ['Windows Chrome', 'Mac Safari', 'Android Chrome', 'iPad Safari'][i % 4],
  date: date(i),
  status: ['Success', 'Success', 'Failed', 'Success'][i % 4],
}))

export function userDetail(id: string) {
  const row = userRows.find((item) => item.id === id) ?? userRows[0]
  return {
    ...row,
    email: `${row.name.toLowerCase().replace(/\s+/g, '.')}@we-erp.com`,
    permissions: ['invoice.approve', 'user.manage', 'report.export'],
    sessionHistory: ['Web login', 'Password change', 'MFA verification', 'Session refresh'],
  }
}
