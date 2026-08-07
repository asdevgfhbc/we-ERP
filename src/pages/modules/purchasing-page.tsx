import type { PageDefinition } from '@/app/pages'
import { PurchasingRouter } from '@/features/purchasing/router/purchasing-router'

export default function PurchasingPage({ page }: { page: PageDefinition }) {
  return <PurchasingRouter page={page} />
}