import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function RevenueAnalysisPage() {
  return <ReportPageView title="Revenue Analysis" bundle={reportBundles.revenue} />
}
