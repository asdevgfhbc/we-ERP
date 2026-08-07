import type { PageDefinition } from '@/app/pages'
import { ModulePageBase } from './module-page-base'

export default function FinancePage({ page }: { page: PageDefinition }) {
  return <ModulePageBase page={page} primaryActionLabel="Create Finance Entry" />
}