import type { PageDefinition } from '@/app/pages'
import { ModulePageBase } from './module-page-base'

export default function ReportsPage({ page }: { page: PageDefinition }) {
  return <ModulePageBase page={page} primaryActionLabel="Generate Report" />
}