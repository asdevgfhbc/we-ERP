import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function TopCustomersPage() {
  return <ReportPageView title="Top Customers" bundle={reportBundles.topCustomers} />
}
