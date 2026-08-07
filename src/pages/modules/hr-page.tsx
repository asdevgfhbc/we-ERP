import type { PageDefinition } from '@/app/pages'
import { ModulePageBase } from './module-page-base'

export default function HrPage({ page }: { page: PageDefinition }) {
  return <ModulePageBase page={page} primaryActionLabel="Create HR Record" />
}