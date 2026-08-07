import type { PageDefinition } from '@/app/pages'
import { MasterEntityPage } from '../shared/master-entity-page'

export function UnitPage({ page }: { page: PageDefinition }) {
  return <MasterEntityPage page={page} entity="unit" />
}
