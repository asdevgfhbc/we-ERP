import type { PageDefinition } from '@/app/pages'
import { ModulePageBase } from './module-page-base'

export default function OperationsPage({ page }: { page: PageDefinition }) {
  return <ModulePageBase page={page} primaryActionLabel="Create Record" />
}