import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function StockAgingPage() {
  return <ReportPageView title="Stock Aging" bundle={reportBundles.stockAging} />
}
