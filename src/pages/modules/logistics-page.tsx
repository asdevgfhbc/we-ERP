import type { PageDefinition } from '@/app/pages'
import { LogisticsRouter } from '@/features/logistics/router/logistics-router'

export default function LogisticsPage({ page }: { page: PageDefinition }) {
  return <LogisticsRouter page={page} />
}
