import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { leaveRows } from '@/features/hr/data/hr-data'

export function LeavePage() {
  return (
    <PurchaseTable
      title="Leave"
      rows={leaveRows}
      columns={[
        { key: 'employee', label: 'Employee' },
        { key: 'leaveType', label: 'Leave Type' },
        { key: 'fromDate', label: 'From' },
        { key: 'toDate', label: 'To' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
