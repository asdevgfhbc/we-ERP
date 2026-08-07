import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function CustomerAgingPage() {
  return <ReportPageView title="Customer Aging" bundle={reportBundles.customerAging} />
}
