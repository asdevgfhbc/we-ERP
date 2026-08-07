import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import { recruitmentRows } from '@/features/hr/data/hr-data'

export function RecruitmentPage() {
  return (
    <PurchaseTable
      title="Recruitment"
      rows={recruitmentRows}
      columns={[
        { key: 'reference', label: 'Requisition No' },
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
