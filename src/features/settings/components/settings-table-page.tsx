import { PurchaseTable } from '@/features/purchasing/components/purchase-table'
import type { PurchaseColumn } from '@/features/purchasing/hooks/use-purchase-table'
import type { PurchaseRow } from '@/features/purchasing/utils/purchasing-utils'

export function SettingsTablePage({
  title,
  rows,
  columns,
}: {
  title: string
  rows: PurchaseRow[]
  columns: PurchaseColumn[]
}) {
  return <PurchaseTable title={title} rows={rows} columns={columns} />
}
