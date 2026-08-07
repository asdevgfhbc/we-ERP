import type { PageDefinition } from '@/app/pages'
import { AdministrationRouter } from '@/features/administration/router/administration-router'

export default function AdministrationPage({ page }: { page: PageDefinition }) {
  return <AdministrationRouter page={page} />
}
