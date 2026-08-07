import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function PurchaseReportsPage() {
  return <ReportPageView title="Purchase Reports" bundle={reportBundles.purchase} />
}
