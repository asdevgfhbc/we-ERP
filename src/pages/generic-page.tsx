import { Suspense, lazy, type ComponentType } from 'react'
import type { PageDefinition } from '@/app/pages'
import { LoadingState } from '@/components/shared/page-primitives'

const MasterDataPage = lazy(() => import('./modules/master-data-page'))
const FinancePage = lazy(() => import('./modules/finance-page'))
const HrPage = lazy(() => import('./modules/hr-page'))
const ReportsPage = lazy(() => import('./modules/reports-page'))
const OperationsPage = lazy(() => import('./modules/operations-page'))

const moduleComponentByName: Record<string, ComponentType<{ page: PageDefinition }>> = {
  'Master Data': MasterDataPage,
  'Finance & Accounting': FinancePage,
  'Human Resources': HrPage,
  'Reports & Analytics': ReportsPage,
}

export function GenericPage({ page }: { page: PageDefinition }) {
  const ModulePage = moduleComponentByName[page.module] ?? OperationsPage

  return (
    <Suspense fallback={<LoadingState />}>
      <ModulePage page={page} />
    </Suspense>
  )
}