import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function TopSellingProductsPage() {
  return <ReportPageView title="Top Selling Products" bundle={reportBundles.topProducts} />
}
