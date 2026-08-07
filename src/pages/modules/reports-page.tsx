import type { PageDefinition } from '@/app/pages'
import { ReportsRouter } from '@/features/reports/router/reports-router'

export default function ReportsPage({ page }: { page: PageDefinition }) {
  return <ReportsRouter page={page} />
}