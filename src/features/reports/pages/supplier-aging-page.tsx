import { ReportPageView } from '@/features/reports/pages/report-page-view'
import { reportBundles } from '@/features/reports/data/reports-data'

export function SupplierAgingPage() {
  return <ReportPageView title="Supplier Aging" bundle={reportBundles.supplierAging} />
}
