import type { PageDefinition } from '@/app/pages'
import { SalesRouter } from '@/features/sales/sales-router'

export default function SalesPage({ page }: { page: PageDefinition }) {
  return <SalesRouter page={page} />
}