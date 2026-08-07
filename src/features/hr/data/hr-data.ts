import { format } from 'date-fns'

const day = (offset: number) => format(new Date(2026, 7, 7 - offset), 'yyyy-MM-dd')

export const hrKpis = [
  { label: 'Employee Count', value: 268, hint: '+6 this quarter' },
  { label: 'Attendance Today', value: '243 / 268', hint: '90.7% present' },
  { label: 'Leave Requests', value: 14, hint: '5 pending approval' },
  { label: 'Payroll Status', value: 'Processed 91%', hint: 'Final review in progress' },
]

export const employeeRows = Array.from({ length: 16 }).map((_, i) => ({
  id: `EMP-${String(i + 1).padStart(4, '0')}`,
  code: `EMP-${String(3000 + i)}`,
  name: ['H. Malik', 'R. Imran', 'S. Fatima', 'N. Salim'][i % 4],
  department: ['Operations', 'Sales', 'Finance', 'HR'][i % 4],
  designation: ['Manager', 'Executive', 'Analyst', 'Coordinator'][i % 4],
  status: ['Active', 'Active', 'On Leave', 'Active'][i % 4],
}))

export const departmentRows = [
  { id: 'DPT-001', reference: 'DPT-OPS', name: 'Operations', headcount: 78, status: 'Active' },
  { id: 'DPT-002', reference: 'DPT-SLS', name: 'Sales', headcount: 62, status: 'Active' },
  { id: 'DPT-003', reference: 'DPT-FIN', name: 'Finance', headcount: 41, status: 'Active' },
  { id: 'DPT-004', reference: 'DPT-HR', name: 'HR', headcount: 22, status: 'Active' },
]

export const designationRows = [
  { id: 'DSG-001', reference: 'DSG-MGR', name: 'Manager', level: 'L4', status: 'Active' },
  { id: 'DSG-002', reference: 'DSG-EXE', name: 'Executive', level: 'L2', status: 'Active' },
  { id: 'DSG-003', reference: 'DSG-ANL', name: 'Analyst', level: 'L2', status: 'Active' },
  { id: 'DSG-004', reference: 'DSG-CRD', name: 'Coordinator', level: 'L1', status: 'Active' },
]

export const attendanceRows = Array.from({ length: 14 }).map((_, i) => ({
  id: `ATT-${String(i + 1).padStart(4, '0')}`,
  employee: employeeRows[i % employeeRows.length].name,
  date: day(i),
  checkIn: `0${8 + (i % 2)}:0${i % 6}`,
  checkOut: `1${7 + (i % 2)}:2${i % 6}`,
  status: ['Present', 'Late', 'Present', 'Absent'][i % 4],
}))

export const leaveRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `LEV-${String(i + 1).padStart(4, '0')}`,
  employee: employeeRows[i % employeeRows.length].name,
  leaveType: ['Annual', 'Sick', 'Casual', 'Emergency'][i % 4],
  fromDate: day(i + 2),
  toDate: day(i - 1),
  status: ['Pending', 'Approved', 'Rejected', 'Approved'][i % 4],
}))

export const payrollRows = Array.from({ length: 12 }).map((_, i) => ({
  id: `PAYR-${String(i + 1).padStart(4, '0')}`,
  employee: employeeRows[i % employeeRows.length].name,
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i % 6],
  gross: 4800 + i * 220,
  net: 4200 + i * 190,
  status: ['Processed', 'Pending', 'Processed', 'Processed'][i % 4],
}))

export const recruitmentRows = Array.from({ length: 10 }).map((_, i) => ({
  id: `REQ-${String(i + 1).padStart(4, '0')}`,
  reference: `REQ-2026-${String(i + 1).padStart(4, '0')}`,
  role: ['Sales Executive', 'Warehouse Supervisor', 'Accountant', 'Driver'][i % 4],
  department: ['Sales', 'Warehouse', 'Finance', 'Logistics'][i % 4],
  status: ['Open', 'Interview', 'Offer', 'Open'][i % 4],
}))

export const holidayRows = [
  { id: 'HOL-1', date: '2026-01-01', name: 'New Year Day', status: 'Planned' },
  { id: 'HOL-2', date: '2026-03-20', name: 'Spring Festival', status: 'Planned' },
  { id: 'HOL-3', date: '2026-06-16', name: 'Eid Holiday', status: 'Planned' },
  { id: 'HOL-4', date: '2026-12-02', name: 'National Day', status: 'Planned' },
]

export function employeeDetail(id: string) {
  const row = employeeRows.find((item) => item.id === id) ?? employeeRows[0]
  return {
    ...row,
    email: `${row.name.toLowerCase().replace(/\s+/g, '.')}@we-erp.com`,
    phone: '+971-50-900-1122',
    timeline: ['Joined company', 'Promoted to current role', 'Completed performance review'],
  }
}
