import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { attendanceRows } from '@/features/hr/data/hr-data'

export function AttendancePage() {
  return (
    <PurchaseTable
      title="Attendance"
      rows={attendanceRows}
      columns={[
        { key: 'employee', label: 'Employee' },
        { key: 'date', label: 'Date' },
        { key: 'checkIn', label: 'Check-In' },
        { key: 'checkOut', label: 'Check-Out' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
