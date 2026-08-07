import type { PageDefinition } from '@/app/pages'
import { CustomerServiceRouter } from '@/features/customer-service/router/customer-service-router'

export default function CustomerServicePage({ page }: { page: PageDefinition }) {
  return <CustomerServiceRouter page={page} />
}
