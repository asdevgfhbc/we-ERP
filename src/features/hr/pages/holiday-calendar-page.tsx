import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { holidayRows } from '@/features/hr/data/hr-data'

export function HolidayCalendarPage() {
  return (
    <PurchaseTable
      title="Holiday Calendar"
      rows={holidayRows}
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'name', label: 'Holiday' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
