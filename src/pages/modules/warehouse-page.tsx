import type { PageDefinition } from '@/app/pages'
import { WarehouseRouter } from '@/features/warehouse/router/warehouse-router'

export default function WarehousePage({ page }: { page: PageDefinition }) {
  return <WarehouseRouter page={page} />
}