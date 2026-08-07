import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { designationRows } from '@/features/hr/data/hr-data'

export function DesignationsPage() {
  return (
    <PurchaseTable
      title="Designations"
      rows={designationRows}
      columns={[
        { key: 'reference', label: 'Designation Code' },
        { key: 'name', label: 'Designation' },
        { key: 'level', label: 'Level' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
