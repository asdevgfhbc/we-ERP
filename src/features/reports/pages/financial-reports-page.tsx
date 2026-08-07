import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function FinancialReportsPage() {
  return <ReportPageView title="Financial Reports" bundle={reportBundles.financial} />
}
