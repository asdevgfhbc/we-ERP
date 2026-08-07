import type { PageDefinition } from '@/app/pages'
import { FinanceRouter } from '@/features/finance/router/finance-router'

export default function FinancePage({ page }: { page: PageDefinition }) {
  return <FinanceRouter page={page} />
}