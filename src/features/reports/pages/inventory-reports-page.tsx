import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function InventoryReportsPage() {
  return <ReportPageView title="Inventory Reports" bundle={reportBundles.inventory} />
}
