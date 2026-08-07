import type { PageDefinition } from '@/app/pages'
import { MasterDataRouter } from '@/features/master-data/master-data-router'

export default function MasterDataPage({ page }: { page: PageDefinition }) {
  return <MasterDataRouter page={page} />
}