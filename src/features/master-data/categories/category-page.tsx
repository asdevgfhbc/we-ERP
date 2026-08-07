import type { PageDefinition } from '@/app/pages'
import { MasterEntityPage } from '../shared/master-entity-page'

export function CategoryPage({ page }: { page: PageDefinition }) {
  return <MasterEntityPage page={page} entity="category" />
}
