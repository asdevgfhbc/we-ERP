import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function SalesReportsPage() {
  return <ReportPageView title="Sales Reports" bundle={reportBundles.sales} />
}
