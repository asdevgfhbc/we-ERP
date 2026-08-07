import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function InventoryValuePage() {
  return <ReportPageView title="Inventory Value" bundle={reportBundles.inventoryValue} />
}
