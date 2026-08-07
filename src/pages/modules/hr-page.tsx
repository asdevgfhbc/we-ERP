import type { PageDefinition } from '@/app/pages'
import { HrRouter } from '@/features/hr/router/hr-router'

export default function HrPage({ page }: { page: PageDefinition }) {
  return <HrRouter page={page} />
}