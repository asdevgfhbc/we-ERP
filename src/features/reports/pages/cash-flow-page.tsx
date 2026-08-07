import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function CashFlowPage() {
  return <ReportPageView title="Cash Flow" bundle={reportBundles.cashFlow} />
}
