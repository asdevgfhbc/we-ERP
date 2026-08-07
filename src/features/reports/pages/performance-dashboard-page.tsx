import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function PerformanceDashboardPage() {
  return <ReportPageView title="Performance Dashboard" bundle={reportBundles.performance} />
}
