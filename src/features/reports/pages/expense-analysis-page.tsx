import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function ExpenseAnalysisPage() {
  return <ReportPageView title="Expense Analysis" bundle={reportBundles.expense} />
}
