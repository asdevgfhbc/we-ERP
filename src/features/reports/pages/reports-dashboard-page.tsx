import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function ReportsDashboardPage() {
  return <ReportPageView title="Reports Dashboard" bundle={reportBundles.dashboard} />
}
